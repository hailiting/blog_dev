import { FC, useMemo, useState } from 'react';
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';
import './App.css';

const SignMessage: FC = () => {
  const { publicKey, signMessage } = useWallet();
  const [signature, setSignature] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignMessage = async () => {
    if (!publicKey) {
      alert('请先连接钱包！');
      return;
    }

    if (!signMessage) {
      alert('当前钱包不支持消息签名！');
      return;
    }

    try {
      setIsLoading(true);
      // 获取当前时间
      const currentTime = new Date().toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      
      const messageToSign = `签名时间: ${currentTime}`;
      setMessage(messageToSign);

      // 将消息转换为 Uint8Array
      const encodedMessage = new TextEncoder().encode(messageToSign);
      
      // 签名
      const signatureBytes = await signMessage(encodedMessage);
      
      // 转换为 base58 字符串
      const signatureBase58 = btoa(String.fromCharCode(...signatureBytes));
      setSignature(signatureBase58);
      
      console.log('签名成功！');
      console.log('消息:', messageToSign);
      console.log('签名:', signatureBase58);
      console.log('公钥:', publicKey.toBase58());
    } catch (error) {
      console.error('签名失败:', error);
      alert('签名失败: ' + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="sign-container">
      <div className="card">
        <h1>Solana 消息签名演示</h1>
        <p className="description">
          连接你的 Solana 钱包，然后点击按钮对当前时间进行签名
        </p>

        <div className="wallet-section">
          <WalletMultiButton />
        </div>

        {publicKey && (
          <div className="wallet-info">
            <p className="wallet-address">
              <strong>钱包地址:</strong>
              <br />
              <code>{publicKey.toBase58()}</code>
            </p>
          </div>
        )}

        <button 
          className="sign-button"
          onClick={handleSignMessage}
          disabled={!publicKey || isLoading}
        >
          {isLoading ? '签名中...' : '签名当前时间'}
        </button>

        {message && (
          <div className="result-section">
            <div className="result-item">
              <h3>签名消息:</h3>
              <div className="result-content">
                {message}
              </div>
            </div>
          </div>
        )}

        {signature && (
          <div className="result-section">
            <div className="result-item">
              <h3>签名结果:</h3>
              <div className="result-content signature">
                {signature}
              </div>
            </div>
            <p className="success-message">✅ 签名成功！</p>
          </div>
        )}
      </div>
    </div>
  );
};

const App: FC = () => {
  // 使用 devnet 网络
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // 初始化钱包适配器
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <SignMessage />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;

