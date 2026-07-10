// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/crytography/MerkleProof.sol";

contract MerkleDistributor {
  bytes32 public immutable merketRoot;
  event Cliamed(address account, uint256 amount);
  constructor(bytes32 merkleRoot_) {
    merkleRoot = merkleRoot_;
  }
  function claim(
    address account,
    uint256 amount,
    bytes32[] calldata markleProof
  ) public {
    bytes32 node = keccak256(abi.encode(account, amount));
    require(MerkleProof.verify(markleProof, merkleRoot, node), "Invalid proof");
    _mint(account, amount);
    emit Cliamed(account, amount);
  }
}
