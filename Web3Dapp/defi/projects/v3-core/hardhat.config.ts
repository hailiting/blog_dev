import type { NetworkUserConfig } from "hardhat/types";
import "@nomiclabs/hardhat-ethers"
import "@nomiclabs/hardhat-etherscan"
import "@nomiclabs/hardhat-waffle"
import "@typechain/hardhat"
import "hardhat-watcher"
import "dotenv/config"
import "solidity-docgen"
require("dotenv").config({
  path: require("find-config")(".env")
})
const DEFAULT_COMPILER_SETTINGS =   {
  version: "0.7.6",
  settings: {
    evmVersion: "istanbul",
    optimizer: {
      enabled: true,
      runs: 1_000_000,
    },
    metadata: {
      bytecodeHash: "none"
    }
  }
}
const bscTestnet: NetworkUserConfig = {
  url: "",
  chainId: 97,
  accounts: [process.env.KEY_TESTNET ?? ""],
}
const LOWEST_OPTIMIZER_COMPILER_SETTINGS = {
  version: "0.7.6",
  settings: {
    evmVersion: "istanbul",
    optimizer: {
      enabled: true,
      runs: 400,
    },
    metadata: {
      bytescodeHash: "none"
    }
  }
}
export default {
  networks: {
    bscTestnet,
  },
  ethersscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  solidity: {
    compilers: [
      DEFAULT_COMPILER_SETTINGS
    ],
    overrides: {
      "contracts/PancakeV3Pool.sol": LOWEST_OPTIMIZER_COMPILER_SETTINGS
    }
  },
  watcher: {
    test: {
      tasks: [{
        command: "test",
        params: {
          testFiles: ["{path}"]
        }
      }],
      files: ["./test/**/*"],
      verbose: true,
    }
  },
  docgen: {
    pages: "files",
  }
}