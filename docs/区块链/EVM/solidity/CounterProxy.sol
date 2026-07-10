// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Counter {
  uint public counter;
  function add(uint256 i) public {
    counter += i;
  }

  function get() public view returns(uint){
    return counter;
  }

  function uintToBytes32(uint i) external view returns(bytes32 data){
    data = bytes32(i);
  }

  function read(bytes32 slot) external view returns(bytes32 data){
    assembly {
      data:= sload(slot)
    }
  }
  function write(bytes32 slot,uint256 value)external {
    assembly{
      sstore(slot, value)
    }
  }
}
