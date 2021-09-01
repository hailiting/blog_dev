// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DBRT is ERC721Enumerable, Ownable {
    using Strings for uint256;

    string _baseTokenURI;
    uint256 private _reserved = 100;
    uint256 private _price = 0.06 ether;
    bool public _paused = true;

    // withdraw addresses
    address t1 = 0x7B96c6E49914067e69e68F2e606b8693A9893540;
    address t2 = 0x9a4ab631E2d2699A23D3869751166CC79F2364ad;
    address t3 = 0x64a339884648c7c99d293Af4c95E39982A65cd4E;

    // Dont Buy Rocks:)
    // 9999 DBRT in total
    constructor(string memory baseURI) ERC721("Dont Buy Rocks", "DBRT") {
        setBaseURI(baseURI);
        // team gets the first 3 DBRT
        _safeMint(t1, 0);
        _safeMint(t2, 1);
        _safeMint(t3, 2);
    }

    function mint(uint256 num) public payable {
        uint256 supply = totalSupply();
        require(!_paused, "Sale paused");
        require(num < 21, "You can adopt a maximum of 20 DBRT");
        require(
            supply + num < 10000 - _reserved,
            "Exceeds maximum DBRT supply"
        );
        require(msg.value >= _price * num, "Ether sent is not correct");

        for (uint256 i; i < num; i++) {
            _safeMint(msg.sender, supply + i);
        }
    }

    function walletOfOwner(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256 tokenCount = balanceOf(_owner);

        uint256[] memory tokensId = new uint256[](tokenCount);
        for (uint256 i; i < tokenCount; i++) {
            tokensId[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokensId;
    }

    // Just in case Eth does some crazy stuff
    function setPrice(uint256 _newPrice) public onlyOwner {
        _price = _newPrice;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    function setBaseURI(string memory baseURI) public onlyOwner {
        _baseTokenURI = baseURI;
    }

    function getPrice() public view returns (uint256) {
        return _price;
    }

    function giveAway(address _to, uint256 _amount) external onlyOwner {
        require(_amount <= _reserved, "Exceeds reserved DBRT supply");

        uint256 supply = totalSupply();
        for (uint256 i; i < _amount; i++) {
            _safeMint(_to, supply + i);
        }

        _reserved -= _amount;
    }

    function pause(bool val) public onlyOwner {
        _paused = val;
    }

    function withdrawAll() public payable onlyOwner {
        uint256 _each = address(this).balance / 4;
        require(payable(t1).send(_each));
        require(payable(t2).send(_each));
        require(payable(t3).send(_each));
    }
}
