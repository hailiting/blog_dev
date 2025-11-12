/**
 * MPC 钱包类型定义
 */

import BN from 'bn.js';

/**
 * 椭圆曲线点（公钥点）
 */
export interface Point {
  x: Uint8Array;
  y: Uint8Array;
}

/**
 * 客户端私钥片段
 */
export interface PrivateKeyFragment {
  skUser: BN; // 客户端私钥片段
  pkUser: Uint8Array; // 对应的公钥点
}

/**
 * 加密后的私钥片段
 */
export interface EncryptedKeyFragment {
  encryptedData: string; // Base58 编码的加密数据
  salt: string; // 盐值
  iv: string; // 初始化向量
}

/**
 * 钱包信息
 */
export interface WalletInfo {
  address: string; // 钱包地址
  publicKey: string; // 联合公钥（十六进制）
  pkUser: string; // 客户端公钥片段
  pkNode: string; // 服务端公钥片段
}

/**
 * 交易数据
 */
export interface Transaction {
  from: string;
  to: string;
  amount: string;
  nonce: number;
  gas: number;
  gasPrice: string;
  chainId: number;
  data?: string;
}

/**
 * 签名请求
 */
export interface SignatureRequest {
  txHash: string; // 交易哈希
  rUser: string; // 客户端临时公钥点（十六进制）
  address: string; // 钱包地址
}

/**
 * 签名响应
 */
export interface SignatureResponse {
  rNode: string; // 服务端临时公钥点
  sNode: string; // 服务端部分签名
  r: string; // 最终 r 值
}

/**
 * 完整签名
 */
export interface Signature {
  r: string; // r 值（十六进制）
  s: string; // s 值（十六进制）
  v?: number; // 恢复 ID（用于以太坊）
}

/**
 * MPC 配置
 */
export interface MPCConfig {
  serverUrl: string; // 服务器 URL
  timeout?: number; // 请求超时时间（毫秒）
  curve?: 'ed25519' | 'secp256k1'; // 使用的椭圆曲线
}

/**
 * 密钥存储选项
 */
export interface KeyStorageOptions {
  type: 'plaintext' | 'encrypted'; // 存储类型
  password?: string; // 加密密码（encrypted 类型必需）
}

