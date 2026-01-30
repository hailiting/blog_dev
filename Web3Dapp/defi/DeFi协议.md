# DeFi 协议

- DeFi 协议的工作原理和核心概念
  - 去中心化交易
  - 流动性挖矿
  - 闪电贷
- 交易所流动性挖矿

## Farm

**Farm 是一种流动性挖矿协议**，它主要目的是吸引用户和流动性提供者，以提供更好的交易和资产管理服务。Farm 协议通过向用户和流动性提供者提供 FARM 代币的奖励，以鼓励他们质押资产并提供流动性。用户可以将资产质押到 Farm 协议中，并获得 FARM 代币的奖励，以补偿他们提供流动性的成本

## Compound

**Compound 是一种借贷协议**，它允许用户将资产存入协议中，并获得利息，也可以从协议中借入资产。Compound 协议通过自动化借贷市场，为用户提供更高效、低成本和去信任的借贷服务。用户可以将资产存入 Compound 协议中，以赚取利息，也可以从协议中借入资产，以进行投资和交易

# Pool

**Pool 是一种流动池协议**，它允许用户将不同的代币存入同一个流动池中，并交换这些代币。Pool 协议通过自动化市场制造商和流动性提供者，为用户提供更加有效、低成本和去信任的交易服务。用户可以将不同的代币存入 Pool 协议中，并交换这些代币，以获得更好的流动性和价格

- Factory: 0xca143ce32fe78f1f7019d7d551a6402fc5350c73
  - init code hash: 0x00fb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5
- Router: 0x10ed43c718714eb63d5aa57b78b54704e256024e

# Defi 合约

## 涉及的一些智能合约

部署合约的先后顺序：主合约-> 代理合约-> 路由合约 -> MasterChef 合约 -> Vault 合约

- 1. **主合约** Master Contract
  - 整个应用的核心
  - 负责管理其他所有的合约，包括代理合约，路由合约，MasterChef 合约和 Vault 合约
  - 这个合约会首先被部署
  - 主合约的参数包括**管理员地址**，用于管理合约的升级和撤销操作
- 2. **代理合约** Proxy Contract
  - 用于升级或替换其他合约
  - 代理合约通常会在主合约之后部署，并且被主合约管理
  - 代理合约的参数通常包括被**代理合约地址**
- 3. **路由合约** Router Contract
  - 用于在不同合约之间进行交互
  - 例如在两个不同的令牌合约之间进行交换
  - 路由合约通常会在主合约和代理合约部署之后部署
  - 路由合约的参数包括**主合约地址**及**被交互的合约地址**
- 4. **MasterChef 合约**
  - 用于管理流动性挖矿项目
  - MasterChef 合约通常在路由合约之后部署，因为它可能需要通过路由合约进行交易
  - MasterChef 合约的参数可能包括**奖励代币的地址**，**挖矿池的信息**等
- 5. Vault 合约
  - 用于管理资产
  - 如：添加或移除资产，并计算和分配收益
  - 在 MasterChef 合约之后部署，因为它可能需要使用 MasterChef 合约中的信息
  - Vault 合约参数可能包括主合约地址，以及其他需要管理的资产地址

## Pancake 合约

- MasterChefV3: 0x556B9306565093C855AEA9AE92A594704c2Cd59e
  - FarmBooster: 0x695170fae243147b3beb4c43aa8de5dcd9202752
  - PancakeV3LmPoolDeployer: 0xd93F5c7A894bb44BDc9231087c8E559502f737eD
  - Pancake V3 Positions NFT-V1 (PCS-V3-POS) nonfungiblePositionManager
    - 0x46A15B0b27311cedF172AB29E4f4766fbE7F4364
  - poolInfo 1: 0x133B3D95bAD5405d14d53473671200e9342896BF
    - factory: 0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865
    - PancakeV3LmPool: 0x76bFcE845094d8CdfB9FA45134132823F37aE307
    - token0 CAKE: 0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82
    - token1 WBNB: 0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c
  - MasterChefV3Receiver: 0x07a57c7BdDfAda9a02DB89c58D0580344d95463C
- PancakeSwap:Nonfungible Position Manager V3: 0x46A15B0b27311cedF172AB29E4f4766fbE7F4364
- **PancakeSwap: Factory V3**: 0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865
  - poolDeployer: 0x41ff9aa7e16b8b1a8a8dc4f0efacd93d02d071c9
- PancakeSwap: Pool Deployer V3: 0x41ff9AA7e16B8B1a8a8dc4f0eFacd93D02d071c9
  - 流动性池合约部署
  - 流动性池合约管理
  - 流动性池合约参数设置

### PancakeSwap Factory V3 的核心逻辑：

- 1. 集成自动市场制造商(Automated Market Maker, AMM)
- 2. 引入集中化预言机机制
- 3. 支持多种流动性池类型
