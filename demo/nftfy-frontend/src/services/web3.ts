import Portis from "@portis/web3";
import Web3 from "web3";

declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}

if (window.ethereum) {
  window.web3 = new Web3(window.ethereum);
  window.ethereum.enable(); // should wait?
}

if (!window.web3) {
  const DAPP_ID = "a0fa4f71-2d8e-4a67-baa6-33ab41c3ba26";
  const portis = new Portis(DAPP_ID, "mainnet");
  window.web3 = new Web3(portis.provider);
}

const web3 = new Web3(window.web3.currentProvider);

const NFTFY_CONTRACT_RINKEBY = "0xc0D1946C1754d2F94dE4Cf52deF7162f6611316D";

const NFTFY_ABI = require("../contracts/Nftfy.json");
const WRAPPER_ABI = require("../contracts/Wrapper.json");
const SHARES_ABI = require("../contracts/Shares.json");

const ERC20_METADATA_ABI = require("../contracts/ERC20Metadata.json");
const ERC20_ABI = require("../contracts/ERC20.json");
// const ERC721_METADATA_ABI = require("../contracts/ERC721Metadata.json");
const USBC_ERC721_ABI = require("../contracts/USBCERC721.json");
// const ERC721_ENUMERABLE_ABI = require("../contracts/ERC721Enumerable.json");
const ERC165_ABI = require("../contracts/ERC165.json");

// const ERC721_METADATA_INTERFACE_ID = '0x5b5e139f';
const ERC721_INTERFACE_ID = "0x80ac58cd";
// const ERC721_ENUMERABLE_INTERFACE_ID = '0x780e9d63';

export async function getNftfyContract(): Promise<string> {
  const network = await web3.eth.net.getNetworkType();
  switch (network) {
    // TODO main
    case "main":
      return "0x97fb1e97A05aF8ff862C7f5fA9e28C716660d632";
    case "rinkeby":
      return NFTFY_CONTRACT_RINKEBY;
    default:
      throw new Error("Unsupported network");
  }
}

function toCents(amount: string, decimals: number): string {
  return (Number(amount) * 10 ** decimals).toFixed(0);
}

function fromCents(amount: string, decimals: number): string {
  return (Number(amount) / 10 ** decimals).toFixed(decimals);
}

export function isValidAddress(address: string): boolean {
  return web3.utils.isAddress(address);
}

export async function resolveName(name: string): Promise<string> {
  if (/^0x[0-9A-Fa-f]{40}$/.test(name)) return name;
  return web3.eth.ens.getAddress(name);
}

export async function getAccounts(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    web3.eth.getAccounts((error, accounts) => {
      if (error) return reject(error);
      return resolve(accounts);
    });
  });
}

export async function getETHBalance(address: string): Promise<string> {
  return new Promise((resolve, reject) => {
    web3.eth.getBalance(address, "latest", (error, balance) => {
      if (error) return reject(error);
      return resolve(web3.utils.fromWei(balance, "ether"));
    });
  });
}

export async function transferETH(
  account: string,
  address: string,
  amount: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    web3.eth
      .sendTransaction({
        from: account,
        to: address,
        value: web3.utils.toWei(amount, "ether"),
      })
      .once("confirmation", (confNumber: any, receipt: any) => resolve())
      .once("error", reject);
  });
}

async function ERC20_name(contract: string): Promise<string> {
  const abi = new window.web3.eth.Contract(ERC20_METADATA_ABI, contract);
  return abi.methods.name().call();
}

async function ERC20_symbol(contract: string): Promise<string> {
  const abi = new window.web3.eth.Contract(ERC20_METADATA_ABI, contract);
  return abi.methods.symbol().call();
}

async function ERC20_decimals(contract: string): Promise<number> {
  const abi = new window.web3.eth.Contract(ERC20_METADATA_ABI, contract);
  return Number(await abi.methods.decimals().call());
}

async function ERC20_balanceOf(
  contract: string,
  address: string
): Promise<string> {
  const abi = new window.web3.eth.Contract(ERC20_ABI, contract);
  return abi.methods.balanceOf(address).call();
}

async function ERC20_transfer(
  account: string,
  contract: string,
  address: string,
  amount: string
): Promise<void> {
  const abi = new window.web3.eth.Contract(ERC20_ABI, contract);
  return new Promise((resolve, reject) => {
    abi.methods
      .transfer(address, amount)
      .send({ from: account })
      .once("confirmation", (confNumber: any, receipt: any) => resolve())
      .once("error", reject);
  });
}

export async function getERC20Name(contract: string): Promise<string> {
  return ERC20_name(contract);
}

export async function getERC20Symbol(contract: string): Promise<string> {
  return ERC20_symbol(contract);
}

export async function getERC20Balance(
  account: string,
  contract: string
): Promise<string> {
  const decimals = await ERC20_decimals(contract);
  const balance = await ERC20_balanceOf(contract, account);
  return fromCents(balance, decimals);
}

export async function transferERC20(
  account: string,
  contract: string,
  address: string,
  amount: string
): Promise<void> {
  const decimals = await ERC20_decimals(contract);
  return ERC20_transfer(account, contract, address, toCents(amount, decimals));
}

async function ERC721_name(contract: string): Promise<string> {
  const abi = new window.web3.eth.Contract(USBC_ERC721_ABI, contract);
  return abi.methods.name().call();
}

async function ERC721_symbol(contract: string): Promise<string> {
  const abi = new window.web3.eth.Contract(USBC_ERC721_ABI, contract);
  return abi.methods.symbol().call();
}

async function ERC721_tokenURI(
  contract: string,
  tokenId: string
): Promise<string> {
  const abi = new window.web3.eth.Contract(USBC_ERC721_ABI, contract);
  return abi.methods.tokenURI(tokenId).call();
}

async function ERC721_balanceOf(
  contract: string,
  address: string
): Promise<string> {
  const abi = new window.web3.eth.Contract(USBC_ERC721_ABI, contract);
  console.log(abi);
  return abi.methods.balanceOf(address).call();
}

async function ERC721_tokenOfOwnerByIndex(
  contract: string,
  address: string,
  index: string
): Promise<string> {
  const abi = new window.web3.eth.Contract(USBC_ERC721_ABI, contract);
  return abi.methods.getMyAssets(address, index).call();
}

async function ERC721_safeTransferFrom(
  account: string,
  contract: string,
  address: string,
  tokenId: string,
  data: string
): Promise<void> {
  const abi = new window.web3.eth.Contract(USBC_ERC721_ABI, contract);
  return new Promise((resolve, reject) => {
    abi.methods
      .safeTransferFrom(account, address, tokenId, data)
      .send({ from: account })
      .once("confirmation", (confNumber: any, receipt: any) => resolve())
      .once("error", reject);
  });
}

export async function getERC721Name(contract: string): Promise<string> {
  return ERC721_name(contract);
}

export async function getERC721Symbol(contract: string): Promise<string> {
  return ERC721_symbol(contract);
}

export async function getERC721TokenURI(
  contract: string,
  tokenId: string
): Promise<string> {
  return ERC721_tokenURI(contract, tokenId);
}

export async function getERC721Balance(
  account: string,
  contract: string
): Promise<string> {
  const balance = await ERC721_balanceOf(contract, account);
  return fromCents(balance, 0);
}

export async function getERC721TokenIdByIndex(
  account: string,
  contract: string,
  index: number
): Promise<string> {
  return ERC721_tokenOfOwnerByIndex(contract, account, String(index));
}

export async function transferERC721(
  account: string,
  contract: string,
  address: string,
  tokenId: string,
  data = "0x"
): Promise<void> {
  return ERC721_safeTransferFrom(account, contract, address, tokenId, data);
}

export async function supportsERC721(contract: string): Promise<boolean> {
  return ERC165_supportsInterface(contract, ERC721_INTERFACE_ID);
}

async function ERC165_supportsInterface(
  contract: string,
  interfaceId: string
): Promise<boolean> {
  const abi = new window.web3.eth.Contract(ERC165_ABI, contract);
  return abi.methods.supportsInterface(interfaceId).call();
}

async function Nftfy_getWrapper(
  contract: string,
  address: string
): Promise<string> {
  const abi = new window.web3.eth.Contract(NFTFY_ABI, contract);
  return abi.methods.getWrapper(address).call();
}

async function Wrapper_getShares(
  contract: string,
  tokenId: string
): Promise<string> {
  const abi = new window.web3.eth.Contract(WRAPPER_ABI, contract);
  return abi.methods.getShares(tokenId).call();
}

async function Shares_isRedeemable(contract: string): Promise<boolean> {
  const abi = new window.web3.eth.Contract(SHARES_ABI, contract);
  return abi.methods.isRedeemable().call();
}

async function Shares_getSharePrice(contract: string): Promise<string> {
  const abi = new window.web3.eth.Contract(SHARES_ABI, contract);
  return abi.methods.getSharePrice().call();
}

async function Shares_release(
  account: string,
  contract: string,
  amount: string
): Promise<void> {
  const abi = new window.web3.eth.Contract(SHARES_ABI, contract);
  return new Promise((resolve, reject) => {
    abi.methods
      .release()
      .send({ from: account, value: amount })
      .once("confirmation", (confNumber: any, receipt: any) => resolve())
      .once("error", reject);
  });
}

async function Shares_redeem(account: string, contract: string): Promise<void> {
  const abi = new window.web3.eth.Contract(SHARES_ABI, contract);
  return new Promise((resolve, reject) => {
    abi.methods
      .redeem()
      .send({ from: account })
      .once("confirmation", (confNumber: any, receipt: any) => resolve())
      .once("error", reject);
  });
}

export async function getWrapper(address: string): Promise<string> {
  const contract = await getNftfyContract();
  return Nftfy_getWrapper(contract, address);
}

export async function wrap(
  account: string,
  contract: string,
  tokenId: string,
  amount: string
): Promise<void> {
  const address = await getNftfyContract();
  let data = web3.utils.toHex(web3.utils.toWei(amount, "ether"));
  data = data.substr(0, 2) + data.substr(2).padStart(64, "0");
  await transferERC721(account, contract, address, tokenId, data);
}

export async function getShares(
  contract: string,
  tokenId: string
): Promise<string> {
  return Wrapper_getShares(contract, tokenId);
}

export async function isRedeemable(contract: string): Promise<boolean> {
  return Shares_isRedeemable(contract);
}

export async function getSharePrice(contract: string): Promise<string> {
  const price = await Shares_getSharePrice(contract);
  return web3.utils.fromWei(price, "ether");
}

export async function release(
  account: string,
  contract: string,
  amount: string
): Promise<void> {
  return Shares_release(account, contract, web3.utils.toWei(amount, "ether"));
}

export async function redeem(account: string, contract: string): Promise<void> {
  return Shares_redeem(account, contract);
}
