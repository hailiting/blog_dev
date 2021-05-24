# 简单投票 DApp

## 项目搭建

```sh
$ mkdir simple_voting_dapp
$ cd simple_voting_dapp
$ npm init -y
$ npm install ganache-cli web3@0.20.1 solc
$ node_modules/.bin/ganache-cli
```

ganache 前身是 testRPC
非常方便的起一个 geth 测试网络节点，默认有 10 个账户，有 10 个私钥

```js
// ganache-cli 显示的是
Ganache CLI v6.12.2 (ganache-core: 2.13.2)

Available Accounts
==================
(0) 0xFBe5384d8E2E7C71319f65B830D446229D89a766 (100 ETH)
(1) 0xb764972488675dABe5a2B303FE51C13D94d5E53F (100 ETH)
(2) 0x21fCD36B68f9af35F9210568D524b9582C0b008d (100 ETH)
(3) 0x413f5C8239c4a7563db696EFD45133B0B421B18E (100 ETH)
(4) 0x06bF225158b2a7B12bC6F98ea6355e77B7EBbef9 (100 ETH)
(5) 0xb12467b5e7fee6465CC514CBE1db9FDe9cCa6686 (100 ETH)
(6) 0x1575A3a7F161A4870c7621a79319b1dd7F4b343F (100 ETH)
(7) 0x2A9A8E42ca621f9D5002Dd5551EDD9Ea76cD7cc7 (100 ETH)
(8) 0x9E358B2f3467Daf792A23571625EA1d41560A04a (100 ETH)
(9) 0xCf2FEC11a0ec8B34caB1F6FCf6aEf650C738Fd4b (100 ETH)

Private Keys
==================
(0) 0xb96282cfeb8bcd2e2cdab359ee7016314a8e43eb0c21142983889435d571179a
(1) 0x12b4604ba1b3e66be7f2998763ab349ad3bf53e856c98507ab19f234ffa2c3c2
(2) 0xbbae32ad5aaed73e7f052e7f5f268a5660bda26fffacb78bc41fa1b2629e5641
(3) 0x740d393e7ab0f9acbb30a640b98736978a79035a26d7b439195f3b1b6ee66097
(4) 0x29323e389d48dad39a91d21437810df72367c148b3f4f18f18edf6cd1c26cf7a
(5) 0xefee58e509709bdd3efec936499c2d137a9ae86bd48f47c57a99da6e5254b38f
(6) 0x1189345e2bbc54da9da35fc7f5867e30a2fd7299340e74514107733c3dc56f78
(7) 0xb8b6a0d4cb05c57abf4e28e5cfe193c3a8db90d67fe2ee57bb66b1056576dc6d
(8) 0xe209aa8a84086989c43a0637c8395f0fa4938723f0451252cf2a692a4a9f8532
(9) 0x069d1971b0d631877a97fdb1d8afad3edf1fba3260cba5ae18d162a397da2792

HD Wallet
==================
Mnemonic:      frost laugh prevent innocent find shell shoulder dinner noise soon garment coyote
Base HD Path:  m/44'/60'/0'/0/{account_index}

Gas Price
==================
20000000000  // 20Gwei

Gas Limit
==================
6721975

Call Gas Limit
==================
9007199254740991
Listening on 127.0.0.1:8545
```

```sh
└─(09:47:05)──> node_modules/.bin/ganache-cli --help              ──(一, 524)─┘
Network:
  -p, --port              Port number to listen on         [数字] [默认值: 8545]
  -h, --host, --hostname  Hostname to listen on   [字符串] [默认值: "127.0.0.1"]
  --keepAliveTimeout      The number of milliseconds of inactivity a server
                          needs to wait for additional incoming data, after it
                          has finished writing the last response, before a
                          socket will be destroyed.        [数字] [默认值: 5000]

Accounts:
  -a, --accounts                   Number of accounts to generate at startup
                                                             [数字] [默认值: 10]
  -e, --defaultBalanceEther        Amount of ether to assign each test account
                                                            [数字] [默认值: 100]
  --account                        Account data in the form
                                   '<private_key>,<initial_balance>', can be
                                   specified multiple times. Note that private
                                   keys are 64 characters long and must be
                                   entered as an 0x-prefixed hex string. Balance
                                   can either be input as an integer, or as a
                                   0x-prefixed hex string with either form
                                   specifying the initial balance in wei. [数组]
  --account_keys_path, --acctKeys  saves generated accounts and private keys as
                                   JSON object in specified file
                                                         [字符串] [默认值: null]
  -n, --secure                     Lock available accounts by default (good for
                                   third party transaction signing)
                                                          [布尔] [默认值: false]
  -u, --unlock                     Comma-separated list of accounts or indices
                                   to unlock                              [数组]
  --hdPath, --hd_path              The hierarchical deterministic path to use
                                   when generating accounts. Default:
                                   "m/44'/60'/0'/0/"                    [字符串]

Chain:
  -k, --hardfork                Allows users to specify which hardfork should be
                                used. Supported hardforks are `byzantium`,
                                `constantinople`, `petersburg`, `istanbul` and
                                `muirGlacier` (default).
                                                [字符串] [默认值: "muirGlacier"]
  -f, --fork                    Fork from another currently running Ethereum
                                client at a given block. Input should be the
                                HTTP location and port of the other client, e.g.
                                'http://localhost:8545' or optionally provide a
                                block number 'http://localhost:8545@1599200'
                                                        [字符串] [默认值: false]
  --forkCacheSize               The maximum size, in bytes, of the in-memory
                                cache for queries on a chain fork. Defaults to
                                `1_073_741_824` bytes (1 gigabyte). You can set
                                this to `0` to disable caching (not
                                recommended), or to `-1` for unlimited (will be
                                limited by your node process).
                                                     [数字] [默认值: 1073741824]
  --db                          Directory of chain database; creates one if it
                                doesn't exist            [字符串] [默认值: null]
  -s, --seed                    Arbitrary data to generate the HD wallet
                                mnemonic to be used
                         [字符串] [默认值: Random value, unless -d is specified]
  -d, --deterministic           Generate deterministic addresses based on a
                                pre-defined mnemonic.                     [布尔]
  -m, --mnemonic                bip39 mnemonic phrase for generating a PRNG
                                seed, which is in turn used for hierarchical
                                deterministic (HD) account generation   [字符串]
  --noVMErrorsOnRPCResponse     Do not transmit transaction failures as RPC
                                errors. Enable this flag for error reporting
                                behaviour which is compatible with other clients
                                such as geth and Parity.  [布尔] [默认值: false]
  -b, --blockTime               Block time in seconds for automatic mining. Will
                                instantly mine a new block for every transaction
                                if option omitted. Avoid using unless your test
                                cases require a specific mining interval. [数字]
  -i, --networkId               The Network ID ganache-cli will use to identify
                                itself.
            [数字] [默认值: System time at process start or Network ID of forked
                                                      blockchain if configured.]
  --chainId                     The Chain ID ganache-cli will use for
                                `eth_chainId` RPC and the `CHAINID` opcode.
         [数字] [默认值: For legacy reasons, the default is currently `1337` for
   `eth_chainId` RPC and `1` for the `CHAINID` opcode. This will be fixed in the
                            next major version of ganache-cli and ganache-core!]
  -g, --gasPrice                The price of gas in wei
                                                    [数字] [默认值: 20000000000]
  -l, --gasLimit                The block gas limit in wei
                                                        [数字] [默认值: 6721975]
  --callGasLimit                Sets the transaction gas limit for `eth_call`
                                and `eth_estimateGas` calls. Must be specified
                                as a hex string. Defaults to "0x1fffffffffffff"
                                (Number.MAX_SAFE_INTEGER)
                                               [数字] [默认值: 9007199254740991]
  --allowUnlimitedContractSize  Allows unlimited contract sizes while debugging.
                                By enabling this flag, the check within the EVM
                                for contract size limit of 24KB (see EIP-170) is
                                bypassed. Enabling this flag *will* cause
                                ganache-cli to behave differently than
                                production environments.  [布尔] [默认值: false]
  -t, --time                    Date (ISO 8601) that the first block should
                                start. Use this feature, along with the
                                evm_increaseTime method to test time-dependent
                                code.                                   [字符串]

Other:
  --debug        Output VM opcodes for debugging          [布尔] [默认值: false]
  -v, --verbose  Log all requests and responses to stdout [布尔] [默认值: false]
  --mem          Only show memory output, not tx history  [布尔] [默认值: false]
  -q, --quiet    Run ganache quietly (no logs)            [布尔] [默认值: false]

选项：
  --help, -?  显示帮助信息                                                [布尔]
  --version   显示版本号                                                  [布尔]
```

```js
// Voting.sol
// SPDX-License-Identifier: MIT
pragma solidity >0.4.22;
contract Voting {
  // 状态变量
  mapping (bytes32=>uint8) public votesReceived;
  bytes32[] public candidateList;
  // bool isValid;  在程序设计的安全性上有问题
  constructor(bytes32[] memory candidateNames) {
    candidateList = candidateNames;
  }
  // modifier validateCandidate(bytes32 candidateName){
  //   for(uint8 i=0;i<candidateList.length;i++){
  //     if(candidateName == candidateList[i]){
  //       isValid = true;
  //     }
  //   }
  //   ifValid = false;
  //   _;
  // }

  function totalVotesFor(bytes32 candidate) view public returns (uint8){
    require(validCandidate(candidate));
    return votesReceived[candidate];
  }
  // 投票
  function voteForCandidate(bytes32 candidate) public {
    require(validCandidate(candidate));
    votesReceived[candidate] +=1;
  }
  function validCandidate(bytes32 candidate) view public returns (bool){
    // candidateList 是变长数组，for不太好
    for(uint i=0; i<candidateList.length; i++){
      if(candidateList[i] ==candidate){
        return true;
      }
    }
    return false;
  }
}
```

```js
/// compile.js   读取contract .sol文件
const path = require("path");
const fs = require("fs");
const solc = require("solc");
const votingPath = path.resolve(__dirname, "contracts", "Voting.sol");

const source = fs.readFileSync(votingPath, "utf8");
// module.exports = solc.compile(source, 1).contracts[":Voting"];

const input = {
  language: "Solidity",
  sources: {
    "Voting.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};
const output = JSON.parse(solc.compile(JSON.stringify(input)));
module.exports = output.contracts["Voting.sol"].Voting;

/// create_contract.js  创建 及 使用 合约
const Web3 = require("web3");
const compiledFile = require("./compile");

const interface = compiledFile.abi;
const bytecode = compiledFile.evm.bytecode.object;

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const accounts = web3.eth.accounts;
const abiDefinition = compiledFile.abi;
const VotingContract = web3.eth.contract(abiDefinition);
const byteCode = compiledFile.evm.bytecode.object;
// // VotingContract.new  将一个合约部署到区块链
// const deployedContract = VotingContract.new(["Alice", "Bob", "Cary"], {
//   data: byteCode, // 编译后部署到区块链上的字节码
//   from: web3.eth.accounts[0], // 谁部署了这个合约
//   gas: 4700000, // 需要花费的金额
// });
// const deployedContractAddress = deployedContract.address;
// console.log(deployedContractAddress);
// 0x69917f5f485468f082b63e48038ba4c62a3af99c
const contractInstance = VotingContract.at(
  "0x69917f5f485468f082b63e48038ba4c62a3af99c"
);
var _from = accounts[0];
// web3.personal.unlockAccount(_from, "123456", 2000000);
// 必须，要不然报 Invalid Address
web3.eth.defaultAccount = _from;
let a = contractInstance.totalVotesFor.call("Alice").toLocaleString();
console.log(a);
contractInstance.voteForCandidate("Alice", { from: web3.eth.accounts[0] });
a = contractInstance.totalVotesFor.call("Alice").toLocaleString();
console.log(a);
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Voting DApp</title>
  </head>
  <body>
    <h1>A Simple Voting Application</h1>
    <table>
      <thead>
        <tr>
          <th>Candidate</th>
          <th>Votes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Alice</td>
          <td id="candidate-1">-</td>
        </tr>
        <tr>
          <td>Bob</td>
          <td id="candidate-2">-</td>
        </tr>
        <tr>
          <td>Cary</td>
          <td id="candidate-3">-</td>
        </tr>
      </tbody>
    </table>
    <input type="text" id="candidate" />
    <a href="#" onclick="voteForCandidate()" class="btn btn-primary">Vote</a>
    <script src="https://cdn.jsdelivr.net/gh/ethereum/web3.js/dist/web3.mi
n.js"></script>
    <script src="https://code.jquery.com/jquery-3.1.1.slim.min.js"></script>
    <script>
      console.log(Web3.version); // 1.3.4
      let userAccount;
      let contractInstace;
      const web3 = new Web3(
        new Web3.providers.HttpProvider("http://localhost:8545")
      );
      const candidates = {
        Alice: "candidate-1",
        Bob: "candidate-2",
        Cary: "candidate-3",
      };

      $(document).ready(function async() {
        web3.eth.getAccounts().then((accounts) => {
          userAccount = accounts;
          const abi = JSON.parse(
            '[{"inputs":[{"internalType":"bytes32[]","name":"candidateNames","type":"bytes32[]"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"candidateList","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"}]'
          );
          contractInstace = new web3.eth.Contract(
            abi,
            "0x69917f5f485468f082b63e48038ba4c62a3af99c",
            {
              from: userAccount[0],
              gasPrice: "20000000000",
            }
          );
          const candidateNames = Object.keys(candidates);
          for (var i = 0; i < candidateNames.length; i++) {
            (function (i) {
              let name = candidateNames[i];
              contractInstace.methods
                .totalVotesFor(web3.utils.fromAscii(name, 32))
                .call()
                .then((val) => {
                  $(`#candidate-${i + 1}`).html(val.toString());
                });
            })(i);
          }
        });
      });

      async function voteForCandidate() {
        const candidateName = $("#candidate").val();
        console.log(candidateName);
        try {
          contractInstace.methods
            .voteForCandidate(web3.utils.fromAscii(candidateName, 32))
            .send({
              from: web3.eth.accounts[0],
            })
            .on("error", (error) => {})
            .on("transactionHash", (transactionHash) => {
              console.log(transactionHash);
              // })
              // .then(function (receipt) {
              // console.log(receipt);
              let div_id = candidates[candidateName];
              contractInstace.methods
                .totalVotesFor(web3.utils.fromAscii(candidateName, 32))
                .call()
                .then((val) => {
                  console.log(candidateName, div_id);
                  console.log(val);
                  $(`#${div_id}`).html(val);
                });
            });
        } catch (err) {
          console.log(err);
        }
      }
    </script>
  </body>
</html>
```

参考地址 https://github.com/XiangXaoLong/EthereumWorkshop/tree/43d4d11cea737780a7baaac8ba70ad0dbc466c03/DApp
