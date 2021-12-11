// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;

import "./SafeMath.sol";
import "./IBEP20.sol";
import "./IBNBHCharacter.sol";
import "./IPancakeswapV2Factory.sol";
import "./IPancakeswapV2Router02.sol";
import "./IBNBHPool.sol";
import "./HeroLibrary.sol";
import "./IPriceOracle.sol";
import "./IRandoms.sol";
import "./EnumerableSet.sol";
import "./Address.sol";
import "./Initializable.sol";
import "./AccessControlUpgradeable.sol";
import "./IERC721ReceiverUpgradeable.sol";

contract BNBHero is
    Initializable,
    AccessControlUpgradeable,
    IERC721ReceiverUpgradeable
{
    using SafeMath for uint256;
    using EnumerableSet for EnumerableSet.UintSet;
    IRandoms public randoms;
    IBNBHCharacter public characters;
    IBEP20 public bnbhToken;
    IBNBHPool public bnbhPool;
    IPriceOracle public priceOracle;

    mapping(address => uint256) public balances;
    mapping(address => uint256) public unLockTime;
    uint256 public firstLockTime;

    address public burnAddress;

    mapping(uint256 => uint256) private listings;

    mapping(address => EnumerableSet.UintSet) heroIDsInBag;

    uint256 public maxHeroCount;
    uint256 public dividePercent;

    event UpdatedTokenContract(address tokenAddress);
    event UpdatedCharacterContract(address characterAddress);
    event UpdatedBNBPoolAddress(address account);
    event UpgradedTown(address player, uint8 townType, uint8 level);
    event UpdatedFirstLockTime(uint256 lockTime);
    event Fight(
        address player,
        uint256 _attackingHero,
        uint256 enemyType,
        uint256 rewards,
        uint256 xpGained,
        uint256 hpLoss
    );
    event ClaimedRewards(address player, uint256 amount);
    event ExpeditedHero(address player, uint256 _heroId);
    event CreatedHero(address player, uint256 _heroId);
    event UpdatedBurnAddress(address account);
    event CreatedAndSendPrizeHero(address account, uint256 heroIds);
    event UnlockedLevel(address player, uint256 _heroId, uint256 level);
    event UpdatedPriceOracle(address account);
    event MovedHeroToBag(address player, uint256 heroId);
    event TakeHeroFromBag(address player, uint256 heroId);
    event UpdatedDividePercent(uint256 percent);

    mapping(address => bool) public bannedList;

    receive() external payable {}

    modifier onlyOwner() {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Not admin");
        _;
    }

    function initialize(
        IBEP20 _bnbhToken,
        IBNBHCharacter _bnbhCharacter,
        IBNBHPool _bnbhPool,
        IPriceOracle _priceOracle,
        IRandoms _randoms
    ) public initializer {
        __AccessControl_init_unchained();

        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);

        bnbhToken = _bnbhToken;
        characters = _bnbhCharacter;
        bnbhPool = _bnbhPool;
        priceOracle = _priceOracle;
        randoms = _randoms;
        burnAddress = 0x0f3d164083275Bd690Db61445878786b290aaE9B;
        firstLockTime = 48 * 3600;
        maxHeroCount = 10;
        dividePercent = 70;
    }

    function migrateBannedList(address[] memory accounts) public onlyOwner {
        for (uint256 i = 0; i < accounts.length; i++) {
            bannedList[accounts[i]] = true;
        }
    }

    function setBannAddress(address account, bool status) public onlyOwner {
        bannedList[account] = status;
    }

    function setBurnAddress(address account) public onlyOwner {
        burnAddress = account;
        emit UpdatedBurnAddress(account);
    }

    function setBNBPoolAddress(address account) public onlyOwner {
        bnbhPool = IBNBHPool(account);
        emit UpdatedBNBPoolAddress(account);
    }

    function setPriceOracle(address account) public onlyOwner {
        priceOracle = IPriceOracle(account);
        emit UpdatedPriceOracle(account);
    }

    function setBNBHTokenContract(address tokenAddress) public onlyOwner {
        bnbhToken = IBEP20(tokenAddress);
        emit UpdatedTokenContract(tokenAddress);
    }

    function setCharacterContract(address characterAddress) public onlyOwner {
        characters = IBNBHCharacter(characterAddress);
        emit UpdatedCharacterContract(characterAddress);
    }

    function setFirstLockTime(uint256 lockTime) public onlyOwner {
        firstLockTime = lockTime;
        emit UpdatedFirstLockTime(lockTime);
    }

    function setDividePercent(uint256 percent) public onlyOwner {
        dividePercent = percent;
        emit UpdatedDividePercent(percent);
    }

    // function heros() public view returns (HeroLibrary.Hero[] memory) {
    //     return characters.heroes();
    // }
    function getHero(uint256 _heroId, bool calcTown)
        public
        view
        returns (HeroLibrary.Hero memory)
    {
        return characters.getHero(_heroId, calcTown);
    }

    function getHeroesByOwner(address account, bool calcTown)
        public
        view
        returns (HeroLibrary.Hero[] memory)
    {
        uint256 balance = characters.balanceOf(account);
        HeroLibrary.Hero[] memory heroes = new HeroLibrary.Hero[](balance);
        for (uint256 i = 0; i < balance; i++) {
            heroes[i] = getHero(
                characters.tokenOfOwnerByIndex(account, i),
                calcTown
            );
        }
        return heroes;
    }

    function getTownsOfPlayer(address account)
        public
        view
        returns (HeroLibrary.Town[4] memory)
    {
        return characters.getTownsOfPlayer(account);
    }

    function getTownLevel(address account, uint8 townType)
        public
        view
        returns (uint256)
    {
        return characters.getTownLevel(account, townType);
    }

    function _createHero(address payer, address fighter)
        internal
        returns (uint256)
    {
        require(
            address(priceOracle) != address(0),
            "Price Oracle was not set yet"
        );
        uint256 characterPrice = priceOracle.getCharacterPrice();
        require(
            bnbhToken.balanceOf(payer) >= characterPrice,
            "Insufficient BNBH balance"
        );
        uint256 seed = randoms.getRandomSeed(fighter);
        uint256 heroId = characters.mint(fighter, seed);
        payForOperation(payer, characterPrice);
        return heroId;
    }

    function sendPrizeHero(address account) public onlyOwner {
        uint256 heroId = _createHero(msg.sender, account);
        emit CreatedAndSendPrizeHero(account, heroId);
    }

    function createNewHero() public {
        require(
            bannedList[msg.sender] == false && isContract(msg.sender) == false
        );
        uint256 heroId = _createHero(msg.sender, msg.sender);
        emit CreatedHero(msg.sender, heroId);
    }

    function payForOperation(address payer, uint256 amount) internal {
        uint256 swapTokenAmount = amount.mul(dividePercent).div(100);
        bnbhToken.transferFrom(payer, address(bnbhToken), swapTokenAmount);
        bnbhToken.transferFrom(payer, burnAddress, amount.sub(swapTokenAmount));
    }

    function moveHeroToBag(uint256 heroId) public {
        require(
            characters.ownerOf(heroId) == msg.sender,
            "You are not owner of this hero"
        );
        require(
            heroIDsInBag[msg.sender].contains(heroId) == false,
            "The hero was already moved"
        );
        require(
            heroIDsInBag[msg.sender].length() < maxHeroCount,
            "Your slots are full"
        );
        characters.safeTransferFrom(msg.sender, address(this), heroId);
        heroIDsInBag[msg.sender].add(heroId);
        listings[heroId] = block.timestamp;
        emit MovedHeroToBag(msg.sender, heroId);
    }

    function takeHeroFromBag(uint256 heroId) public {
        require(
            heroIDsInBag[msg.sender].contains(heroId) == true,
            "The hero does not exist in this bag"
        );
        characters.safeTransferFrom(address(this), msg.sender, heroId);
        characters.resumeStaminaTimeStamp(
            heroId,
            block.timestamp - listings[heroId]
        );
        heroIDsInBag[msg.sender].remove(heroId);
        delete listings[heroId];
        emit TakeHeroFromBag(msg.sender, heroId);
    }

    function getHeroesInBag(address account)
        public
        view
        returns (HeroLibrary.Hero[] memory)
    {
        HeroLibrary.Hero[] memory heroes = new HeroLibrary.Hero[](
            heroIDsInBag[account].length()
        );
        for (
            uint256 index = 0;
            index < heroIDsInBag[account].length();
            index++
        ) {
            uint256 heroId = heroIDsInBag[account].at(index);
            HeroLibrary.Hero memory hero = characters.getHero(heroId, false);
            hero.hp = characters.calcHpForFreeHeroes(
                heroId,
                block.timestamp - listings[heroId]
            );
            heroes[index] = hero;
        }
        return heroes;
    }

    function unLockLevel(uint256 _heroId) public {
        uint256 level = characters.getLevel(_heroId);
        uint256 price = priceOracle.getUnlockLevelPrice(level);
        require(
            bnbhToken.balanceOf(msg.sender) >= price,
            "Insufficient BNBH balance"
        );
        level = characters.unlockLevel(_heroId);
        payForOperation(msg.sender, price);
        emit UnlockedLevel(msg.sender, _heroId, level);
    }

    function unpackFightData(uint256 data)
        internal
        pure
        returns (
            uint16,
            uint24,
            uint128
        )
    {
        uint16 hpLoss = uint16(data & 0xFFFF);
        uint24 xpGained = uint24((data >> 16) & 0xFFFFFF);
        uint128 bnbRewards = uint128(
            (data >> 40) & 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF
        );
        return (hpLoss, xpGained, bnbRewards);
    }

    function fight(uint256 _attackingHero, uint256 enemyType) public {
        require(
            bannedList[msg.sender] == false && isContract(msg.sender) == false
        );
        uint256 fightData = characters.fight(
            msg.sender,
            _attackingHero,
            enemyType,
            randoms.getRandomSeed(msg.sender)
        );
        (uint16 hpLoss, uint24 xpGained, uint128 bnbRewards) = unpackFightData(
            fightData
        );
        if (balances[msg.sender] == 0 && bnbRewards > 0) {
            unLockTime[msg.sender] = block.timestamp + firstLockTime;
        }
        balances[msg.sender] = balances[msg.sender].add(bnbRewards);
        emit Fight(
            msg.sender,
            _attackingHero,
            enemyType,
            bnbRewards,
            xpGained,
            hpLoss
        );
    }

    function expediteHero(uint256 _heroId) public {
        uint256 cost = priceOracle.getExpeditePrice();
        require(
            bnbhToken.balanceOf(msg.sender) >= cost,
            "Insufficient BNBH balance"
        );
        characters.expediteHero(_heroId);
        payForOperation(msg.sender, cost);
        emit ExpeditedHero(msg.sender, _heroId);
    }

    function upgradeTown(uint8 townType) public {
        require(townType < 4, "There is no town");
        uint8 level = characters.getTownLevel(msg.sender, townType);
        require(level < 3, "HeroLibrary.Town was fully upgraded");
        uint256 priceForUpdate = priceOracle.getTownUpgradePrice(
            townType,
            level + 1
        );
        require(
            bnbhToken.balanceOf(msg.sender) >= priceForUpdate,
            "Insufficient BNBH balance"
        );
        characters.upgradeTown(msg.sender, townType);
        payForOperation(msg.sender, priceForUpdate);
        emit UpgradedTown(msg.sender, townType, level + 1);
    }

    function claimRewards() public {
        require(
            bannedList[msg.sender] == false && isContract(msg.sender) == false
        );
        require(balances[msg.sender] > 0, "Insufficient balance");
        require(
            block.timestamp > unLockTime[msg.sender],
            "You can not claim at this time"
        );
        uint256 timespan = block.timestamp - unLockTime[msg.sender];
        uint256 taxFee = 0;
        if (timespan.mul(2) < 20 * 86400) {
            taxFee = 20 - timespan.div(86400).mul(2);
        }
        uint256 amount = balances[msg.sender].mul(100 - taxFee).div(100);
        bnbhPool.claimBNB(msg.sender, amount);
        balances[msg.sender] = 0;
        emit ClaimedRewards(msg.sender, amount);
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4) {
        return this.onERC721Received.selector;
    }

    function isContract(address account) internal view returns (bool) {
        // This method relies on extcodesize, which returns 0 for contracts in
        // construction, since the code is only stored at the end of the
        // constructor execution.

        uint256 size;
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
