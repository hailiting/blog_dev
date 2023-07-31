// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.5.0;

// 只能是所有者操作
interface IPancakeV3PoolOwnerActions {
    // 设置协议份额的分母
    function setFeeProtocol(uint32 feeProtocol0, uint32 feeProtocol1) external;

    // 收取累积到池子里的协议费
    function collectProtocol(
        address recipient,
        uint128 amount0Requested,
        uint128 amount1Requested
    ) external returns (uint128 amount0, uint128 amount1);

    // 设置LM pool 以启动流动性挖矿
    function setLmPool(address lmPool) external;
}
