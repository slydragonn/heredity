import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';
import Navbar from './components/TestamentNavbar/Navbar';
import ConnectionBanner from './components/ConnectionBanner';
import CreateTestament from './components/CreateTestament';
import ManageTestaments from './components/ManageTestaments';
import MyInheritances from './components/MyInheritances';
import HeredityArtifact from './artifacts/contracts/Heredity.sol/Heredity.json';

function App() {
  const [account, setAccount] = useState('');
  const [signer, setSigner] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [activeSection, setActiveSection] = useState('create');
  const [loading, setLoading] = useState(true);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        
        const networkId = (await provider.getNetwork()).chainId;
        // Verificamos si estamos en Avalanche C-Chain local (chainId: 43114)
        if (networkId !== 43114 && networkId !== 43113) {
          toast.error("Por favor, conecta con la red de Avalanche C-Chain");
          return;
        }

        setAccount(address);
        setSigner(signer);
        setProvider(provider);
        
        // Buscar el contrato desplegado
        // En un MVP, suponemos que ya tenemos la dirección del contrato
        const contractAddress = localStorage.getItem('contractAddress') || '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Dirección por defecto en hardhat
        const contract = new ethers.Contract(contractAddress, HeredityArtifact.abi, signer);
        setContract(contract);
        
        toast.success("¡Wallet conectada correctamente!");
        setLoading(false);
      } else {
        toast.error("Por favor, instala MetaMask");
      }
    } catch (error) {
      console.error("Error al conectar wallet:", error);
      toast.error("Error al conectar wallet");
    }
  };

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const accounts = await provider.listAccounts();
          
          if (accounts.length > 0) {
            connectWallet();
          } else {
            setLoading(false);
          }
        } catch (error) {
          console.error("Error checking connection:", error);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    
    checkConnection();
    
    // Escuchar cambios de cuenta
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', () => {
        connectWallet();
      });
      
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
    
    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar 
        account={account} 
        connectWallet={connectWallet} 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-avalanche"></div>
          </div>
        ) : !account ? (
          <ConnectionBanner connectWallet={connectWallet} />
        ) : (
          <div>
            {activeSection === 'create' && (
              <CreateTestament contract={contract} account={account} />
            )}
            
            {activeSection === 'manage' && (
              <ManageTestaments contract={contract} account={account} />
            )}
            
            {activeSection === 'inheritances' && (
              <MyInheritances contract={contract} account={account} />
            )}
          </div>
        )}
      </main>
      
      <footer className="bg-gray-800 text-white py-4 text-center">
        <div className="container mx-auto">
          <p>Heredity - Testamento Digital en Avalanche</p>
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} - MVP para Hackathon</p>
        </div>
      </footer>
    </div>
  );
}

export default App;