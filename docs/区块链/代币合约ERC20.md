# ERC20 代币合约

```js
// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.8.0;
// Recipient 收件人
interface tokenRecipient {
  function receiveApproval(
    address _from,
    uint256 _value,
    address _token,
    bytes memory _extraData
  ) external;
}

contract ERC20 {
  string public name; // fancy name eg: OVM Coin
  string public symbol; // An identifier(标识符) eg: OVM
  uint8 public decimals=18; // 精度是多少
  uint256 public totalSupply; // 发行总量

  /// balances
  mapping(address=>uint256) public balanceOf;
  // allowance - 允许别人用你的名义划转
  mapping(address=>mapping(address=>uint256)) public allowance;

  // indexed 一个事件的检索
  event Transfer(address indexed from, address indexed to, uint256  value);
  // Approval 谁拥有授权 谁给他的授权 有多少 value
  event Approval(address indexed _owner, address indexed _spender, uint256 _value);
  // Burn 销毁机制
  event Burn(address indexed from, uint256 value);
  constructor(
    uint256 _initialAmount,
    uint8 _decimalUints,
    string memory _tokenName,
    string memory _tokenSymbol
  )  {
    balanceOf[msg.sender] = _initialAmount;
    totalSupply = _initialAmount;
    name = _tokenName;
    decimals = _decimalUints;
    symbol = _tokenSymbol;
  }
  // 内部划转，只能合约内部调用
  function _transfer(address _from, address _to, uint _value) internal {
    // 阻止划转到 0x0地址，用burn()函数
    require(_to != address(0x0));
    // 划出的账户有足够的余额
    require(balanceOf[_from]>=_value);
    // 增加后会不会栈溢出
    require(balanceOf[_to]+_value>=balanceOf[_to]);
    // 保存值为接下来的断言使用
    uint previousBalances = balanceOf[_from] + balanceOf[_to];
    balanceOf[_from] -= _value;
    balanceOf[_to] += _value;
    // 调用Transfer 发信息
    emit Transfer(_from, _to, _value);
    // 使用断言静态分析代码中的错误
    assert(balanceOf[_from]+balanceOf[_to] == previousBalances);
  }
  // 外部调用划转 从大账户划转
  function transfer(address _to, uint256 _value) public returns (bool success){
    _transfer(msg.sender, _to, _value);
    return true;
  }
  // 从其他地址划转
  function transferFrom(address _from, address _to, uint256 _value) public returns (bool success){
    // 查看是否是有划转权限的账户
    require(_value<=allowance[_from][msg.sender]);
    allowance[_from][msg.sender] -= _value; // 更新allowance表
    _transfer(_from, _to, _value);
    return true;
  }
  // 设置某个地址容许以主账户名义转账额度
  function approve(address _spender, uint256 _value) public returns(bool success){
    allowance[msg.sender][_spender] = _value;
    emit Approval(msg.sender, _spender, _value);
    return true;
  }
  function approveAndCall(address _spender, uint256 _value, bytes memory _extraData) public returns (bool success){
    tokenRecipient spender = tokenRecipient(_spender);
    if(approve(_spender, _value)){
      spender.receiveApproval(msg.sender, _value, address(this), _extraData);
      return true;
    }
  }
  // 主账号销毁
  function burn(uint256 _value)  public returns (bool success) {
    require(balanceOf[msg.sender] >= _value);
    balanceOf[msg.sender] -= _value;
    totalSupply -= _value;
    emit Burn(msg.sender, _value);
    return true;
  }
  // 其他账户销毁
  function burnFrom(address _from, uint256 _value) public returns (bool success){
    // 查看要销毁的账户是否有足够的余额
    require(balanceOf[_from]>=_value);
    require(_value<=allowance[_from][msg.sender]);
    balanceOf[_from] -= _value;
    allowance[_from][msg.sender] -=_value;
    totalSupply -= _value;
    emit Burn(_from, _value);
    return true;
  }
}
```
