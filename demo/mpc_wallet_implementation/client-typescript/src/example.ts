/**
 * MPC 钱包使用示例
 */

import { MPCWalletClient } from './mpcClient';
import { MPCKeyManager } from './keyManager';
import { Transaction } from './types';

async function main() {
  console.log('='.repeat(60));
  console.log('MPC 钱包客户端示例');
  console.log('='.repeat(60));

  // 1. 创建 MPC 客户端实例
  const client = new MPCWalletClient({
    serverUrl: 'http://localhost:8080',
    timeout: 30000,
  });

  console.log('\n【步骤 1】创建新钱包...\n');
  
  // 2. 创建钱包
  const walletInfo = await client.createWallet();
  console.log('\n✅ 钱包创建成功！');
  console.log('钱包信息:');
  console.log(JSON.stringify(walletInfo, null, 2));

  // 3. 导出私钥（两种方式）
  console.log('\n【步骤 2】导出私钥片段...\n');
  
  // 方式 A: 明文导出
  const plaintextKey = client.exportPrivateKey();
  console.log('✅ 明文导出:', plaintextKey);

  // 方式 B: 加密导出
  const password = 'MySecurePassword123!';
  const encryptedKey = client.exportPrivateKey(password);
  console.log('✅ 加密导出:', encryptedKey);

  // 4. 恢复钱包（从加密私钥）
  console.log('\n【步骤 3】从加密私钥恢复钱包...\n');
  const restoredSkUser = MPCKeyManager.restore(encryptedKey, {
    type: 'encrypted',
    password,
  });
  console.log('✅ 私钥恢复成功');

  const client2 = new MPCWalletClient({
    serverUrl: 'http://localhost:8080',
  });
  client2.importWallet(restoredSkUser);

  // 5. 构造交易
  console.log('\n【步骤 4】签名交易...\n');
  const transaction: Transaction = {
    from: walletInfo.address,
    to: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2',
    amount: '0.5',
    nonce: 1,
    gas: 21000,
    gasPrice: '20',
    chainId: 1,
  };

  // 6. 签名交易
  const signature = await client.signTransaction(transaction);
  console.log('\n✅ 签名完成！');
  console.log('签名结果:');
  console.log(`  r: ${signature.r}`);
  console.log(`  s: ${signature.s}`);

  // 7. 验证签名
  console.log('\n【步骤 5】验证签名...\n');
  const isValid = MPCWalletClient.verifySignature(
    transaction,
    signature,
    walletInfo.publicKey
  );
  console.log(`签名验证结果: ${isValid ? '✅ 有效' : '❌ 无效'}`);

  console.log('\n' + '='.repeat(60));
  console.log('示例运行完成！');
  console.log('='.repeat(60));
}

// 运行示例
if (require.main === module) {
  main().catch(console.error);
}

export { main };

