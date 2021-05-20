# 用 web3js 写以太坊脚本

## ETH

```js
// geth
personal.unlockAccount(eth.accounts[0], "123456", 36000);
// transfer_script.js
var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var _from = web3.eth.accounts[0];
const arguments = process.argv; //  第一项是node   第二项为执行js的完整路径
if(!arguments[2]|| !arguments[3]){
  // err
  console.log("P")
}
var _to = arguments[2];
var _value = arguments[3];
web3.eth.sendTransaction(
  {
    from: _from,
    to: _to,
    value: _value,
  },
  (err, res) => {
    if (!err) {
      console.log("result: " + res);
    } else {
      console.log("err: " + err);
    }
  }
);
// node
node transfer_script.js 0xf1DE2d4c9DA3201B82402b4c3cD06E7E128A1430 10000000000000
```

## token 用每一个地址脚本自动化发币

```js
// Coin
// SPDX-License-Identifier: SimPL-2.0
pragma solidity >=0.7.0;

contract Coin {
    address public minter;
    mapping(address => uint256) public balances;
    event Sent(address from, address to, uint256 amount);

    constructor() {
        minter = msg.sender;
    }

    function mint(address receiver, uint256 amount)
        public
        returns (bool success)
    {
        require(msg.sender == minter);
        balances[receiver] += amount;
        return true;
    }

    function send(address receiver, uint256 amount) public {
        require(amount <= balances[msg.sender]);
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }

    function getBalances(address receiver) public view returns (uint256) {
        return balances[receiver];
    }
}
```

```js
// 生成一个合约并赋值
// CoinContract.js
// 合约部署
var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var abiArray = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      { indexed: false, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Sent",
    type: "event",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "balances",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "receiver", type: "address" }],
    name: "getBalances",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "receiver", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "mint",
    outputs: [{ internalType: "bool", name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "minter",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "receiver", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "send",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
var byteCode =
  "0x" +
  "60806040523480156100115760006000fd5b505b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b61005a565b6106a7806100696000396000f3fe60806040523480156100115760006000fd5b506004361061005c5760003560e01c8063075461721461006257806327e235e31461008057806340c10f19146100b0578063c84aae17146100e0578063d0679d34146101105761005c565b60006000fd5b61006a61012c565b60405161007791906104a5565b60405180910390f35b61009a6004803603810190610095919061040b565b610152565b6040516100a79190610515565b60405180910390f35b6100ca60048036038101906100c59190610436565b61016d565b6040516100d791906104f9565b60405180910390f35b6100fa60048036038101906100f5919061040b565b610238565b6040516101079190610515565b60405180910390f35b61012a60048036038101906101259190610436565b61028c565b005b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60016000506020528060005260406000206000915090505481565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156101cc5760006000fd5b81600160005060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082828250546102209190610531565b92505081909090555060019050610232565b92915050565b6000600160005060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050549050610287565b919050565b600160005060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000505481111515156102e15760006000fd5b80600160005060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082828250546103359190610588565b92505081909090555080600160005060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082828250546103929190610531565b9250508190909055507f3990db2d31862302a685e8086b5755072a6e2b5b780af1ee81ece35ee3cd33453383836040516103ce939291906104c1565b60405180910390a15b505056610670565b6000813590506103ee8161063a565b5b92915050565b60008135905061040481610655565b5b92915050565b60006020828403121561041e5760006000fd5b600061042c848285016103df565b9150505b92915050565b600060006040838503121561044b5760006000fd5b6000610459858286016103df565b925050602061046a858286016103f5565b9150505b9250929050565b61047e816105bd565b825250505b565b61048e816105d0565b825250505b565b61049e816105fe565b825250505b565b60006020820190506104ba6000830184610475565b5b92915050565b60006060820190506104d66000830186610475565b6104e36020830185610475565b6104f06040830184610495565b5b949350505050565b600060208201905061050e6000830184610485565b5b92915050565b600060208201905061052a6000830184610495565b5b92915050565b600061053c826105fe565b9150610547836105fe565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561057c5761057b610609565b5b82820190505b92915050565b6000610593826105fe565b915061059e836105fe565b9250828210156105b1576105b0610609565b5b82820390505b92915050565b60006105c8826105dd565b90505b919050565b600081151590505b919050565b600073ffffffffffffffffffffffffffffffffffffffff821690505b919050565b60008190505b919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b565b610643816105bd565b811415156106515760006000fd5b505b565b61065e816105fe565b8114151561066c5760006000fd5b505b565bfea26469706673582212200e6ac480a1c00cdd07448ed7e1b60e096876438378753c649e86e4ea9369ca0764736f6c63430008040033"; // solcjs --bin Coin.sol
var MyContract = web3.eth.contract(abiArray);
var deployTxObject = {
  from: web3.eth.accounts[0],
  data: byteCode,
  gas: 1000000,
};
var coinContract = web3.eth.contract(abiArray);
var contractInstance = coinContract.new(deployTxObject);
setTimeout(() => {
  console.log(contractInstance.address);
  web3.eth.defaultAccount = web3.eth.accounts[0];
  contractInstance.mint(web3.eth.accounts[0], 10000000000);
  contractInstance.balances(web3.eth.accounts[0]);
  // 0x2e873d61c5d0f713e94afd1ca3201a7e1d01ed4d
}, 20000);
```

```js
// send_coin.js
var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// 实例化合约对象，所有数据类型 和操作在abi定义好了
var abi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      { indexed: false, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Sent",
    type: "event",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "balances",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "receiver", type: "address" }],
    name: "getBalances",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "receiver", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "mint",
    outputs: [{ internalType: "bool", name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "minter",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "receiver", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "send",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
var CoinContract = web3.eth.contract(abi);
var contractAddress = "0x2e873d61c5d0f713e94afd1ca3201a7e1d01ed4d";
var contractInstance = CoinContract.at(contractAddress);
// (_to, amout)  合约参数  {from: _from}  交易对象
var amount = 1000;
var _from = web3.eth.accounts[0];
var _to = web3.eth.accounts[2];
// web3.personal.unlockAccount(_from, "123456", 2000000);
// 必须，要不然报 Invalid Address
web3.eth.defaultAccount = _from;
// contractInstance.mint(_from, 10000000000);
// console.log("ssss: " + contractInstance.getBalances(_to));
contractInstance.send(_to, amount, { from: _from }, (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log({ res });
  }
});
```
