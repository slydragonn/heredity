import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers";
import * as dotenv from "dotenv";

dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

/** @type import('hardhat/config').HardhatUserConfig */
const config = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      chainId: 43112 // Avalanche C-Chain local testnet
    },
    fuji: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      gasPrice: 225000000000,
      chainId: 43113,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    },
    mainnet: {
      url: 'https://api.avax.network/ext/bc/C/rpc',
      gasPrice: 225000000000,
      chainId: 43114,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    }
  }
};

export default config;
