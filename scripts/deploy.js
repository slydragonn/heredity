import { ethers } from "hardhat";

async function main() {
  const Will = await ethers.getContractFactory("HeredityApp");
  const will = await Will.deploy();
  await will.waitForDeployment();
  console.log("Deployed to:", will.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });