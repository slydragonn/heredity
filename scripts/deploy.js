import { ethers } from "hardhat";

async function main() {
  const simpleStorage = await ethers.deployContract("SimpleStorage");
  await simpleStorage.waitForDeployment();

  console.log("SimpleStorage deployed to:", await simpleStorage.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });