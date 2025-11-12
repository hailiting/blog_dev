/**
 * 完整的 MPC 钱包工作流示例
 * 
 * 演示从创建钱包到签名交易的完整流程
 */

import { MPCWalletClient, MPCKeyManager } from '../client-typescript/src';
import { Transaction } from '../client-typescript/src/types';

// 模拟用户界面交互
class UserInterface {
  static promptPassword(message: string): string {
    // 实际应用中应该使用真实的 UI 输入
    console.log(`🔑 ${message}`);
    return 'MySecurePassword123!';
  }

  static confirmAction(message: string): boolean {
    console.log(`❓ ${message}`);
    return true;
  }

  static displayInfo(title: string, data: any): void {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📋 ${title}`);
    console.log('='.repeat(60));
    console.log(JSON.stringify(data, null, 2));
    console.log('='.repeat(60));
  }
}

// 模拟本地存储
class LocalStorage {
  private storage: Map<string, string> = new Map();

  set(key: string, value: string): void {
    this.storage.set(key, value);
    console.log(`💾 保存到本地存储: ${key}`);
  }

  get(key: string): string | null {
    const value = this.storage.get(key) || null;
    if (value) {
      console.log(`📂 从本地存储读取: ${key}`);
    }
    return value;
  }

  has(key: string): boolean {
    return this.storage.has(key);
  }

  remove(key: string): void {
    this.storage.delete(key);
    console.log(`🗑️  从本地存储删除: ${key}`);
  }

  clear(): void {
    this.storage.clear();
    console.log(`🗑️  清空本地存储`);
  }
}

// 全局存储实例
const localStorage = new LocalStorage();

/**
 * 场景 1: 创建新钱包
 */
async function scenario1_CreateWallet(): Promise<void> {
  console.log('\n' + '🎯 场景 1: 创建新钱包'.padEnd(60, '='));

  // 1. 创建 MPC 客户端
  const client = new MPCWalletClient({
    serverUrl: 'http://localhost:8080',
    timeout: 30000,
  });

  // 2. 创建钱包
  console.log('\n步骤 1: 创建钱包...');
  const walletInfo = await client.createWallet();

  UserInterface.displayInfo('钱包创建成功！', {
    address: walletInfo.address,
    publicKey: walletInfo.publicKey.substring(0, 32) + '...',
  });

  // 3. 导出私钥（让用户选择存储方式）
  console.log('\n步骤 2: 选择私钥存储方式...');
  
  const useEncryption = UserInterface.confirmAction(
    '是否使用密码加密私钥？(推荐)'
  );

  let privateKeyBackup: string;

  if (useEncryption) {
    const password = UserInterface.promptPassword('请设置加密密码:');
    privateKeyBackup = client.exportPrivateKey(password);
    console.log('✅ 私钥已加密');
  } else {
    privateKeyBackup = client.exportPrivateKey();
    console.log('⚠️  私钥未加密（不推荐）');
  }

  // 4. 保存到本地
  localStorage.set('wallet_address', walletInfo.address);
  localStorage.set('wallet_publicKey', walletInfo.publicKey);
  localStorage.set('wallet_privateKey', privateKeyBackup);
  localStorage.set('wallet_encrypted', useEncryption ? 'yes' : 'no');

  UserInterface.displayInfo('备份信息', {
    备份数据: privateKeyBackup.substring(0, 50) + '...',
    提示: '请妥善保管此备份，不要分享给任何人！',
  });

  console.log('\n✅ 钱包创建完成！');
}

/**
 * 场景 2: 恢复钱包
 */
async function scenario2_RestoreWallet(): Promise<MPCWalletClient> {
  console.log('\n' + '🎯 场景 2: 恢复钱包'.padEnd(60, '='));

  // 1. 检查本地存储
  if (!localStorage.has('wallet_privateKey')) {
    throw new Error('未找到钱包备份！');
  }

  const privateKeyBackup = localStorage.get('wallet_privateKey')!;
  const isEncrypted = localStorage.get('wallet_encrypted') === 'yes';

  // 2. 恢复私钥
  console.log('\n步骤 1: 恢复私钥片段...');
  
  let skUser;

  if (isEncrypted) {
    const password = UserInterface.promptPassword('请输入解密密码:');
    
    try {
      skUser = MPCKeyManager.restore(privateKeyBackup, {
        type: 'encrypted',
        password,
      });
      console.log('✅ 私钥解密成功');
    } catch (error) {
      console.error('❌ 密码错误或数据损坏');
      throw error;
    }
  } else {
    skUser = MPCKeyManager.restore(privateKeyBackup, {
      type: 'plaintext',
    });
    console.log('✅ 私钥恢复成功');
  }

  // 3. 导入钱包
  const client = new MPCWalletClient({
    serverUrl: 'http://localhost:8080',
  });

  client.importWallet(skUser);
  console.log('✅ 钱包导入成功');

  // 4. 验证钱包信息
  const walletInfo = await client.getWalletInfo();
  const storedAddress = localStorage.get('wallet_address')!;

  if (walletInfo.address !== storedAddress) {
    throw new Error('钱包地址不匹配！');
  }

  UserInterface.displayInfo('钱包已恢复', {
    address: walletInfo.address,
  });

  return client;
}

/**
 * 场景 3: 签名交易
 */
async function scenario3_SignTransaction(
  client: MPCWalletClient
): Promise<void> {
  console.log('\n' + '🎯 场景 3: 签名交易'.padEnd(60, '='));

  const walletAddress = localStorage.get('wallet_address')!;

  // 1. 构造交易
  console.log('\n步骤 1: 构造交易数据...');
  
  const transaction: Transaction = {
    from: walletAddress,
    to: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2',
    amount: '0.5',
    nonce: Date.now(),
    gas: 21000,
    gasPrice: '20',
    chainId: 1,
  };

  UserInterface.displayInfo('交易详情', transaction);

  // 2. 确认交易
  const confirmed = UserInterface.confirmAction('确认发送此交易？');
  
  if (!confirmed) {
    console.log('❌ 交易已取消');
    return;
  }

  // 3. 签名交易
  console.log('\n步骤 2: 执行 MPC 签名...');
  
  try {
    const signature = await client.signTransaction(transaction);
    
    UserInterface.displayInfo('签名完成', {
      r: signature.r.substring(0, 32) + '...',
      s: signature.s.substring(0, 32) + '...',
    });

    // 4. 验证签名
    console.log('\n步骤 3: 验证签名有效性...');
    const publicKey = localStorage.get('wallet_publicKey')!;
    const isValid = MPCWalletClient.verifySignature(
      transaction,
      signature,
      publicKey
    );

    if (isValid) {
      console.log('✅ 签名验证通过');
    } else {
      console.log('❌ 签名验证失败');
      return;
    }

    // 5. 广播交易（模拟）
    console.log('\n步骤 4: 广播交易到区块链...');
    console.log('📡 正在广播...');
    
    // 实际应用中应该调用区块链 RPC
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('✅ 交易已广播');
    
    UserInterface.displayInfo('交易结果', {
      状态: '成功',
      交易哈希: '0x' + signature.r.substring(0, 64),
      区块链浏览器: `https://etherscan.io/tx/0x${signature.r}`,
    });

  } catch (error) {
    console.error('❌ 签名失败:', error);
    throw error;
  }
}

/**
 * 场景 4: 更改密码
 */
async function scenario4_ChangePassword(): Promise<void> {
  console.log('\n' + '🎯 场景 4: 更改密码'.padEnd(60, '='));

  const privateKeyBackup = localStorage.get('wallet_privateKey')!;
  const isEncrypted = localStorage.get('wallet_encrypted') === 'yes';

  if (!isEncrypted) {
    console.log('⚠️  当前私钥未加密，请先创建加密备份');
    return;
  }

  // 1. 验证旧密码
  console.log('\n步骤 1: 验证当前密码...');
  const oldPassword = UserInterface.promptPassword('请输入当前密码:');

  let skUser;
  try {
    skUser = MPCKeyManager.restore(privateKeyBackup, {
      type: 'encrypted',
      password: oldPassword,
    });
    console.log('✅ 密码验证成功');
  } catch (error) {
    console.error('❌ 密码错误');
    throw error;
  }

  // 2. 设置新密码
  console.log('\n步骤 2: 设置新密码...');
  const newPassword = UserInterface.promptPassword('请输入新密码:');
  const confirmPassword = UserInterface.promptPassword('请再次输入新密码:');

  if (newPassword !== confirmPassword) {
    throw new Error('两次输入的密码不一致');
  }

  // 3. 重新加密
  console.log('\n步骤 3: 使用新密码加密...');
  const newBackup = MPCKeyManager.save(skUser, {
    type: 'encrypted',
    password: newPassword,
  });

  // 4. 更新存储
  localStorage.set('wallet_privateKey', newBackup);
  console.log('✅ 密码已更新');

  UserInterface.displayInfo('新的备份数据', {
    备份: newBackup.substring(0, 50) + '...',
    提示: '请使用新密码访问钱包',
  });
}

/**
 * 场景 5: 导出明文私钥（危险操作）
 */
async function scenario5_ExportPlaintext(): Promise<void> {
  console.log('\n' + '🎯 场景 5: 导出明文私钥（危险）'.padEnd(60, '='));

  // 警告用户
  const confirmed = UserInterface.confirmAction(
    '⚠️  导出明文私钥非常危险！确定要继续吗？'
  );

  if (!confirmed) {
    console.log('❌ 操作已取消');
    return;
  }

  const privateKeyBackup = localStorage.get('wallet_privateKey')!;
  const isEncrypted = localStorage.get('wallet_encrypted') === 'yes';

  // 解密私钥
  let skUser;
  if (isEncrypted) {
    const password = UserInterface.promptPassword('请输入密码:');
    skUser = MPCKeyManager.restore(privateKeyBackup, {
      type: 'encrypted',
      password,
    });
  } else {
    skUser = MPCKeyManager.restore(privateKeyBackup, {
      type: 'plaintext',
    });
  }

  // 导出明文
  const plaintext = MPCKeyManager.save(skUser, {
    type: 'plaintext',
  });

  UserInterface.displayInfo('⚠️  明文私钥片段', {
    私钥: plaintext,
    警告: '请妥善保管，不要分享给任何人！',
    十进制: skUser.toString(10),
    十六进制: skUser.toString(16),
  });
}

/**
 * 主函数：运行所有场景
 */
async function main() {
  console.log('\n' + '🚀 MPC 钱包完整工作流演示'.padEnd(60, '=') + '\n');

  try {
    // 场景 1: 创建新钱包
    await scenario1_CreateWallet();

    // 等待 1 秒
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 场景 2: 恢复钱包
    const client = await scenario2_RestoreWallet();

    // 等待 1 秒
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 场景 3: 签名交易
    await scenario3_SignTransaction(client);

    // 等待 1 秒
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 场景 4: 更改密码
    await scenario4_ChangePassword();

    // 等待 1 秒
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 场景 5: 导出明文私钥
    await scenario5_ExportPlaintext();

    console.log('\n' + '✅ 所有场景演示完成！'.padEnd(60, '=') + '\n');
  } catch (error) {
    console.error('\n❌ 发生错误:', error);
    throw error;
  }
}

// 运行示例
if (require.main === module) {
  main().catch(console.error);
}

export { main };

