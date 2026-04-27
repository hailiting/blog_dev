import { http, parseEther, parseGwei } from 'viem';
import { foundry } from 'viem/chains';
import { createPublicClient, createWalletClient } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
// shamirs-secret-sharing 秘密分片方案
import { split, combine } from 'shamirs-secret-sharing';
import dotenv from 'dotenv';

dotenv.config();

// 生成私钥分片
function generatePrivateKeyShares(privateKey, totalShares, threshold) {
  // 将私钥转换为Buffer
  const privateKeyBuffer = Buffer.from(privateKey.slice(2), 'hex');

  // 生成分片
  const shares = split(privateKeyBuffer, {
    shares: totalShares,
    threshold,
  });
  return shares;
}
// 从分片恢复私钥
function recoverPrivateKey(shares) {
  // 恢复私钥
  const recoveredBuffer = combine(shares);
  return `0x${recoveredBuffer.toString('hex')}`;
}

// 添加验证函数
function verifyShares(shares, originalPrivateKey, threshold) {
  console.log('\n验证所有分片：');
  const allRecoveredKey = recoverPrivateKey(shares);
  console.log('原始私钥:', originalPrivateKey);
  console.log('使用所有分片恢复的私钥:', allRecoveredKey);
  console.log('是否一致:', originalPrivateKey === allRecoveredKey);

  console.log('\n验证部分分片:');
  const partialShares = shares.slice(0, threshold);
  const partialRecoveredKey = recoverPrivateKey(partialShares);
  console.log('使用部分分片恢复的私钥:', partialRecoveredKey);
  console.log('是否一致:', originalPrivateKey === partialRecoveredKey);
  return originalPrivateKey === partialRecoveredKey;
}

// 模拟MPC签名过程
async function mpcSignTransaction(shares, threshold, transaction) {
  const recoveredPrivateKey = recoverPrivateKey(shares.slice(0, threshold));
  console.log('恢复的私钥：', recoveredPrivateKey);
  const account = privateKeyToAccount(recoveredPrivateKey);
  const walletClient = createWalletClient({
    account: account,
    chain: foundry,
    transport: http(process.env.RPC_URL),
  });
  const signedTx = await walletClient.signTransaction(transaction);
  return signedTx;
}
// 发起交易
async function sendTransactionWithMPC() {
  try {
    // 1. 从环境变量获取私钥
    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey) {
      throw new Error('请在 .env 文件中设置 PRIVATE_KEY');
    }
    console.log('原始私钥:', privateKey);

    // 2. 创建公共客户端
    const publicClient = createPublicClient({
      chain: foundry,
      transport: http(process.env.RPC_URL),
    });

    // 3. 从私钥创建账户
    const account = privateKeyToAccount(privateKey);
    const userAddress = account.address;
    console.log('账户地址:', userAddress);

    // 4. 生成私钥分片 (5个分片，需要3个分片才能恢复)
    const totalShares = 5;
    const threshold = 3;
    const shares = generatePrivateKeyShares(privateKey, totalShares, threshold);
    console.log(`生成了 ${totalShares} 个私钥分片，需要 ${threshold} 个分片才能恢复私钥`);

    // 验证分片恢复
    verifyShares(shares, privateKey, threshold);

    // 6. 检查网络状态
    const blockNumber = await publicClient.getBlockNumber();
    console.log('当前区块号:', blockNumber);

    // 7. 获取当前 gas 价格
    const gasPrice = await publicClient.getGasPrice();
    console.log('当前 gas 价格:', parseGwei(gasPrice.toString()));

    // 8. 查询余额
    const balance = await publicClient.getBalance({
      address: userAddress,
    });
    console.log('账户余额:', parseEther(balance.toString()));

    // 9. 查询 nonce
    const nonce = await publicClient.getTransactionCount({
      address: userAddress,
    });
    console.log('当前 Nonce:', nonce);

    // 10. 构建交易参数
    const txParams = {
      account: account,
      to: '0x01BF49D75f2b73A2FDEFa7664AEF22C86c5Be3df',
      value: parseEther('0.001'),
      chainId: foundry.id,
      type: 'eip1559',
      chain: foundry,
      maxFeePerGas: gasPrice * 2n,
      maxPriorityFeePerGas: parseGwei('1.5'),
      gas: 21000n,
      nonce: nonce,
    };

    // 12. 使用 MPC 签名交易
    console.log('开始 MPC 签名过程...');
    const signedTx = await mpcSignTransaction(shares, threshold, txParams);
    console.log('MPC 签名完成');

    // 13. 发送交易
    const txHash = await publicClient.sendRawTransaction({
      serializedTransaction: signedTx,
    });
    console.log('Transaction Hash:', txHash);

    // 14. 等待交易确认
    const receipt = await publicClient.waitForTransactionReceipt({
      hash: txHash,
    });
    console.log('交易状态:', receipt.status === 'success' ? '成功' : '失败');
    console.log('区块号:', receipt.blockNumber);
    console.log('Gas 使用量:', receipt.gasUsed.toString());

    return txHash;
  } catch (error) {
    console.error('错误:', error);
    if (error instanceof Error) {
      console.error('错误信息:', error.message);
    }
    if (error && typeof error === 'object' && 'details' in error) {
      console.error('错误详情:', error.details);
    }
    throw error;
  }
}

// 执行示例
sendTransactionWithMPC();
