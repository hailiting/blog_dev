// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;

library HeroLibrary {
    struct Hero {
        uint256 name;
        uint256 heroType;
        uint256 xp;
        uint256 attack;
        uint256 armor;
        uint256 speed;
        uint256 hp;
        uint256 tokenId;
        uint256 arrivalTime;
        uint256 level;
        uint256 heroClass;
    }
    struct Town {
        uint8 level;
        uint256 lastUpgradedTimeStamp;
    }
}
