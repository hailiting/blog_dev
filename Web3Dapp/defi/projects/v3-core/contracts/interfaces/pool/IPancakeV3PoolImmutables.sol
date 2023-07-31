// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.5.0;

// pool池的常量
interface IPancakeV3PoolImmutables {
    function factory() external view returns (address);

    function token0() external view returns (address);

    function token1() external view returns (address);

    function fee() external view returns (uint24);

    function tickSpacing() external view returns (int24);

    function maxLiquidityPerTick() external view returns (uint128);
}
