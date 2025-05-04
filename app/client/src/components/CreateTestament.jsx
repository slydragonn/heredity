import React, { useState } from 'react';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';

const CreateTestament = ({ contract, account }) => {
  const [name, setName] = useState('');
  const [beneficiary, setBeneficiary] = useState('');
  const [encryptedData, setEncryptedData] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!ethers.utils.isAddress(beneficiary)) {
      toast.error('Dirección de beneficiario inválida');
      return;
    }
    
    if (!deadlineDate) {
      toast.error('Por favor, selecciona una fecha límite');
      return;
    }
    
    const deadlineTimestamp = Math.floor(new Date(deadlineDate).getTime() / 1000);
    if (deadlineTimestamp <= Math.floor(Date.now() / 1000)) {
      toast.error('La fecha límite debe ser en el futuro');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const amountInWei = ethers.utils.parseEther(amount || '0');
      
      const tx = await contract.createTestament(
        name,
        beneficiary,
        encryptedData,
        deadlineTimestamp,
        { value: amountInWei }
      );
      
      toast.success('Transacción enviada, por favor espera la confirmación...');
      
      await tx.wait();
      
      toast.success('¡Testamento creado con éxito!');
      
      // Limpiar el formulario
      setName('');
      setBeneficiary('');
      setEncryptedData('');
      setDeadlineDate('');
      setAmount('');
    } catch (error) {
      console.error("Error al crear testamento:", error);
      toast.error('Error al crear el testamento');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Obtener fecha mínima (mañana)
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Crear Nuevo Testamento</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Nombre del Testamento</label>
            <input
              type="text"
              className="input-field"
              placeholder="Ej: Testamento para mi hijo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Dirección del Beneficiario</label>
            <input
              type="text"
              className="input-field"
              placeholder="0x..."
              value={beneficiary}
              onChange={(e) => setBeneficiary(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Mensaje Encriptado (Opcional)</label>
            <textarea
              className="input-field h-32"
              placeholder="Mensaje para tu beneficiario..."
              value={encryptedData}
              onChange={(e) => setEncryptedData(e.target.value)}
            ></textarea>
            <p className="text-sm text-gray-500 mt-1">
              Este mensaje se almacenará en la blockchain y será visible para tu beneficiario.
            </p>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Fecha Límite</label>
            <input
              type="date"
              className="input-field"
              min={getTomorrowDate()}
              value={deadlineDate}
              onChange={(e) => setDeadlineDate(e.target.value)}
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              A partir de esta fecha, tu beneficiario podrá reclamar la herencia.
            </p>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Cantidad de AVAX a Depositar</label>
            <div className="relative">
              <input
                type="number"
                className="input-field pr-12"
                placeholder="0.0"
                min="0"
                step="0.001"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500">AVAX</span>
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent mr-2"></div>
                Procesando...
              </div>
            ) : (
              'Crear Testamento'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTestament;