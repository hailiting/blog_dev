import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Input,
  Layout,
  Radio,
  Select,
  Space,
  Statistic,
} from "antd";
// import { Pie } from 'ant-design-pro/lib/Charts';
import {
  isValidAddress,
  resolveName,
  getAccounts,
  getETHBalance,
  transferETH,
  getERC20Name,
  getERC20Symbol,
  getERC20Balance,
  transferERC20,
  getERC721Name,
  getERC721Symbol,
  getERC721TokenURI,
  getERC721Balance,
  getERC721TokenIdByIndex,
  transferERC721,
  supportsERC721,
  getWrapper,
  wrap,
  getShares,
  isRedeemable,
  getSharePrice,
  release,
  redeem,
} from "../services/web3";

const { Content, Footer, Header } = Layout;
const { Option } = Select;

function ETHPanel({ account }: { account: string }) {
  const [balance, setBalance] = useState("");
  useEffect(() => {
    updateBalance();
  }, [account]);
  async function updateBalance() {
    setBalance(await getETHBalance(account));
  }
  async function onTransfer(address: string, amount: string) {
    await transferETH(account, address, amount);
    await updateBalance();
  }
  return (
    <Card>
      <Space direction="vertical">
        <Space>
          <Avatar size="large">ETH</Avatar>
          Ether
        </Space>
        <Divider plain>Content</Divider>
        <Statistic title="Balance" value={balance} />
        <Divider plain>Actions</Divider>
        <ETHTransferForm onTransfer={onTransfer} />
      </Space>
    </Card>
  );
}

function ETHTransferForm({
  onTransfer,
}: {
  onTransfer: (address: string, amount: string) => Promise<void>;
}) {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  async function onSubmit(event: React.FormEvent) {
    if (event) event.preventDefault();
    setLoading(true);
    try {
      const xaddress = await resolveName(address);
      if (!isValidAddress(xaddress)) return;
      await onTransfer(xaddress, amount);
      setAddress("");
      setAmount("");
    } finally {
      setLoading(false);
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <Space>
        <Input
          addonAfter="ETH"
          placeholder="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Input
          addonBefore="@"
          placeholder="receiver"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Button loading={loading} htmlType="submit">
          Transfer
        </Button>
      </Space>
    </form>
  );
}

function ERC20Panel({
  account,
  contract,
}: {
  account: string;
  contract: string;
}) {
  const [name, setName] = useState("");
  const [_symbol, setSymbol] = useState("");
  const [balance, setBalance] = useState("");
  const [redeemable, setRedeemable] = useState(false);
  useEffect(() => {
    updateName();
  }, [contract]);
  useEffect(() => {
    updateSymbol();
  }, [contract]);
  useEffect(() => {
    updateBalance();
  }, [account, contract]);
  useEffect(() => {
    updateRedeemable();
  }, [contract]);
  async function updateName() {
    setName(await getERC20Name(contract));
  }
  async function updateSymbol() {
    setSymbol(await getERC20Symbol(contract));
  }
  async function updateBalance() {
    setBalance(await getERC20Balance(account, contract));
  }
  async function updateRedeemable() {
    setRedeemable(await isRedeemable(contract));
  }
  async function onTransfer(address: string, amount: string) {
    await transferERC20(account, contract, address, amount);
    await updateBalance();
  }
  async function onRedeem() {
    await redeem(account, contract);
    await updateBalance();
  }
  return (
    <Card>
      <Space direction="vertical">
        <Space>
          <Avatar size="large">{_symbol}</Avatar>
          {name}
        </Space>
        <Divider plain>Content</Divider>
        <Statistic title="Balance" value={balance} />
        <Divider>Actions</Divider>
        <ERC20TransferForm _symbol={_symbol} onTransfer={onTransfer} />
        {redeemable && Number(balance) > 0 ? (
          <ERC20RedeemForm onRedeem={onRedeem} />
        ) : null}
      </Space>
    </Card>
  );
}

function ERC20TransferForm({
  _symbol,
  onTransfer,
}: {
  _symbol: string;
  onTransfer: (address: string, amount: string) => Promise<void>;
}) {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  async function onSubmit(event: React.FormEvent) {
    if (event) event.preventDefault();
    setLoading(true);
    try {
      const xaddress = await resolveName(address);
      if (!isValidAddress(xaddress)) return;
      await onTransfer(xaddress, amount);
      setAddress("");
      setAmount("");
    } finally {
      setLoading(false);
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <Space>
        <Input
          addonAfter={_symbol}
          placeholder="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Input
          addonBefore="@"
          placeholder="receiver"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Button loading={loading} htmlType="submit">
          Transfer
        </Button>
      </Space>
    </form>
  );
}

function ERC20RedeemForm({ onRedeem }: { onRedeem: () => Promise<void> }) {
  const [loading, setLoading] = useState(false);
  async function onSubmit(event: React.FormEvent) {
    if (event) event.preventDefault();
    setLoading(true);
    try {
      await onRedeem();
    } finally {
      setLoading(false);
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <Space>
        <Button loading={loading} htmlType="submit">
          Redeem
        </Button>
      </Space>
    </form>
  );
}

function ERC721Panel({
  account,
  contract,
  onAddToken,
}: {
  account: string;
  contract: string;
  onAddToken: (contract: string) => Promise<void>;
}) {
  const [name, setName] = useState("");
  const [_symbol, setSymbol] = useState("");
  const [balance, setBalance] = useState("");
  const [tokens, setTokens] = useState<{
    [token: string]: { tokenURI: string };
  }>({});
  const [wrapper, setWrapper] = useState("");
  const [wokens, setWokens] = useState<{
    [token: string]: {
      tokenURI: string;
      shares: string;
      balance: string;
      price: string;
    };
  }>({});
  const [tokenId, setTokenId] = useState("");
  useEffect(() => {
    updateName();
  }, [contract]);
  useEffect(() => {
    updateSymbol();
  }, [contract]);
  useEffect(() => {
    updateBalance();
  }, [account, contract]);
  useEffect(() => {
    updateWrapper();
  }, [contract]);
  async function updateName() {
    setName(await getERC721Name(contract));
  }
  async function updateSymbol() {
    setSymbol(await getERC721Symbol(contract));
  }
  async function updateBalance() {
    const balance = await getERC721Balance(account, contract);
    // const tokens: { [token: string]: { tokenURI: string } } = {};
    // for (let i = 0; i < Number(balance); i++) {
    //   const tokenId = await getERC721TokenIdByIndex(account, contract, i);
    //   const tokenURI = await getERC721TokenURI(contract, tokenId);
    //   tokens[tokenId] = { tokenURI };
    // }
    console.log("balance: " + balance);
    setBalance(balance);
    // setTokens(tokens);
  }
  async function updateWrapper() {
    const wrapper = await getWrapper(contract);
    const wokens: {
      [token: string]: {
        tokenURI: string;
        shares: string;
        balance: string;
        price: string;
      };
    } = {};
    if (wrapper !== "0x0000000000000000000000000000000000000000") {
      const balance = await getERC721Balance(account, wrapper);
      for (let i = 0; i < Number(balance); i++) {
        const tokenId = await getERC721TokenIdByIndex(account, wrapper, i);
        const tokenURI = await getERC721TokenURI(wrapper, tokenId);
        const shares = await getShares(wrapper, tokenId);
        const balance = await getERC20Balance(account, shares);
        const price = await getSharePrice(shares);
        wokens[tokenId] = { tokenURI, shares, balance, price };
        await onAddToken(shares);
      }
    }
    setWrapper(wrapper);
    setWokens(wokens);
  }
  async function onTransfer(address: string) {
    if (tokenId in tokens)
      await transferERC721(account, contract, address, tokenId);
    if (tokenId in wokens)
      await transferERC721(account, wrapper, address, tokenId);
    await updateBalance();
    await updateWrapper();
  }
  async function onWrap(amount: string) {
    await wrap(account, contract, tokenId, amount);
    await updateBalance();
    await updateWrapper();
  }
  async function onUnwrap(amount: string) {
    const shares = await getShares(wrapper, tokenId);
    await release(account, shares, amount);
    await updateBalance();
    await updateWrapper();
  }
  return (
    <Card>
      <Space direction="vertical">
        <Space>
          <Avatar size="large">{_symbol}</Avatar>
          {name}
        </Space>
        <Divider plain>Content</Divider>
        <Statistic title="Balance" value={balance} />
        <Radio.Group
          onChange={(e) => setTokenId(e.target.value)}
          value={tokenId}
        >
          <Space direction="vertical">
            {Object.keys(tokens).map((token, i) => (
              <Radio value={token}>Token #{token}</Radio>
            ))}
            {Object.keys(wokens).map((woken, i) => (
              <Radio value={woken}>
                Securitized Token #{woken} [{wokens[woken].price} ETH/share]
              </Radio>
            ))}
          </Space>
        </Radio.Group>
        <Divider>Actions</Divider>
        {tokenId !== "" ? <ERC721TransferForm onTransfer={onTransfer} /> : null}
        {tokens[tokenId] ? <ERC721WrapForm onWrap={onWrap} /> : null}
        {wokens[tokenId] ? <ERC721UnwrapForm onUnwrap={onUnwrap} /> : null}
      </Space>
    </Card>
  );
}

function ERC721TransferForm({
  onTransfer,
}: {
  onTransfer: (address: string) => Promise<void>;
}) {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  async function onSubmit(event: React.FormEvent) {
    if (event) event.preventDefault();
    setLoading(true);
    try {
      const xaddress = await resolveName(address);
      if (!isValidAddress(xaddress)) return;
      await onTransfer(xaddress);
      setAddress("");
    } finally {
      setLoading(false);
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <Space>
        <Input
          addonBefore="@"
          placeholder="receiver"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Button loading={loading} htmlType="submit">
          Transfer
        </Button>
      </Space>
    </form>
  );
}

function ERC721WrapForm({
  onWrap,
}: {
  onWrap: (amount: string) => Promise<void>;
}) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  async function onSubmit(event: React.FormEvent) {
    if (event) event.preventDefault();
    setLoading(true);
    try {
      await onWrap(amount);
      setAmount("");
    } finally {
      setLoading(false);
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <Space>
        <Input
          addonAfter="ETH"
          placeholder="exit price"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button loading={loading} htmlType="submit">
          Securitize
        </Button>
      </Space>
    </form>
  );
}

function ERC721UnwrapForm({
  onUnwrap,
}: {
  onUnwrap: (amount: string) => Promise<void>;
}) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  async function onSubmit(event: React.FormEvent) {
    if (event) event.preventDefault();
    setLoading(true);
    try {
      await onUnwrap(amount);
      setAmount("");
    } finally {
      setLoading(false);
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <Space>
        <Input
          addonAfter="ETH"
          placeholder="premium"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button loading={loading} htmlType="submit">
          Release
        </Button>
      </Space>
    </form>
  );
}

function AddTokenForm({
  onAddToken,
}: {
  onAddToken: (contract: string) => Promise<void>;
}) {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  async function onSubmit(event: React.FormEvent) {
    if (event) event.preventDefault();
    setLoading(true);
    try {
      const xaddress = await resolveName(address);
      if (!isValidAddress(xaddress)) return;
      await onAddToken(xaddress);
      setAddress("");
    } finally {
      setLoading(false);
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <Space>
        <Input
          addonBefore="@"
          placeholder="contract address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Button type="primary" loading={loading} htmlType="submit">
          Add Token
        </Button>
      </Space>
    </form>
  );
}

function Wallet({ account }: { account: string }) {
  const [contracts, setContracts] = useState<{
    [address: string]: "ERC20" | "ERC721";
  }>({});
  async function onAddToken(contract: string) {
    const address = contract.toLowerCase();
    if (contracts[address]) return;
    let isNFT = false;
    try {
      isNFT = await supportsERC721(contract);
    } catch (e) {}
    setContracts({ ...contracts, [address]: isNFT ? "ERC721" : "ERC20" });
  }
  return (
    <Space direction="vertical">
      <AddTokenForm onAddToken={onAddToken} />
      <ETHPanel account={account} />
      {Object.keys(contracts).length > 0
        ? Object.keys(contracts).map((contract, i) => (
            <React.Fragment key={i}>
              {contracts[contract] === "ERC721" ? (
                <ERC721Panel
                  account={account}
                  contract={contract}
                  onAddToken={onAddToken}
                />
              ) : null}
              {contracts[contract] === "ERC20" ? (
                <ERC20Panel account={account} contract={contract} />
              ) : null}
            </React.Fragment>
          ))
        : ""}
    </Space>
  );
}

function AccountPanel({ account }: { account: string }) {
  return (
    <div className="AccountPanel">
      <Wallet account={account} />
    </div>
  );
}

function App() {
  const [accounts, setAccounts] = useState<string[] | null>(null);
  const [account, setAccount] = useState("");
  useEffect(() => {
    (async () => setAccounts(await getAccounts()))();
  }, []);
  useEffect(() => {
    if (accounts === null) return;
    if (accounts.length === 0) return;
    setAccount(accounts[0]);
  }, [accounts]);
  return (
    <Layout>
      <Header className="header" style={{ color: "white" }}>
        <Space>
          <img src="https://nftfy.tk/assets/images/logo.svg" />
          <strong>Wallet:</strong>
          {accounts ? (
            <Select value={account} onChange={(value) => setAccount(value)}>
              {account === "" ? (
                <Option key={0} value={""}>
                  No account selected
                </Option>
              ) : null}
              {accounts.map((account, i) => (
                <Option key={i + 1} value={account}>
                  {account}
                </Option>
              ))}
            </Select>
          ) : (
            "No accounts available"
          )}
        </Space>
      </Header>
      <Content>{account ? <AccountPanel account={account} /> : null}</Content>
      <Footer style={{ textAlign: "center" }}>
        Nftfy ©2020 Created by BH Hackers
      </Footer>
    </Layout>
  );
}

export default App;
