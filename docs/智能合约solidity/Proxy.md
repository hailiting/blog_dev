# Proxy contract 代理合约

- 1. 部署 ProxyAdmin 管理代理合约 **可以管理多个逻辑代理合约**
- 2. erc20 合约部署
- 3. TransparentUpgradeableProxy.sol **逻辑代理合约**
  - `_LOGIC`: 逻辑合约地址 erc20
  - `ADMIN_`: 管理代理合约的地址 ProxyAdmin
  - `_DATA`: 0x 初始化参数
- 4. 把 TransparentUpgradeableProxy 地址给 A.sol 的 `At Address` **这个合约地址是公开的地址**
- 5. 修改逻辑合约

  - 5.1 部署新的逻辑合约 B.sol
  - 5.2 `ProxyAdmin/upgrade`

    - proxy: 逻辑代理合约地址
    - implementation: 新的逻辑合约地址

代理合约

```sol
// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";
import "@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract Logic is Initializable, OwnableUpgradeable {
    function initialize() public initializer {
        __Ownable_init();
    }
    mapping(string => uint256) private logic;
    event logicSetted(string indexed _key, uint256 _value);
    function SetLogic(string memory _key, uint256 _value) external  {
        logic[_key] = _value;
        emit logicSetted(_key, _value);
    }
    function GetLogic(string memory _key) public  view returns (uint256){
        return logic[_key];
    }
    function GetInitializeData() public pure returns(bytes memory) {
        return abi.encodeWithSignature("initialize()");
    }
}
```

A.sol

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
contract ERC20 {
    function name() public pure returns(string memory) {
        return "USDC";
    }
}
```

B.sol

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
contract ERC20 {
    function name() public pure returns(string memory) {
        return "aaaaa";
    }
}
```
