import { expect } from "chai";
import { ethers } from "hardhat";

describe("Greeter", function () {
  it("Test Greeter contract", async function () {
    const ContractFactory = await ethers.getContractFactory("Greeter");

    const greeter = await ContractFactory.deploy("Hello, world!");

    console.log(`Addr: ${greeter.address}`)

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
