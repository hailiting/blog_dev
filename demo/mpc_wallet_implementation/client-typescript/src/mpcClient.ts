/**
 * MPC 钱包客户端
 * 实现联合签名、与服务端通信等核心功能
 */

import axios, { AxiosInstance } from 'axios';
import BN from 'bn.js';
import * as nacl from 'tweetnacl';
import {
  MPCConfig,
  Transaction,
  Signature,
  WalletInfo,
  SignatureRequest,
  SignatureResponse,
} from './types';
import { MPCKeyManager } from './keyManager';
import {
  generateRandomBigInt,
  hashTransaction,
  generateAddress,
} from './crypto';

/**
 * MPC 钱包客户端类
 */
export class MPCWalletClient {
  private config: MPCConfig;
  private httpClient: AxiosInstance;
  private skUser?: BN; // 客户端私钥片段
  private pkUser?: Uint8Array; // 客户端公钥片段

  constructor(config: MPCConfig) {
    this.config = {
      timeout: 30000,
      curve: 'ed25519',
      ...config,
    };

    this.httpClient = axios.create({
      baseURL: this.config.serverUrl,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * 创建新钱包
   * @returns 钱包信息
   */
  async createWallet(): Promise<WalletInfo> {
    // 1. 生成客户端私钥片段
    const fragment = MPCKeyManager.generatePrivateKeyFragment();
    this.skUser = fragment.skUser;
    this.pkUser = fragment.pkUser;

    console.log('✅ 客户端私钥片段生成完成');
    console.log(`   sk_user = ${this.skUser.toString(10)}`);

    // 2. 向服务端请求生成服务端私钥片段和联合公钥
    const response = await this.httpClient.post('/api/wallet/create', {
      pkUser: Buffer.from(this.pkUser).toString('hex'),
    });

    const { pkNode, pkAgg, address } = response.data;

    console.log('✅ 服务端响应收到');
    console.log(`   pk_node = ${pkNode}`);
    console.log(`   pk_agg = ${pkAgg}`);
    console.log(`   地址 = ${address}`);

    return {
      address,
      publicKey: pkAgg,
      pkUser: Buffer.from(this.pkUser).toString('hex'),
      pkNode,
    };
  }

  /**
   * 导入已有钱包
   * @param skUser 客户端私钥片段
   */
  importWallet(skUser: BN): void {
    this.skUser = skUser;

    // 计算公钥片段
    const skUserBytes = skUser.toArrayLike(Buffer, 'le', 32);
    const keyPair = nacl.sign.keyPair.fromSeed(skUserBytes);
    this.pkUser = keyPair.publicKey;

    console.log('✅ 钱包导入成功');
  }

  /**
   * 获取钱包信息
   */
  async getWalletInfo(): Promise<WalletInfo> {
    if (!this.pkUser) {
      throw new Error('钱包未初始化');
    }

    const response = await this.httpClient.post('/api/wallet/info', {
      pkUser: Buffer.from(this.pkUser).toString('hex'),
    });

    return response.data;
  }

  /**
   * 签名交易（MPC 联合签名）
   * @param tx 交易数据
   * @returns 签名结果
   */
  async signTransaction(tx: Transaction): Promise<Signature> {
    if (!this.skUser || !this.pkUser) {
      throw new Error('钱包未初始化');
    }

    console.log('\n🔐 开始 MPC 签名流程...');
    console.log('📝 交易数据:', JSON.stringify(tx, null, 2));

    // 1. 计算交易哈希
    const txHash = hashTransaction(tx);
    const h = new BN(txHash, 16);
    console.log(`✅ 交易哈希: ${txHash}`);
    console.log(`   h (整数) = ${h.toString(10)}`);

    // 2. 生成客户端临时随机数
    const kUser = generateRandomBigInt(32);
    console.log(`\n✅ 客户端生成临时随机数:`);
    console.log(`   k_user = ${kUser.toString(10)}`);

    // 3. 计算客户端临时公钥点 R_user = k_user × G
    const kUserBytes = kUser.toArrayLike(Buffer, 'le', 32);
    const rUserKeyPair = nacl.sign.keyPair.fromSeed(kUserBytes);
    const rUser = rUserKeyPair.publicKey;
    console.log(`   R_user = ${Buffer.from(rUser).toString('hex')}`);

    // 4. 向服务端请求签名
    const signRequest: SignatureRequest = {
      txHash,
      rUser: Buffer.from(rUser).toString('hex'),
      address: tx.from,
    };

    console.log('\n📤 向服务端发送签名请求...');
    const response = await this.httpClient.post<SignatureResponse>(
      '/api/signature/request',
      signRequest
    );

    const { rNode, sNode, r } = response.data;
    console.log('✅ 收到服务端响应:');
    console.log(`   R_node = ${rNode}`);
    console.log(`   s_node = ${sNode}`);
    console.log(`   r = ${r}`);

    // 5. 客户端计算部分签名 s_user
    // s_user = (k_user × h + r × sk_user) mod n
    const rBN = new BN(r, 16);
    const sNodeBN = new BN(sNode, 16);
    
    // 获取群的阶 n（Ed25519 的阶）
    const n = new BN(
      '1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3ed',
      16
    );

    const sUser = kUser
      .mul(h)
      .add(rBN.mul(this.skUser))
      .umod(n);

    console.log(`\n✅ 客户端计算部分签名:`);
    console.log(`   s_user = ${sUser.toString(10)}`);

    // 6. 聚合最终签名 s = (s_user + s_node) mod n
    const s = sUser.add(sNodeBN).umod(n);
    console.log(`\n✅ 聚合最终签名:`);
    console.log(`   s = ${s.toString(10)}`);
    console.log(`   签名 (r, s) = (${rBN.toString(10)}, ${s.toString(10)})`);

    return {
      r: rBN.toString(16).padStart(64, '0'),
      s: s.toString(16).padStart(64, '0'),
    };
  }

  /**
   * 验证签名
   * @param tx 交易数据
   * @param signature 签名
   * @param publicKey 联合公钥
   * @returns 是否有效
   */
  static verifySignature(
    tx: Transaction,
    signature: Signature,
    publicKey: string
  ): boolean {
    try {
      const txHash = hashTransaction(tx);
      const message = Buffer.from(txHash, 'hex');
      const sig = Buffer.concat([
        Buffer.from(signature.r, 'hex'),
        Buffer.from(signature.s, 'hex'),
      ]);
      const pk = Buffer.from(publicKey, 'hex');

      return nacl.sign.detached.verify(message, sig, pk);
    } catch (error) {
      console.error('签名验证失败:', error);
      return false;
    }
  }

  /**
   * 导出私钥片段
   * @param password 加密密码（可选）
   * @returns 编码后的私钥
   */
  exportPrivateKey(password?: string): string {
    if (!this.skUser) {
      throw new Error('钱包未初始化');
    }

    if (password) {
      return MPCKeyManager.save(this.skUser, {
        type: 'encrypted',
        password,
      });
    } else {
      return MPCKeyManager.save(this.skUser, {
        type: 'plaintext',
      });
    }
  }
}

