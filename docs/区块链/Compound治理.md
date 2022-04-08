# Compound 治理

## 代码解析

### ERC20 相关

```js
string public constant name="Compound";
// 代币名称COMP
string public constant symbol ="COMP";
// 精度18
uint8 public constant decimals = 18;
// 发行量 10,000,000
uint public totalSupply = 10000000e18;
// 管理员
address public minter;
// 授权
mapping (address=>mapping(address=>uint96)) internal allowances;
// 余额
mapping (address=>uint96) internal balances;
```

```js
// 委托，存储着投票委托数据
mapping (address=>address) public delegates;
// Checkpoint 存储着某个区块的票数
struct Checkpoint {uint32 fromBlock; uint96 votes;}
// 存储某个地址在区块的票数
mapping (address=>mapping (uint32=>Checkpoint)) public checkpoints;
// 存储某个地址在某个区块发生的改动
mapping (address=>uint32) public numCheckPoints;
```

```js
// 线下签名授权相关
bytes32 public constant DOMAIN_TYPEHASH = keccak256("EIP712Domain(string name,uint256 chainId, address verifyingContract");
bytes32 public constant DELEGATION_TYPEHASH = keccak256("Delegation(address delegatee, uint256 nonce, uint256 expiry");

// 记录线下签名投票数量
mapping (address=>uint) public nonces;

// 构造方法，将所有的代币传入的account，将管理员设为minter
constructor(address account) public {
  balances[account] = uint96(totalSupply);
  emit Transfer(address(0), account, totalSupply);
}
// erc20的授权查询，查询account 给spender授权了多少转账额度
function allowance(address account, address spender) external view returns (uint) {
  return allowances[account][spender];
}
// 给spender授权rawAmount的转账额度
function approve(address spender, uint rawAmount) external returns (bool) {
  uint96 amount;
  if(rawAmount == uint(-1)){
    amount = uint96(-1);
  } else {
    amount = safe96(rawAmount, "Comp::approve: amount exceeds 96 bits");
  }
  allowances[msg.sender][spender] = amount;
  emit Approval(msg.sender, spender, amount);
}
// 查询account代币余额
function balanceOf(address account) external view returns(uint){
  return balances[account];
}
// 转账
function transfer(address dst, uint rawAmount) external returns (bool){
  uint96 amount = safe96(rawAmount, "Comp::transfer: amount exceeds 96 bits");
  _transferTokens(msg.sender, dst, amount);
  return true;
}
// 将amount个代币从src转入dst, 并且减少src授权给发送者的rawAmount额度
function transferFrom(address src, address dst, uint rawAmount) external returns (bool) {
  address spender = msg.sender;
  uint96 spenderAllowance = allowances[src][spender];
  uint96 amount = safe96(rawAmount, "Comp::approve: amount excceds 96 bits");
  if(spender != src && spenderAllowance != uint96(-1)){
    uint96 newAllowance = sub96(spenderAllowance, amount, "Comp::transferFrom: transfer amount exceeds spender allowance");
    allowances[src][spender] = newAllowance;
    emit Approval(src, spender, newAllowance)
  }
  _transferTokens(src, dst, amount);
  return true;
}
// 委托代表，允许发送者委托delegatee进行投票
function delegate(address delegatee) public {
  return _delegate(msg.sender, delegatee);
}
// 线下签名委托
function delegateBySig(address delegatee, uint nonce, uint expiry, uint8 v, bytes32 r, bytes32 s) public {
  bytes32 domainSeparator = keccak256(abi.encode(DOMAIN_TYPEHASH, keccak256(bytes(name)), getChainId(), address(this)));
  bytes32 structHash = kaccak256(abi.encode(DELEGATION_TYPEHASH, delegatee, nonce, expiry));
  bytes32 digest = keccak256(abi.encodePacked("\x19\x01", domainSeparator, structHash));
  address signatory = ecrecover(digest, v, r, s);
  require(signatory != address(0), "Comp::delegateBySig: invalid signature");
  require(nonce == nonces[signatory]++, "Comp::delegateBySig: invalid nonce");
  require(now <= expiry, "Comp::delegateBySig: signature expired");
  return _delegate(signatory, delegatee);
}
// 获取现在票数
function getCurrentVotes(address account) external view returns (uint96) {
  uint32 nCheckpoints = numCheckpoints[account];
  return nCheckpoints >0?checkpoints[account][nCheckpoints-1].votes:0;
}
// 获取某个用户在某个区块的票数
// 1. 检查传入区块是否大于当前区块
// 2. 获取account票数改变的次数，因为初始票数为0，如果改变次数为0，则为0
// 3. 检查该账户最后记录的区块票数区块，如果小于等于区块，则返回票数
// 4. 检查该账户的第一个记录的区块票数区块，如果大于传入区块，则返回0
// 5. 使用二分法遍历全部记录票数的区块，返回相应的区块票数
function getPriorVotes(address account, uint blockNumber) public view returns (uint96){
  require(blockNumber<block.number, "Comp::getPriorVotes: not yet determined");
  uin32 nCheckpoints = numCheckpoints[account];
  if(nCheckpoints == 0){
    return 0;
  }
  if(checkpoints[account][nCheckpounts-1].fromBlock <= blockNumber){
    return checkpoints[account][nCheckpoints-1].votes;
  }
  if(checkpoints[account][0].fromBlock>blockNumber){
    return 0;
  }
  uint32 lower = 0;
  uint32 upper =nCheckpoints -1;
  while(upper>lower){
    uint32 center = upper-(upper-lower)/2;
    Checkpoint memory cp = checkpoints[account][center];
    if(cp.fromBlock == blockNumber){
      return cp.votes;
    } else if(cp.fromBlock<blockNumber) {
      lower = center;
    } else {
      upper = center-1;
    }
  }
  return checkpoints[account][lower].votes;
}
// 内部方法委托，允许delegator委托delegatee进行投票。
function _delegate(address delegator, address delegatee) internal {
  address currentDelegate = delegates[delegator];
  uint96 delegatorBalance = balances[delegator];
  delegates[delegator] = delegatee;
  emit DelegateChanged(delegator,currentDelegate, delegatee);
  _moveDelegates(currentDelegate, delegatee, delegatorBalance);
}
// 内部方法转账
function _transferTokens(address src, address dst, uint96 amount) internal {
  require(src != address(0), "Comp::_transferTokens: cannot transfer from the zero address");
  require(dst != address(0), "Comp::_transferTokens: cannot transfer to the zero address");

  balances[src] = sub96(balances[src], amount, "Comp::_transferTokens: transfer amount exceeds balance");
  balances[dst] = add96(balances[dst], amount, "Comp::_transferTokens: transfer amount overflows");

  emit Transfer(src, dst, amount);
  _moveDelegates(delegates[src], delegates[dst], amount);
}
// 更改票数，参数为转出地址，转入地址，金额
function _moveDelegates(address srcRep, address dstRep, uint96 amount) internal {
  if(srcRep != dstRep && amount>0){
    if(srcRep != address(0)){
      uint32 srcRepNum = numCheckpoints[srcRep];
      uint96 srcRepOld = srcRepNum > 0? checkpoints[srcRep][srcRepNum-1].votes: 0;
      uint96 srcRepNew = sub96(srcRepOld, amount, "Comp::_moveVotes: vote amount underflows");
      _writeCheckpoint(srcRep, srcRepNum, srcRepOld, srcRepNew);
    }
    if(dstRep!= address(0)){
      uint32 dstRepNum = numCheckpoints[dstRep];
      uint96 dstRepOld = dstRepNum > 0?checkpoints[dspRep][dstRepNum -1].votes:0;
      uint96 dstRepNew = add96(dstRepOld, amount, "Comp::_moveVotes: vote amount overflows");
      _writeCheckpoint(dstRep, dstRepNum, dstRepold, dstRepNew);
    }
  }
}
// 记录票数改变
function _writeCheckpoint(address delegatee, uint32 nCheckpoints, uint96 oldVotes, uint96 newVotes) internal {
  uint32 blockNumber = safe32(block.number, "Comp::writeCheckpoint: block number exceeds 32 bits");
  if(nCheckpoints>0 && checkpoints[delegatee][nCheckpoints-1].fromBlock == blockNumber){
    checkpoints[delegatee][nCheckpoints -1].votes = newVotes;
  } else {
    checkpoints[delegatee][nCheckpoints] = Checkpoint(blockNumber, newVotes);
    numCheckpoints[delegatee] = nCheckpoints+1;
  }
  emit DelegateVotesChanged(delegatee, oldVotes, newVotes);
}
```

v1.cosmos.network
