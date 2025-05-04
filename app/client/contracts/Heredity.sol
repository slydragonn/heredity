// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/**
 * @title Heredity
 * @dev Contrato para crear testamentos digitales que liberan fondos y datos a beneficiarios después de una fecha límite
 */
contract Heredity {
    struct Testament {
        string name;
        address creator;
        address beneficiary;
        string encryptedData;
        uint256 deadline;
        uint256 amount;
        bool claimed;
        uint256 createdAt;
    }

    // Mapeo de ID de testamento a información del testamento
    mapping(uint256 => Testament) public testaments;
    
    // Contador de testamentos
    uint256 public totalTestaments;
    
    // Eventos
    event TestamentCreated(uint256 indexed id, address indexed creator, address indexed beneficiary, uint256 deadline, uint256 amount);
    event TestamentClaimed(uint256 indexed id, address indexed beneficiary, uint256 amount);

    /**
     * @dev Crear un nuevo testamento digital
     * @param _name Nombre del testamento
     * @param _beneficiary Dirección del beneficiario
     * @param _encryptedData Datos encriptados (opcional)
     * @param _deadline Timestamp cuando el testamento se puede reclamar
     */
    function createTestament(
        string memory _name,
        address _beneficiary,
        string memory _encryptedData,
        uint256 _deadline
    ) external payable {
        require(_beneficiary != address(0), "Invalid beneficiary address");
        require(_deadline > block.timestamp, "Deadline must be in the future");
        
        uint256 testamentId = totalTestaments;
        
        testaments[testamentId] = Testament({
            name: _name,
            creator: msg.sender,
            beneficiary: _beneficiary,
            encryptedData: _encryptedData,
            deadline: _deadline,
            amount: msg.value,
            claimed: false,
            createdAt: block.timestamp
        });
        
        totalTestaments++;
        
        emit TestamentCreated(testamentId, msg.sender, _beneficiary, _deadline, msg.value);
    }
    
    /**
     * @dev Permite al beneficiario reclamar un testamento después de la fecha límite
     * @param _testamentId ID del testamento a reclamar
     */
    function claimTestament(uint256 _testamentId) external {
        Testament storage testament = testaments[_testamentId];
        
        require(msg.sender == testament.beneficiary, "Only beneficiary can claim");
        require(block.timestamp >= testament.deadline, "Deadline not reached yet");
        require(!testament.claimed, "Testament already claimed");
        
        testament.claimed = true;
        
        // Transferir fondos al beneficiario
        if (testament.amount > 0) {
            payable(testament.beneficiary).transfer(testament.amount);
        }
        
        emit TestamentClaimed(_testamentId, testament.beneficiary, testament.amount);
    }
    
    /**
     * @dev Obtener todos los testamentos creados por una dirección
     * @param _creator Dirección del creador
     * @return Una lista de IDs de testamentos
     */
    function getTestamentsByCreator(address _creator) external view returns (uint256[] memory) {
        uint256 count = 0;
        
        // Contar testamentos creados por esta dirección
        for (uint256 i = 0; i < totalTestaments; i++) {
            if (testaments[i].creator == _creator) {
                count++;
            }
        }
        
        // Crear un array de tamaño apropiado
        uint256[] memory result = new uint256[](count);
        uint256 index = 0;
        
        // Llenar el array con los IDs correspondientes
        for (uint256 i = 0; i < totalTestaments; i++) {
            if (testaments[i].creator == _creator) {
                result[index] = i;
                index++;
            }
        }
        
        return result;
    }
    
    /**
     * @dev Obtener todos los testamentos donde una dirección es beneficiaria
     * @param _beneficiary Dirección del beneficiario
     * @return Una lista de IDs de testamentos
     */
    function getTestamentsByBeneficiary(address _beneficiary) external view returns (uint256[] memory) {
        uint256 count = 0;
        
        // Contar testamentos para este beneficiario
        for (uint256 i = 0; i < totalTestaments; i++) {
            if (testaments[i].beneficiary == _beneficiary) {
                count++;
            }
        }
        
        // Crear un array de tamaño apropiado
        uint256[] memory result = new uint256[](count);
        uint256 index = 0;
        
        // Llenar el array con los IDs correspondientes
        for (uint256 i = 0; i < totalTestaments; i++) {
            if (testaments[i].beneficiary == _beneficiary) {
                result[index] = i;
                index++;
            }
        }
        
        return result;
    }
    
    /**
     * @dev Obtener información detallada de un testamento
     * @param _testamentId ID del testamento
     * @return name Nombre del testamento
     * @return creator Creador del testamento
     * @return beneficiary Beneficiario del testamento
     * @return encryptedData Datos encriptados del testamento
     * @return deadline Fecha límite para reclamar el testamento
     * @return amount Monto del testamento
     * @return claimed Estado de reclamo del testamento
     * @return createdAt Fecha de creación del testamento
     */
    function getTestamentDetails(uint256 _testamentId) external view returns (
        string memory name,
        address creator,
        address beneficiary,
        string memory encryptedData,
        uint256 deadline,
        uint256 amount,
        bool claimed,
        uint256 createdAt
    ) {
        Testament memory testament = testaments[_testamentId];
        
        return (
            testament.name,
            testament.creator,
            testament.beneficiary,
            testament.encryptedData,
            testament.deadline,
            testament.amount,
            testament.claimed,
            testament.createdAt
        );
    }
}