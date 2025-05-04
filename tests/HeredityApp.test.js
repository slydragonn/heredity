const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Testament (con inactividad)", function () {
  let testament;
  let testator;
  let beneficiary;
  let other;

  const inactivityPeriod = 60 * 60 * 24 * 30; // 30 días en segundos

  beforeEach(async function () {
    const Testament = await ethers.getContractFactory("Testament");
    [testator, beneficiary, other] = await ethers.getSigners();
    testament = await Testament.deploy();
    await testament.waitForDeployment();
  });

  it("permite crear un testamento con inactividad", async function () {
    const tx = await testament.connect(testator).createTestament(
      beneficiary.address,
      "mensaje-encriptado",
      inactivityPeriod
    );
    await tx.wait();

    const [b, isActive, createdAt, lastCheckIn, period] = await testament.getTestamentInfo(testator.address);
    expect(b).to.equal(beneficiary.address);
    expect(isActive).to.equal(false);
    expect(createdAt).to.be.gt(0);
    expect(lastCheckIn).to.be.gt(0);
    expect(period).to.equal(inactivityPeriod);
  });

  it("falla si beneficiary es address(0)", async function () {
    await expect(
      testament.connect(testator).createTestament(
        ethers.ZeroAddress,
        "msg",
        inactivityPeriod
      )
    ).to.be.revertedWith("Invalid beneficiary");
  });

  it("permite al testador hacer check-in", async function () {
    await testament.connect(testator).createTestament(beneficiary.address, "msg", inactivityPeriod);
    const tx = await testament.connect(testator).checkIn();
    await tx.wait();

    const [, isActive] = await testament.getTestamentInfo(testator.address);
    expect(isActive).to.be.false;
  });

  it("activa testamento si el testador está inactivo", async function () {
    await testament.connect(testator).createTestament(beneficiary.address, "msg", inactivityPeriod);

    // Simulamos paso del tiempo
    await ethers.provider.send("evm_increaseTime", [inactivityPeriod + 1]);
    await ethers.provider.send("evm_mine");

    const tx = await testament.connect(other).triggerTestament(testator.address);
    await tx.wait();

    const [, isActive] = await testament.getTestamentInfo(testator.address);
    expect(isActive).to.be.true;
  });

  it("impide activar si aún no ha pasado el período de inactividad", async function () {
    await testament.connect(testator).createTestament(beneficiary.address, "msg", inactivityPeriod);

    await expect(
      testament.connect(other).triggerTestament(testator.address)
    ).to.be.revertedWith("Testator still active");
  });

  it("permite al beneficiario leer el mensaje si está activo", async function () {
    await testament.connect(testator).createTestament(beneficiary.address, "msg", inactivityPeriod);

    await ethers.provider.send("evm_increaseTime", [inactivityPeriod + 1]);
    await ethers.provider.send("evm_mine");

    await testament.connect(other).triggerTestament(testator.address);

    const result = await testament.connect(beneficiary).getTestament(testator.address);
    expect(result).to.equal("msg");
  });

  it("rechaza lectura si no es el beneficiario", async function () {
    await testament.connect(testator).createTestament(beneficiary.address, "msg", inactivityPeriod);

    await ethers.provider.send("evm_increaseTime", [inactivityPeriod + 1]);
    await ethers.provider.send("evm_mine");

    await testament.connect(other).triggerTestament(testator.address);

    await expect(
      testament.connect(other).getTestament(testator.address)
    ).to.be.revertedWith("Not authorized");
  });

  it("rechaza lectura si el testamento no está activo", async function () {
    await testament.connect(testator).createTestament(beneficiary.address, "msg", inactivityPeriod);

    await expect(
      testament.connect(beneficiary).getTestament(testator.address)
    ).to.be.revertedWith("Testament is not active");
  });
});
