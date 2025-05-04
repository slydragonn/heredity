// src/App.jsx
import { useState } from 'react';
import { ethers } from 'ethers';
import TestamentABI from './abi/HeredityApp.json';

const CONTRACT_ADDRESS = '0x3ED7898D58e5515e32Fe1a138E89b84Ca1817813'; // Cambiar por tu dirección desplegada

function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [beneficiary, setBeneficiary] = useState('');
  const [message, setMessage] = useState('');
  const [period, setPeriod] = useState(0);
  const [status, setStatus] = useState('');
  const [retrievedMessage, setRetrievedMessage] = useState('');

  const connectWallet = async () => {
    if (!window.ethereum) return alert('MetaMask no está instalado');
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    console.log(TestamentABI.abi)
    const testamentContract = new ethers.Contract(CONTRACT_ADDRESS, TestamentABI.abi, signer);
    setAccount(accounts[0]);
    setContract(testamentContract);
    
  };

  const createTestament = async () => {
    try {
      const tx = await contract.createTestament(beneficiary, message, period);
      setStatus('Creando testamento...');
      await tx.wait();
      setStatus('✅ Testamento creado');
    } catch (err) {
      console.error(err);
      setStatus('❌ Error al crear testamento');
    }
  };

  const checkIn = async () => {
    try {
      const tx = await contract.checkIn();
      await tx.wait();
      setStatus('✅ Check-in exitoso');
    } catch (err) {
      console.error(err);
      setStatus('❌ Error en check-in');
    }
  };

  const triggerTestament = async () => {
    try {
      const tx = await contract.triggerTestament(account);
      await tx.wait();
      setStatus('✅ Testamento activado por inactividad');
    } catch (err) {
      console.error(err);
      setStatus('⚠️ No se puede activar aún. ¿Ya pasó el tiempo?');
    }
  };

  const readTestament = async () => {
    try {
      const result = await contract.getTestament(account);
      setRetrievedMessage(result);
      setStatus('✅ Mensaje leído');
    } catch (err) {
      console.error(err);
      setStatus('❌ No autorizado o testamento inactivo');
    }
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📜 DApp de Testamento Digital</h1>
      {!account ? (
        <button onClick={connectWallet} className="bg-blue-600 text-white px-4 py-2 rounded">
          Conectar Wallet
        </button>
      ) : (
        <>
          <p className="text-sm mb-4">Conectado: {account}</p>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Beneficiario"
              className="w-full border p-2 rounded"
              onChange={(e) => setBeneficiary(e.target.value)}
            />
            <input
              type="text"
              placeholder="Mensaje cifrado"
              className="w-full border p-2 rounded"
              onChange={(e) => setMessage(e.target.value)}
            />
            <input
              type="number"
              placeholder="Periodo de inactividad (segundos)"
              className="w-full border p-2 rounded"
              onChange={(e) => setPeriod(Number(e.target.value))}
            />
            <div className="grid grid-cols-2 gap-2">
              <button onClick={createTestament} className="bg-green-600 text-white px-4 py-2 rounded">
                Crear Testamento
              </button>
              <button onClick={checkIn} className="bg-yellow-500 text-white px-4 py-2 rounded">
                Check-In
              </button>
              <button onClick={triggerTestament} className="bg-red-600 text-white px-4 py-2 rounded">
                Activar Testamento
              </button>
              <button onClick={readTestament} className="bg-purple-600 text-white px-4 py-2 rounded">
                Leer Testamento
              </button>
            </div>
            {status && <p className="text-sm text-gray-700">Estado: {status}</p>}
            {retrievedMessage && (
              <div className="mt-2 p-2 border rounded bg-gray-100">
                <strong>Mensaje:</strong> {retrievedMessage}
              </div>
            )}
          </div>
        </>
      )}
    </main>
  );
}

export default App;
