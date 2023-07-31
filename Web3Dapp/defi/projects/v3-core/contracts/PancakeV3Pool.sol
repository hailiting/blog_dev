// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.5.0;
import "./interfaces/IPancakeV3Pool.sol";
import "./interfaces/IPancakeV3PoolDeployer.sol";
import "./interfaces/IPancakeV3Factory.sol";
import "./interfaces/IERC20Minimal.sol";
import "./interfaces/callback/IPancakeV3MintCallback.sol";
import "./interfaces/callback/IPancakeV3SwapCallback.sol";
import "./interfaces/callback/IPancakeV3FlashCallback.sol";
import "./interfaces/IPancakeV3LmPool.sol";

import "./libraries/LowGasSafeMath.sol";
import "./libraries/SafeCast.sol";
import "./libraries/Tick.sol";
import "./libraries/TickBitmap.sol";
import "./libraries/Position.sol";
import "./libraries/Oracle.sol";

import "./libraries/FullMath.sol";
import "./libraries/FixedPoint128.sol";
import "./libraries/TransferHelper.sol";
import "./libraries/TickMath.sol";
import "./libraries/LiquidityMath.sol";
import "./libraries/SqrtPriceMath.sol";
import "./libraries/SwapMath.sol";

contract PancakeV3Pool is IPancakeV3Pool {
    using LowGasSafeMath for uint256;
    using LowGasSafeMath for int256;
    using SafeCast for uint256;
    using SafeCast for int256;
    using Tick for mapping(int24 => Tick.Info);
    using TickBitmap for mapping(int16 => uint256);
    using Position for mapping(bytes32 => Position.Info);
    using Position for Position.Info;
    using Oracle for Oracle.Observation[65535];
    address public immutable override factory;
    address public immutable override token0;
    address public immutable override token1;
    uint24 public immutable override fee;
    int24 public immutable override tickSpacing;

    constructor() {
        int24 _tickSpacing;
        (factory, token0, token1, fee, _tickSpacing) = IPancakeV3PoolDeployer(
            msg.sender
        ).parameters();
        tickSpacing = _tickSpacing;
    }
}
