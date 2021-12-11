// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;

interface IPriceOracle {
    // Views
    function getCharacterPrice() external view returns (uint256);

    function getExpeditePrice() external view returns (uint256);

    function getUnlockLevelPrice(uint256 level) external view returns (uint256);

    function getTownUpgradePrice(uint256 townType, uint256 level)
        external
        view
        returns (uint256);
}
