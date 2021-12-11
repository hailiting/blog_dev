// SPDX-License-Identifier: Unlicensed

pragma solidity ^0.8.0;
import "./HeroLibrary.sol";
import "./IERC721Enumerable.sol";
import "./ERC721URIStorage.sol";

interface IBNBHCharacter is IERC721Enumerable {
    // function heroes() external view returns (Hero[] memory);
    function mint(address minter, uint256 seed) external returns (uint256);

    function fight(
        address player,
        uint256 _attackingHero,
        uint256 enemyType,
        uint256 seed
    ) external returns (uint256);

    function getTownLevel(address account, uint8 townType)
        external
        view
        returns (uint8);

    function upgradeTown(address account, uint8 townType) external;

    function getHero(uint256 _heroId, bool calcTown)
        external
        view
        returns (HeroLibrary.Hero memory);

    function getLevel(uint256 _heroId) external view returns (uint256);

    function getRarity(uint256 _heroId) external view returns (uint256);

    function getTownsOfPlayer(address account)
        external
        view
        returns (HeroLibrary.Town[4] memory);

    function expediteHero(uint256 _heroId) external;

    function unlockLevel(uint256 _heroId) external returns (uint256);

    function resumeStaminaTimeStamp(uint256 _heroId, uint256 timeStamp)
        external;

    function calcHpForFreeHeroes(uint256 _heroId, uint256 timestamp)
        external
        view
        returns (uint256);
}
