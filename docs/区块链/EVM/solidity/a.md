bytes32 public constant TYPEHASH = keccak256("withdrawBySig(uint256 amount)");
function withdrawBySig(uint8 v, bytes32 r, bytes32 s, uint256 amount) external payable {
  bytes32 structHash = keccak256(abi.encode(TYPEHASH, amount));
  bytes32 hash = _hashTypedDataV4(structHash);
  address signer = ECDSA.recover(hash, v, r, s);
  require(inWhitelist[signer], "error signer");
  _withdraw(signer, amount);
}
function _withdraw(address user, uint256 amount) internal {
  uint256 currentBalance = balances[user];
  if(currentBalance < amount) {
    revert SignatureReplay__InsufficientBalance(currentBalance, amount);
  }
  balances[user] = currentBalance - amount;
  payable(msg.sender).transfer(amount);
}
