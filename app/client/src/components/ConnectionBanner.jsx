import React from 'react';

const ConnectionBanner = ({ connectWallet }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Bienvenido a Heredity</h2>
      <p className="text-gray-600 mb-6">
        Heredity es una dApp que te permite crear testamentos digitales en la blockchain de Avalanche.
        Tus activos y mensajes serán entregados automáticamente a tus beneficiarios en la fecha que especifiques.
      </p>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Características principales:</h3>
        <ul className="text-gray-600 list-disc list-inside">
          <li>Crea testamentos digitales con fondos AVAX</li>
          <li>Incluye mensajes encriptados para tus seres queridos</li>
          <li>Define fechas límite para la liberación automática</li>
          <li>Gestiona tus testamentos y herencias desde un solo lugar</li>
        </ul>
      </div>
      <button
        onClick={connectWallet}
        className="btn btn-primary"
      >
        Conectar Wallet para Comenzar
      </button>
    </div>
  );
};

export default ConnectionBanner;