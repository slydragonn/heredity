const hre = require("hardhat");

async function main() {
  // Obtener el contrato Heredity
  const Heredity = await hre.ethers.getContractFactory("Heredity");
  
  // Desplegar el contrato
  const heredity = await Heredity.deploy();
  await heredity.deployed();

  console.log("Heredity desplegado en:", heredity.address);
}

// Ejecutar el script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });