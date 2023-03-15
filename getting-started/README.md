# Getting started developing for Semita Rollups


This tutorial teaches you the basics of Semita Rollups development.
Semita Rollups is [Ethereum equivalent](https://community.optimism.io/docs/developers/bedrock/explainer/#ethereum-equivalence), meaning it has maximum compatibility with the existing Ethereum developer experience.
Therefore, the differences between Semita Rollups development and Ethereum development are minor.
But a few differences [do exist](https://community.optimism.io/docs/developers/bedrock/differences/).


## Semita Rollups endpoint URL

To access any EVM-compatible blockchain you need an endpoint. 
We recommend you get one from [MegaNode](https://meganode.nodereal.io/).
[See here](https://docs.nodereal.io/docs/getting-started) for step by step directions on using MegaNode.


### Network choice

For development purposes we recommend you use either a local development node or [Semita Rollup Aries Testnet](TBD).
That way you don't need to spend real money.
If you need BNB on Semita Aries for testing purposes, [you can use this faucet]().

The tests examples below all use Semita Aries testnet.


## Interacting with Optimism contracts

We have [Sample contract]() on Optimism Goerli, at address [0xBd8500313ad026cC25B35Fd5d223EBBcb8A8640E](). 
You can verify your development stack configuration by interacting with it. 

As you can see in the different development stacks below, the way you deploy contracts and interact with them on Optimism is almost identical to the way you do it with L1 Ethereum.
The most visible difference is that you have to specify a different endpoint (of course). 
The list of other differences is [here](https://community.optimism.io/docs/developers/build/differences/).

## Development stacks

- [Hardhat](#hardhat)
- [Remix](#remix)
- [Truffle](#truffle)
- [Waffle](#waffle)
- [Foundry](#foundry)

### Hardhat

In [Hardhat](https://hardhat.org/) you use a configuration similar to [this one](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/getting-started/hardhat).

#### Connecting to Semita Rollups

Follow these steps to add Semita Rollups Aries support to a newly created Hardhat project. 


1. Define your network configuration in `.env`:

   ```sh
   # Put the mnemonic for an account on Optimism here
   MNEMONIC=test test test test test test test test test test test test

   # API KEY for MegaNode
   # MEGANODE_API_KEY=

   # URL to access semita rollup
   ROLLUP_URL=
   ```

1. Add `dotenv` to your project:

   ```sh
   yarn add dotenv
   ```

1. Edit `hardhat.config.js`:

   1. Use `.env` for your blockchain configuration:

      ```ts
      import * as dotenv from 'dotenv';
      dotenv.config();
      ```

   1. Add a network definition in `module.exports.networks`:

   ```ts
     semita: {
       url: process.env.ROLLUPURL,
       accounts: { mnemonic: process.env.MNEMONIC }
    }
   ```


#### Greeter interaction

1. Run the console:
   ```sh
   cd hardhat
   npx hardhat console --network semita
   ```

1. Connect to the Greeter contract:   

   ```ts
   Greeter = await ethers.getContractFactory("Greeter")
   greeter = await Greeter.attach("0xBd8500313ad026cC25B35Fd5d223EBBcb8A8640E")
   ```


1. Read information from the contract:

   ```ts
   await greeter.greet()
   ```

1. Submit a transaction, wait for it to be processed, and see that it affected the state.

   ```ts
   tx = await greeter.setGreeting(`Hardhat: Hello ${new Date()}`)
   rcpt = await tx.wait()  
   await greeter.greet()
   ```

#### Deploying a contract

To deploy a contract from the Hardhat console:

```ts
import { ethers } from "hardhat";

async function main() {
  const ContractFactory = await ethers.getContractFactory("Greeter");

  const instance = await ContractFactory.deploy("Hello, world!");
  await instance.deployed();

  console.log(`Contract deployed to ${instance.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

```
