/**
 * 加密工具模块
 * 实现 AES 加密、Base58 编码等功能
 */

import CryptoJS from 'crypto-js';
import bs58 from 'bs58';
import { createHash, randomBytes } from 'crypto';
import BN from 'bn.js';

/**
 * 生成随机盐值
 */
export function generateSalt(length: number = 32): string {
  return randomBytes(length).toString('hex');
}

/**
 * 生成随机 IV
 */
export function generateIV(length: number = 16): string {
  return randomBytes(length).toString('hex');
}

/**
 * 从密码派生密钥
 * @param password 用户密码
 * @param salt 盐值
 * @returns 派生的密钥
 */
export function deriveKey(password: string, salt: string): string {
  return CryptoJS.PBKDF2(password, salt, {
    keySize: 256 / 32,
    iterations: 10000,
  }).toString();
}

/**
 * AES 加密
 * @param plaintext 明文
 * @param key 密钥
 * @param iv 初始化向量
 * @returns 密文
 */
export function aesEncrypt(plaintext: string, key: string, iv: string): string {
  const encrypted = CryptoJS.AES.encrypt(plaintext, CryptoJS.enc.Hex.parse(key), {
    iv: CryptoJS.enc.Hex.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
}

/**
 * AES 解密
 * @param ciphertext 密文
 * @param key 密钥
 * @param iv 初始化向量
 * @returns 明文
 */
export function aesDecrypt(ciphertext: string, key: string, iv: string): string {
  const decrypted = CryptoJS.AES.decrypt(
    { ciphertext: CryptoJS.enc.Hex.parse(ciphertext) } as any,
    CryptoJS.enc.Hex.parse(key),
    {
      iv: CryptoJS.enc.Hex.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  return decrypted.toString(CryptoJS.enc.Utf8);
}

/**
 * Base58 编码
 */
export function base58Encode(data: Buffer | Uint8Array | string): string {
  if (typeof data === 'string') {
    data = Buffer.from(data, 'hex');
  }
  return bs58.encode(Buffer.from(data));
}

/**
 * Base58 解码
 */
export function base58Decode(encoded: string): Buffer {
  return Buffer.from(bs58.decode(encoded));
}

/**
 * SHA-256 哈希
 */
export function sha256(data: string | Buffer): Buffer {
  return createHash('sha256').update(data).digest();
}

/**
 * RIPEMD-160 哈希
 */
export function ripemd160(data: string | Buffer): Buffer {
  return createHash('ripemd160').update(data).digest();
}

/**
 * 生成钱包地址
 * @param publicKey 联合公钥
 * @returns 钱包地址
 */
export function generateAddress(publicKey: Uint8Array): string {
  // SHA-256 + RIPEMD-160
  const sha256Hash = sha256(Buffer.from(publicKey));
  const ripemd160Hash = ripemd160(sha256Hash);
  
  // 添加版本字节（0x00 表示主网）
  const versionedHash = Buffer.concat([Buffer.from([0x00]), ripemd160Hash]);
  
  // 双重 SHA-256 生成校验和
  const checksum = sha256(sha256(versionedHash)).slice(0, 4);
  
  // Base58Check 编码
  const addressBytes = Buffer.concat([versionedHash, checksum]);
  return base58Encode(addressBytes);
}

/**
 * 生成安全的随机大整数
 * @param bytes 字节数（默认 32）
 * @returns BN 大整数
 */
export function generateRandomBigInt(bytes: number = 32): BN {
  const randomBuffer = randomBytes(bytes);
  return new BN(randomBuffer);
}

/**
 * 计算交易哈希
 */
export function hashTransaction(tx: any): string {
  const txString = JSON.stringify(tx);
  return sha256(txString).toString('hex');
}

