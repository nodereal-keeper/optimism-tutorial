import * as dotenv from 'dotenv';
import { HardhatUserConfig, task } from 'hardhat/config';
import '@nomiclabs/hardhat-ethers';
import '@nomicfoundation/hardhat-chai-matchers';
import '@nomicfoundation/hardhat-toolbox';

dotenv.config();


const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  networks: {
    local: {
       url: "http://localhost:8545",
    },
    semita: {
       chainId: 715,
       url: process.env.ROLLUP_URL,
       accounts: [process.env.DEPLOYER_WALLET_PRIVATE_KEY]
    },
  },
};

export default config;

