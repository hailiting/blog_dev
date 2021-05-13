# ERC20 代币合约

```js
// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.8.0;

library SafeMath {
  function safeMul(uint256 a, uint256 b) internal pure returns (uint256) {
   if (a == 0) {return 0;}
        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");
        return c;
  }
  function safeDiv(uint256 a, uint256 b) internal pure returns (uint256) {
    require(b>0);
    uint256 c=a/b;
    require(!(a==b*c+a%b));
    return c;
  }
  function safeAdd(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c=a+b;
    require(c >= a, "SafeMath: addition overflow");
    return c;
  }
  function safeSub(uint256 a, uint256 b) internal pure returns (uint256) {
    require(b <= a);
    return a - b;
  }
}


// Recipient 收件人
interface tokenRecipient {
  function receiveApproval(
    address _from,
    uint256 _value,
    address _token,
    bytes memory _extraData
  ) external;
}

contract ERC20  {
  using SafeMath for uint256;
  string public name; // fancy name eg: OVM Coin
  string public symbol; // An identifier(标识符) eg: OVM
  uint8 public decimals=18; // 精度是多少
  uint256 public totalSupply; // 发行总量
  address payable public owner;
  /// balances
  mapping(address=>uint256) public balanceOf;
  // 冻结数组
  mapping(address=>uint256) public freezeOf;
  // allowance - 允许别人用你的名义划转
  mapping(address=>mapping(address=>uint256)) public allowance;

  // indexed 一个事件的检索
  event Transfer(address indexed from, address indexed to, uint256  value);
  // 冻结事件监听
  event Freeze(address indexed from, uint256 value);
  // 释放冻结事件监听
  event Unfreeze(address indexed from, uint256 value);
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
    owner =  msg.sender;
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
    uint previousBalances = balanceOf[_from].safeAdd(balanceOf[_to]);
    balanceOf[_from] =balanceOf[_from].safeSub(_value);
    balanceOf[_to] = balanceOf[_to].safeAdd(_value);
    // 调用Transfer 发信息
    emit Transfer(_from, _to, _value);
    // 使用断言静态分析代码中的错误
    assert(balanceOf[_from].safeAdd(balanceOf[_to]) == previousBalances);
  }
  // 外部调用划转 从大账户划转
  function transfer(address _to, uint256 _value) public returns (bool success){
    _transfer(msg.sender, _to, _value);
    return true;
  }
  // 从其他地址划转  授权
  function transferFrom(address _from, address _to, uint256 _value) public returns (bool success){
    // 查看是否是有划转权限的账户
    // _from 额度里 给到 调用者的额度
    require(_value<=allowance[_from][msg.sender]);
    allowance[_from][msg.sender] = allowance[_from][msg.sender].safeSub(_value); // 更新allowance表
    _transfer(_from, _to, _value);
    return true;
  }
  // 设置某个地址容许以主账户名义转账额度
  function approve(address _spender, uint256 _value) public returns(bool success){
    require(_value >0);
    allowance[msg.sender][_spender] = _value;
    // 谁给谁发布了多少额度
    emit Approval(msg.sender, _spender, _value);
    return true;
  }
  // 调用并返回
  function approveAndCall(address _spender, uint256 _value, bytes memory _extraData) public returns (bool success){
    tokenRecipient spender = tokenRecipient(_spender);
    if(approve(_spender, _value)){
      spender.receiveApproval(msg.sender, _value, address(this), _extraData);
      return true;
    }
  }
  // 主账号销毁
  function burn(uint256 _value)  public returns (bool success) {
    require(_value>0);
    require(balanceOf[msg.sender] >= _value);
    balanceOf[msg.sender] = balanceOf[msg.sender].safeSub(_value);
    totalSupply = totalSupply.safeSub(_value);
    emit Burn(msg.sender, _value);
    return true;
  }
  // 其他账户调用销毁
  function burnFrom(address _from, uint256 _value) public returns (bool success){
    // 查看要销毁的账户是否有足够的余额
    require(_value>0);
    require(balanceOf[_from]>=_value);
    require(_value<=allowance[_from][msg.sender]);
    balanceOf[_from] = balanceOf[_from].safeSub(_value);
    allowance[_from][msg.sender] = allowance[_from][msg.sender].safeSub(_value);
    totalSupply = totalSupply.safeSub(_value);
    emit Burn(_from, _value);
    return true;
  }
  // 冻结
  function freeze(uint256 _value) public returns (bool success){
    require(_value>0);
    require(balanceOf[msg.sender]>=_value);
    balanceOf[msg.sender] = balanceOf[msg.sender].safeSub(_value);
    freezeOf[msg.sender] = freezeOf[msg.sender].safeAdd(_value);
    emit Freeze(msg.sender, _value);
    return true;
  }
  // 解冻
  function unfreeze(uint256 _value) public returns  (bool success){
    require(freezeOf[msg.sender] >=_value);
    require(_value>0);
    freezeOf[msg.sender] = freezeOf[msg.sender].safeSub(_value);
    balanceOf[msg.sender] = balanceOf[msg.sender].safeAdd(_value);
    emit Unfreeze(msg.sender, _value);
    return true;
  }
  function withdrawEther(uint256 amount) payable public returns (bool success){
    require(msg.sender==owner);
    owner.transfer(amount);
    return true;
  }
}
```
