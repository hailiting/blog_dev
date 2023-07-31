// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// base
contract ERC20Token {
    mapping(address => address) public referrers; // 邀请关系图
    mapping(address => uint256) public rewards; // 奖励金额

    uint256 public constant REWARD_AMOUNT = 2 ether; // 一级奖励
    uint256 public constant BONUS_REWARD_AMOUNT = 1 ether; // 额外奖励

    function mint(address to) public {
        // 发送代币到to地址
        address referrer = referrers[to];
        if (referrer != address(0)) {
            rewards[referrer] += REWARD_AMOUNT;
            address parentReferrer = referrers[referrer];
            if (parentReferrer != address(0)) {
                rewards[parentReferrer] += BONUS_REWARD_AMOUNT;
                address grandparentReferrer = referrers[parentReferrer];
                if (grandparentReferrer != address(0)) {
                    rewards[grandparentReferrer] += BONUS_REWARD_AMOUNT;
                    address greatgrandparentReferrer = referrers[
                        grandparentReferrer
                    ];
                    if (greatgrandparentReferrer != address(0)) {
                        rewards[
                            greatgrandparentReferrer
                        ] += BONUS_REWARD_AMOUNT;
                    }
                }
            }
        }
    }

    // 绑定邀请关系
    function setRefferer(address to, address referrer) public {
        require(referrers[to] == address(0), "Refferer already set");
        require(to != referrer, "Cannot refer yourself");
        referrers[to] = referrer;
    }

    function claimRewards() public {
        uint256 totalReward = rewards[msg.sender];
        require(totalReward > 0, "No rewards to claim");
        // 确保被被邀请人只能领取一次奖励
        rewards[msg.sender] = 0;
        address[] memory referrersArray = new address[](4);
        referrersArray[0] = referrers[msg.sender];
        if (referrersArray[0] != address(0)) {
            referrersArray[1] = referrers[referrersArray[0]];
            if (referrersArray[1] != address(0)) {
                referrersArray[2] = referrers[referrersArray[1]];
                if (referrersArray[2] != address(0)) {
                    referrersArray[3] = referrers[referrersArray[2]];
                }
            }
        }
        uint256 rewardCount = 0;
        uint256[] memory rewardsArray = new uint256[](4);
        for (uint i = 0; i < referrersArray.length; i++) {
            if (referrersArray[i] != address(0)) {
                uint256 rewardAmount = uint256(2 ** i) * BONUS_REWARD_AMOUNT;
                rewardsArray[i] = rewardAmount;
                rewardCount += rewardAmount;
            }
        }
        // 发送奖励到 msg.sender 地址
    }
}
