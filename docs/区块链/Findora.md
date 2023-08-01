# Findora

Findora 旨在为金融服务提供更安全、更隐私、更可扩展的解决方案。
Findora 采用了零知识证明（Zero-Knowledge Proofs）技术，这种技术可以确保交易的机密性和安全性，同时保护参与者的隐私。此外，Findora 还支持智能合约，使用户可以自动化执行各种金融交易和操作。

## EVM Chain

EVM Chain 是 Findora 区块链的兼容 EVM 层（可通过 Prism++链接 UTXO Chain）。借助 Findora 的 EVM，开发人员可以访问构建符合 Ethereum 所有令牌规范（如：ERC-20、ERC-721）的 EVM，同时利用 Findora 提供的隐私功能。
Findora 的 EVM 和 UTXO 模型的多链架构确保他们共享相同的共识和存储层，而且通过名为 Prism 的新原子转移模型解决了地址类型之间的所有不兼容性。这使得用户拥有和控制 Findora 上的各种资产，并具有可编程隐私的灵活方法。

## UTXO Chain

UTXO Chain 是 Findora 的 UTXO 链，与 Noah 密码库连接，为开发人员提供在 UTXO 链上保密转移令牌的能力。然而，UTXO Chain 没有智能合约平台或虚拟机来执行直接调用 UTXO 本地链 SDK 中的 API 的业务逻辑。因此，要部署分散应用程序，开发人员需要再 Findora 的 EVM 智能链上部署业务逻辑，该智能链与 Ethereum 的 EVM 100%兼容。在 EVM 智能链上启动交易可以通过 UTXO 本地链路由，以帮助匿名交易。

为了解决隐私保护问题，开发了机密资产转移。
这些转移涉及使用称为 Pedersen 承诺方案，隐藏涉及交易的资产类型和数量。
这个方案是同态的，意味着两个对数量承诺的总和是对这两个承诺值总和的承诺，同时掩盖了承诺方案的隐藏属性，使数量的价值不可见。
承诺方案的绑定属性将承诺值绑定到特定的数量，这意味着承诺不能被打开到任何其他值。
