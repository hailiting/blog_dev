import { ethers } from "ethers";
import Web3 from "web3";

// // ethers
// const abi = [
//   "constructor(uint256 _startReleaseBlock, uint256 _endReleaseBlock)",
// ];
const encodedArgs = [
  "00000000000000000000000000000000000000000000000000000000009b6e4f",
  "000000000000000000000000000000000000000000000000000000000154004f",
];
// const decodedArgs = ethers.AbiCoder.defaultAbiCoder.de

// web3

const abi = [
  {
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "factory",
        type: "address",
      },
    ],
    // ...
  },
];

const web3 = new Web3();
const decodedArgs = web3.eth.abi.decodeParameters(
  abi[0].inputs,
  "000000000000000000000000158b7a4b6690a0b01f3a90a90aaa76ac4bf25fd4"
);

console.log(`${decodedArgs[0]}`);
// console.log(`${decodedArgs[1]}`);
