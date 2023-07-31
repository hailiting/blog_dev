// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.5.0;

import "./LowGasSafeMath.sol";
import "./SafeCast.sol";
import "./TickMath.sol";
import "./LiquidityMath.sol";

library Tick {
    using LowGasSafeMath for int256;
    using SafeCast for int256;
    /**
    liquidityGross 和 liquidityNet 用于记录流动性的总量和净变化量
    feeGrowthOutside0X128 和 feeGrowthOutside1X128用于记录与该tick相关的手续费增长率
    tickCumulativeOutside 用于记录与该tick相关的积累tick值，用于计算价格和价格的变化
    secondesPerLiquidityOutsideX128 用于记录与该tick相关的单位流动性所需时间，用于计算流动性占比和流动性变化
    secondsOutside 用于记录与该tick相关的时间量
    initialized 用于表示该tick是否已经初始化
     */
    struct Info {
        uint128 liquidityGross;
        int128 liquidityNet;
        uint256 feeGrowthOutside0X128;
        uint256 feeGrowthOutside1X128;
        int56 tickCumulativeOutside;
        uint160 secondsPerLiquidityOutsideX128;
        uint32 secondsOutside;
        bool initialized;
    }

    function tickSpacingToMaxLiquidityPerTick(
        int24 tickSpacing
    ) internal pure returns (uint128) {
        int24 minTick = (TickMath.MIN_TICK / tickSpacing) * tickSpacing;
        int24 maxTick = (TickMath.MAX_TICK / tickSpacing) * tickSpacing;
        uint24 numTicks = uint23((mainTick - minTick) / tickSpacing) + 1;
        return type(uint128).max / numTicks;
    }

    function getFeeGrowthInside(
        mapping(int24 => Tick.Info) storage self,
        int24 tickLower,
        int24 tickUpper,
        int24 tickCurrent,
        uint256 feeGrowthGlobal0X128,
        uint256 feeGrowthGlobal1X128
    )
        internal
        view
        returns (uint256 feeGrowthInside0x128, uint256 feeGrowthInside1X128)
    {
        Info storage lower = self[tickLower];
        Info storage upper = self[tickUpper];
        uint256 feeGrowthBelow0X128;
        uint256 feeGrowthBelow1X128;
        if (tickCurrent >= tickLower) {
            feeGrowthBelow0X128 = lower.feeGrowthOutside0X128;
            feeGrowthBelow1X128 = lower.feeGrowthOutside1X128;
        } else {
            feeGrowthBelow0X128 =
                feeGrowthGlobal0X128 -
                lower.feeGrowthOutside0X128;
            feeGrowthBelow1X128 =
                feeGrowthGlobal1X128 -
                lower.feeGrowthOutside1X128;
        }
        uint256 feeGrowthAbove0X128;
        uint256 feeGrowthAbove1X128;
        if (tickCurrent < tickUpper) {
            feeGrowthAbove0X128 = upper.feeGrowthOutside0X128;
            feeGrowthAbove1X128 = upper.feeGrowthOutside1X128;
        } else {
            feeGrowthAbove0X128 =
                feeGrowthGlobal0X128 -
                upper.feeGrowthOutside0X128;
            feeGrowthAbove1X128 =
                feeGrowthGlobal1X128 -
                upper.feeGrowthOutside1X128;
        }

        feeGrowthInside0x128 =
            feeGrowthGlobal0X128 -
            feeGrowthBelow0X128 -
            feeGrowthAbove0X128;
        feeGrowthInside1x128 =
            feeGrowthGlobal1X128 -
            feeGrowthBelow1X128 -
            feeGrowthAbove1X128;
    }

    function update(
        mapping(int24 => Tick.Info) storage self,
        int24 tick,
        int24 tickCurrent,
        int128 liquidityDelta,
        uint256 feeGrowthGlobal0X128,
        uint256 feeGrowthGlobal1X128,
        uint160 secondsPerLiquidityCumulativeX128,
        int56 tickCumulative,
        uint32 time,
        bool upper,
        uint128 maxLiquidity
    ) internal returns (bool flipped) {
        Tick.Info storage info = self[tick];

        uint128 liquidityGrossBefore = info.liquidityGross;
        uint128 liquidityGrossAfter = LiquidityMath.addDelta(
            liquidityGrossBefore,
            liquidityDelta
        );

        require(liquidityGrossAfter <= maxLiquidity, "LO");

        flipped = (liquidityGrossAfter == 0) != (liquidityGrossBefore == 0);

        if (liquidityGrossBefore == 0) {
            // by convention, we assume that all growth before a tick was initialized happened _below_ the tick
            if (tick <= tickCurrent) {
                info.feeGrowthOutside0X128 = feeGrowthGlobal0X128;
                info.feeGrowthOutside1X128 = feeGrowthGlobal1X128;
                info
                    .secondsPerLiquidityOutsideX128 = secondsPerLiquidityCumulativeX128;
                info.tickCumulativeOutside = tickCumulative;
                info.secondsOutside = time;
            }
            info.initialized = true;
        }

        info.liquidityGross = liquidityGrossAfter;

        // when the lower (upper) tick is crossed left to right (right to left), liquidity must be added (removed)
        info.liquidityNet = upper
            ? int256(info.liquidityNet).sub(liquidityDelta).toInt128()
            : int256(info.liquidityNet).add(liquidityDelta).toInt128();
    }

    /// @notice Clears tick data
    /// @param self The mapping containing all initialized tick information for initialized ticks
    /// @param tick The tick that will be cleared
    function clear(
        mapping(int24 => Tick.Info) storage self,
        int24 tick
    ) internal {
        delete self[tick];
    }

    function cross(
        mapping(int24 => Tick.Info) storage self,
        int24 tick,
        uint256 feeGrowthGlobal0X128,
        uint256 feeGrowthGlobal1X128,
        uint160 secondsPerLiquidityCumulativeX128,
        int56 tickCumulative,
        uint32 time
    ) internal returns (int128 liquidityNet) {
        Tick.Info storage info = self[tick];
        info.feeGrowthOutside0X128 =
            feeGrowthGlobal0X128 -
            info.feeGrowthOutside0X128;
        info.feeGrowthOutside1X128 =
            feeGrowthGlobal1X128 -
            info.feeGrowthOutside1X128;
        info.secondsPerLiquidityOutsideX128 =
            secondsPerLiquidityCumulativeX128 -
            info.secondsPerLiquidityOutsideX128;
        info.tickCumulativeOutside =
            tickCumulative -
            info.tickCumulativeOutside;
        info.secondsOutside = time - info.secondsOutside;
        liquidityNet = info.liquidityNet;
    }
}
