// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.6.12;
import "./lib/utils.sol";
enum StatusEnum {
    one,
    two,
    three
}

contract OMGToken is BEP20("AMoon Token", "OMG") {
    uint256 private _cap = 0;
    uint256 private _totalLock;

    uint256 public startReleaseBlock;
    uint256 public endReleaseBlock;

    // total lock block 180*86400/3  5184000  1day = 86400s
    // status 1, 30u/OMG,  MAX 20 OMG/address
    // status 2, 35u/OMG,  MAX 10 OMG/address
    // status 3, 40u/OMG,  MAX 5 OMG/address
    // mainnet 0x55d398326f99059fF775485246999027B3197955
    StatusEnum private status = StatusEnum.one;
    uint32 private max_amount = 20;

    address private USDT_ADDRESS = 0x55d398326f99059fF775485246999027B3197955;
    uint256 constant lockBlock = 5184000;

    mapping(address => uint256) private _locks;
    mapping(address => uint256) private _lastUnlockBlock;

    event Lock(address indexed to, uint256 value);
    event MintPre(address indexed to, uint256 value);

    constructor(uint256 _startReleaseBlock, uint256 _endReleaseBlock) public {
        // init
        _mint(msg.sender, 10000e18); // total 10000e18
        // lock some
        adminLock(msg.sender, 1470e18); // 14%
    }

    // amount wei
    function mintPre(uint256 amount) public {
        require(amount > 0, "OMGToken: amount must be > 0");

        bool oneStatus = status == StatusEnum.one &&
            _cap <= 2400e18 &&
            totalBalanceOf(msg.sender).add(amount) <= 20e18;
        bool twoStatus = status == StatusEnum.two &&
            _cap <= 3400e18 &&
            totalBalanceOf(msg.sender).add(amount) <= 10e18;
        bool threeStatus = status == StatusEnum.three &&
            _cap <= 4400e18 &&
            totalBalanceOf(msg.sender).add(amount) <= 5e18;

        require(
            oneStatus || twoStatus || threeStatus,
            "OMGToken: Some data wrong"
        );
        uint256 balance = IBEP20(USDT_ADDRESS).balanceOf(address(msg.sender));
        uint256 decimals = IBEP20(USDT_ADDRESS).decimals;
        uint256 _pow = 1;
        if (decimals != address(this).decimals) {
            _pow = SafeMath.pow(10, address(this).decimals.sub(decimals));
        }
        uint256 uintPrice = uint256(status).mul(5).add(30).div(_pow);
        uint256 price = uintPrice.mul(amount);
        require(balance >= price, "OMGToken: USDT balance not enough");
        TransferHelper.safeTransferFrom(
            USDT_ADDRESS,
            msg.sender,
            address(this),
            price
        );
        _cap.add(amount);
        _mintPreLock(address(msg.sender), amount);
        emit MintPre(USDT_ADDRESS, amount);
    }

    function adminLock(uint256 _amount) public onlyOwner {
        require(_amount <= balanceOf(address(this)), "no lock over balance");
        // _transfer(address(this), address(this), _amount);
        _locks[address(this)] = _locks[address(this)].add(_amount);
        _totalLock = _totalLock.add(_amount);
        emit Lock(address(this), _amount);
    }

    function _mintPreLock(address _account, uint256 _amount) internal {
        _locks[_account] = _locks[_account].add(_amount);
        _totalLock = _totalLock.add(_amount);
        if (_lastUnlockBlock[_account] < startReleaseBlock) {
            _lastUnlockBlock[_account] = startReleaseBlock;
        } else {
            // 有未解锁的，重新又购买了
            // 自动提取当前可提额度
            unlock();
        }
        emit Lock(_account, _amount);
    }

    function canUnlockAmount(address _account) public view returns (uint256) {
        if (block.number < startReleaseBlock) {
            return 0;
        } else if (block.number >= endReleaseBlock) {
            return _locks[_account];
        } else {
            if (_lastUnlockBlock[_account].add(lockBlock) <= block.number) {
                return _locks[_account];
            }
            uint256 releasedBlock = block.number.sub(
                _lastUnlockBlock[_account]
            );
            return _locks[_account].mul(releasedBlock);
        }
    }

    function unlock() public {
        require(_locks[msg.sender] > 0, "no locked OMG");
        uint256 amount = canUnlockAmount(msg.sender);
        _transfer(address(this), msg.sender, amount);
        _locks[msg.sender] = _locks[msg.sender].sub(amount);
        _lastUnlockBlock[msg.sender] = block.number;
        _totalLock = _totalLock.sub(amount);
    }

    function transferAll(address _to) public {
        _locks[_to] = _locks[_to].add(_locks[msg.sender]);
        if (_lastUnlockBlock[_to] < _lastUnlockBlock[msg.sender]) {
            _lastUnlockBlock[_to] = _lastUnlockBlock[msg.sender];
            _locks[_to] = _locks[_to].add(canUnlockAmount(msg.sender));
        }
        _locks[msg.sender] = 0;
        _lastUnlockBlock[msg.sender] = 0;
        _transfer(msg.sender, _to, balanceOf(msg.sender));
    }

    function getBlock() public view returns (uint256) {
        return block.number;
    }

    function changeStatus(StatusEnum _status) public onlyOwner {
        status = _status;
        if (status == StatusEnum.one) {
            max_amount = 20;
        } else if (status == StatusEnum.two) {
            max_amount = 10;
        } else {
            max_amount = 5;
        }
    }

    function changeUsdtAddress(address _address) public onlyOwner {
        require(
            Address.isContract(_address),
            "OMGToken: address mast be Contract"
        );
        USDT_ADDRESS = _address;
    }

    function getStatus() public view returns (StatusEnum) {
        return status;
    }

    function getUsdtAddress() public view returns (address) {
        return USDT_ADDRESS;
    }

    function unlockedSupply() public view returns (uint256) {
        return totalSupply().sub(totalLock());
    }

    function totalLock() public view returns (uint256) {
        return _totalLock;
    }

    function totalBalanceOf(address _account) public view returns (uint256) {
        return _locks[_account].add(balanceOf(_account));
    }

    function lockOf(address _account) public view returns (uint256) {
        return _locks[_account];
    }

    function lastUnlockBlock(address _account) public view returns (uint256) {
        return _lastUnlockBlock[_account];
    }
}
