import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';

const ManageTestaments = ({ contract, account }) => {
  const [testaments, setTestaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestaments = async () => {
      try {
        if (!contract) return;
        
        // Obtener IDs de testamentos creados por el usuario
        const testamentIds = await contract.getTestamentsByCreator(account);
        
        const testamentsData = await Promise.all(
          testamentIds.map(async (id) => {
            const testament = await contract.getTestamentDetails(id);
            return {
              id: id.toString(),
              name: testament.name,
              beneficiary: testament.beneficiary,
              encryptedData: testament.encryptedData,
              deadline: new Date(testament.deadline.toNumber() * 1000),
              amount: ethers.utils.formatEther(testament.amount),
              claimed: testament.claimed,
              createdAt: new Date(testament.createdAt.toNumber() * 1000)
            };
          })
        );
        
        setTestaments(testamentsData);
      } catch (error) {
        console.error("Error fetching testaments:", error);
        toast.error("Error al cargar los testamentos");
      } finally {
        setLoading(false);
      }
    };
    
    if (contract && account) {
      fetchTestaments();
    }
  }, [contract, account]);

  // Formatear dirección para mostrar
  const shortenAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Formatear fecha para mostrar
  const formatDate = (date) => {
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Mis Testamentos</h2>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-avalanche"></div>
        </div>
      ) : testaments.length === 0 ? (
        <div className="card text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No tienes testamentos creados</h3>
          <p className="text-gray-600 mb-4">
            Crea tu primer testamento digital para asegurar que tus activos lleguen a tus seres queridos.
          </p>
        </div>
      ) : (
        <div>
          {testaments.map((testament) => (
            <div key={testament.id} className="card mb-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">{testament.name}</h3>
                <div className={`px-3 py-1 rounded-full text-sm ${testament.claimed ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                  {testament.claimed ? 'Reclamado' : 'Pendiente'}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Beneficiario</p>
                  <p className="font-medium">{shortenAddress(testament.beneficiary)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Fecha Límite</p>
                  <p className="font-medium">{formatDate(testament.deadline)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Cantidad</p>
                  <p className="font-medium">{testament.amount} AVAX</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Creado</p>
                  <p className="font-medium">{formatDate(testament.createdAt)}</p>
                </div>
              </div>
              
              {testament.encryptedData && (
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">Mensaje</p>
                  <div className="bg-gray-100 p-3 rounded-lg text-gray-800 break-words">
                    {testament.encryptedData}
                  </div>
                </div>
              )}
              
              <div className="border-t border-gray-200 pt-4 mt-2 text-sm text-gray-500">
                ID: {testament.id}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageTestaments;