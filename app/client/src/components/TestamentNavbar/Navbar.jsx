import React from 'react';
import styles from "./Navbar.module.css";
import Logo from '../Logo/Logo';

const Navbar = ({ account, connectWallet, activeSection, setActiveSection }) => {
  // Función para acortar la dirección de la wallet
  const shortenAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <nav className={styles.navbar}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Logo />
          </div>
          
          {account && (
            <div className="hidden md:flex space-x-6">
              <button 
                onClick={() => setActiveSection('create')}
                className={`font-medium ${activeSection === 'create' ? 'text-avalanche border-b-2 border-avalanche' : 'text-gray-500 hover:text-avalanche'}`}
              >
                Crear Testamento
              </button>
              <button 
                onClick={() => setActiveSection('manage')}
                className={`font-medium ${activeSection === 'manage' ? 'text-avalanche border-b-2 border-avalanche' : 'text-gray-500 hover:text-avalanche'}`}
              >
                Mis Testamentos
              </button>
              <button 
                onClick={() => setActiveSection('inheritances')}
                className={`font-medium ${activeSection === 'inheritances' ? 'text-avalanche border-b-2 border-avalanche' : 'text-gray-500 hover:text-avalanche'}`}
              >
                Mis Herencias
              </button>
            </div>
          )}
          
          <div>
            {account ? (
              <div className="flex items-center">
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-2">
                  Conectado
                </div>
                <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-lg text-sm">
                  {shortenAddress(account)}
                </div>
              </div>
            ) : (
              <button 
                onClick={connectWallet}
                className="btn btn-primary"
              >
                Conectar Wallet
              </button>
            )}
          </div>
        </div>
        
        {/* Menú móvil */}
        {account && (
          <div className="md:hidden pb-4 flex justify-center space-x-4">
            <button 
              onClick={() => setActiveSection('create')}
              className={`text-sm font-medium ${activeSection === 'create' ? 'text-avalanche' : 'text-gray-500'}`}
            >
              Crear
            </button>
            <button 
              onClick={() => setActiveSection('manage')}
              className={`text-sm font-medium ${activeSection === 'manage' ? 'text-avalanche' : 'text-gray-500'}`}
            >
              Mis Testamentos
            </button>
            <button 
              onClick={() => setActiveSection('inheritances')}
              className={`text-sm font-medium ${activeSection === 'inheritances' ? 'text-avalanche' : 'text-gray-500'}`}
            >
              Mis Herencias
            </button>
          </div>
        )}
      </div>
      
    </nav>
  );
};

export default Navbar;