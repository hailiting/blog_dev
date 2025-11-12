/**
 * 密钥管理模块
 * 负责生成、存储、恢复客户端私钥片段
 */

import BN from 'bn.js';
import * as nacl from 'tweetnacl';
import {
  generateSalt,
  generateIV,
  deriveKey,
  aesEncrypt,
  aesDecrypt,
  base58Encode,
  base58Decode,
  generateRandomBigInt,
} from './crypto';
import {
  PrivateKeyFragment,
  EncryptedKeyFragment,
  KeyStorageOptions,
} from './types';

/**
 * MPC 密钥管理器
 */
export class MPCKeyManager {
  /**
   * 生成客户端私钥片段
   * @returns 私钥片段和对应的公钥
   */
  static generatePrivateKeyFragment(): PrivateKeyFragment {
    // 生成随机私钥片段（256位）
    const skUser = generateRandomBigInt(32);
    
    // 计算对应的公钥点 Pk_user = sk_user × G
    const skUserBytes = skUser.toArrayLike(Buffer, 'le', 32);
    const keyPair = nacl.sign.keyPair.fromSeed(skUserBytes);
    
    return {
      skUser,
      pkUser: keyPair.publicKey,
    };
  }

  /**
   * 保存私钥片段（明文方式）
   * @param skUser 客户端私钥片段
   * @returns Base58 编码的私钥
   */
  static savePlaintext(skUser: BN): string {
    const skBytes = skUser.toArrayLike(Buffer, 'be', 32);
    return base58Encode(skBytes);
  }

  /**
   * 从明文恢复私钥片段
   * @param encoded Base58 编码的私钥
   * @returns 私钥片段
   */
  static restoreFromPlaintext(encoded: string): BN {
    const skBytes = base58Decode(encoded);
    return new BN(skBytes);
  }

  /**
   * 保存私钥片段（加密方式）
   * @param skUser 客户端私钥片段
   * @param password 加密密码
   * @returns 加密后的数据
   */
  static saveEncrypted(skUser: BN, password: string): EncryptedKeyFragment {
    const salt = generateSalt();
    const iv = generateIV();
    const key = deriveKey(password, salt);
    
    // 将私钥转换为十六进制字符串
    const skHex = skUser.toString(16).padStart(64, '0');
    
    // AES 加密
    const encryptedHex = aesEncrypt(skHex, key, iv);
    
    // 组合：密文 + salt + iv，然后 Base58 编码
    const combined = encryptedHex + salt + iv;
    const encryptedData = base58Encode(Buffer.from(combined, 'hex'));
    
    return {
      encryptedData,
      salt,
      iv,
    };
  }

  /**
   * 从加密数据恢复私钥片段
   * @param encryptedData Base58 编码的加密数据
   * @param password 解密密码
   * @returns 私钥片段
   */
  static restoreFromEncrypted(encryptedData: string, password: string): BN {
    // Base58 解码
    const decoded = base58Decode(encryptedData).toString('hex');
    
    // 提取组成部分
    // 假设密文长度可变，salt 64字符，iv 32字符
    const ivLength = 32;
    const saltLength = 64;
    const iv = decoded.slice(-ivLength);
    const salt = decoded.slice(-(ivLength + saltLength), -ivLength);
    const ciphertext = decoded.slice(0, -(ivLength + saltLength));
    
    // 派生密钥
    const key = deriveKey(password, salt);
    
    // AES 解密
    const skHex = aesDecrypt(ciphertext, key, iv);
    
    // 转换为 BN
    return new BN(skHex, 16);
  }

  /**
   * 保存私钥片段（根据选项选择方式）
   * @param skUser 客户端私钥片段
   * @param options 存储选项
   * @returns 编码后的数据
   */
  static save(skUser: BN, options: KeyStorageOptions): string {
    if (options.type === 'plaintext') {
      return this.savePlaintext(skUser);
    } else if (options.type === 'encrypted') {
      if (!options.password) {
        throw new Error('加密存储需要提供密码');
      }
      const encrypted = this.saveEncrypted(skUser, options.password);
      return encrypted.encryptedData;
    } else {
      throw new Error('不支持的存储类型');
    }
  }

  /**
   * 恢复私钥片段（根据选项选择方式）
   * @param encoded 编码后的数据
   * @param options 存储选项
   * @returns 私钥片段
   */
  static restore(encoded: string, options: KeyStorageOptions): BN {
    if (options.type === 'plaintext') {
      return this.restoreFromPlaintext(encoded);
    } else if (options.type === 'encrypted') {
      if (!options.password) {
        throw new Error('解密需要提供密码');
      }
      return this.restoreFromEncrypted(encoded, options.password);
    } else {
      throw new Error('不支持的存储类型');
    }
  }

  /**
   * 验证密码是否正确
   * @param encryptedData 加密数据
   * @param password 密码
   * @returns 是否正确
   */
  static verifyPassword(encryptedData: string, password: string): boolean {
    try {
      this.restoreFromEncrypted(encryptedData, password);
      return true;
    } catch (error) {
      return false;
    }
  }
}

