// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract HeredityApp {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    struct DigitalWill {
        address beneficiary;
        string encryptedMessage;
        bool isActive;
        uint timestampCreated;
        uint lastCheckIn;
        uint inactivityPeriod; // in seconds
    }

    mapping(address => DigitalWill) private testaments;

    event TestamentCreated(address indexed testator, address indexed beneficiary);
    event TestamentActivatedAutomatically(address indexed testator);
    event CheckIn(address indexed testator);

    function createTestament(
        address _beneficiary,
        string calldata _encryptedMessage,
        uint _inactivityPeriod
    ) external {
        require(_beneficiary != address(0), "Invalid beneficiary");
        require(_inactivityPeriod > 0, "Inactivity period required");

        testaments[msg.sender] = DigitalWill({
            beneficiary: _beneficiary,
            encryptedMessage: _encryptedMessage,
            isActive: false,
            timestampCreated: block.timestamp,
            lastCheckIn: block.timestamp,
            inactivityPeriod: _inactivityPeriod
        });

        emit TestamentCreated(msg.sender, _beneficiary);
    }

    /// Testator checks in to prove they are alive
    function checkIn() external {
        DigitalWill storage t = testaments[msg.sender];
        require(t.beneficiary != address(0), "No testament found");
        t.lastCheckIn = block.timestamp;
        t.isActive = false; // Keep inactive until inactive period passes again
        emit CheckIn(msg.sender);
    }

    /// Anyone can trigger the testament if the testator has been inactive too long
    function triggerTestament(address _testator) external {
        DigitalWill storage t = testaments[_testator];
        require(t.beneficiary != address(0), "No testament found");

        require(!t.isActive, "Already active");

        uint timeSinceLastCheckIn = block.timestamp - t.lastCheckIn;
        require(timeSinceLastCheckIn >= t.inactivityPeriod, "Testator still active");

        t.isActive = true;
        emit TestamentActivatedAutomatically(_testator);
    }

    /// Beneficiary reads the testament
    function getTestament(address _testator) external view returns (string memory) {
        DigitalWill memory t = testaments[_testator];
        require(t.isActive, "Testament is not active");
        require(msg.sender == t.beneficiary, "Not authorized");
        return t.encryptedMessage;
    }

    function getTestamentInfo(address _testator) external view returns (
        address beneficiary,
        bool isActive,
        uint timestampCreated,
        uint lastCheckIn,
        uint inactivityPeriod
    ) {
        DigitalWill memory t = testaments[_testator];
        return (
            t.beneficiary,
            t.isActive,
            t.timestampCreated,
            t.lastCheckIn,
            t.inactivityPeriod
        );
    }
}
