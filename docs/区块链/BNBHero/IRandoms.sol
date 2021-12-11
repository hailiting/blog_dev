// SPDX-License-Identifier: Unlicensed

pragma solidity ^0.8.0;

interface IRandoms {
    // Views
    function getRandomSeed(address user) external view returns (uint256 seed);
}
