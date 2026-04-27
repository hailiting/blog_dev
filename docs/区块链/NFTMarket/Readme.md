# NFTMarket

- 编写一个ERC721合约
- 发行一个ERC721 Token
- 编写一个市场合约 NFTMarket: 使用自己发行的ERC20 Token 来买NFT
  - NFT持有者可以上架NFT
  - 编写购买NFT方法 buyNFT(uint tokenID, uint amount) 转入对应的Token, 获取对应的NFT
  - 实现 ERC1363 接收者方法 `onTransferReceived`，在回调中实现购买逻辑

## ERC20购买ERC721不需要授权的几种策略

- ERC777
- ERC1363

下面用 **ERC1363** 实现：买家调用 `AErc20.transferAndCall(market, price, abi.encode(tokenId))`，`NFTMarket` 在回调里完成验价和转 NFT。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

interface IERC1363Receiver {
    function onTransferReceived(
        address operator,
        address from,
        uint256 value,
        bytes calldata data
    ) external returns (bytes4);
}

contract AErc20 is ERC20 {
    bytes4 private constant ERC1363_RECEIVED = 0x88a7ca5c;

    constructor() ERC20("AEc20", "AER"){
        _mint(msg.sender, 100000 * 10 ** decimals());
    }

    // ERC1363: 先转账，再回调接收方
    function transferAndCall(address to, uint256 amount, bytes calldata data) external returns (bool) {
        _transfer(msg.sender, to, amount);
        if (to.code.length > 0) {
            bytes4 retval = IERC1363Receiver(to).onTransferReceived(msg.sender, msg.sender, amount, data);
            require(retval == ERC1363_RECEIVED, "ERC1363: receiver rejected tokens");
        }
        return true;
    }
}
```

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MYERC721 is ERC721URIStorage {
    uint256 private _nextTokenId = 1;
    constructor () ERC721("MYERC721", "MYERC"){}
    function safeMint(address to, string memory tokenURI) public returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        return tokenId;
    }
}
```

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/interfaces/IERC1363Receiver.sol";

contract NFTMarket is IERC1363Receiver {
    IERC20 public paymentToken;
    IERC721 public nftToken;

    struct Listing {
        address seller;
        uint256 price;
        bool isActive;
    }
    mapping(uint256 => Listing) public listings;

    event NFTListed(uint256 indexed tokenId, address seller, uint256 price);
    event NFTSold(uint256 indexed tokenId, address buyer, address seller, uint256 price);
    event NFTDelisted(uint256 indexed tokenId, address seller);

    constructor(address _paymentToken, address _nftToken) {
        paymentToken = IERC20(_paymentToken);
        nftToken = IERC721(_nftToken);
    }

    function listNFT(uint256 tokenId, uint256 price) external {
        require(nftToken.ownerOf(tokenId) == msg.sender, "Not the owner");
        require(
            nftToken.getApproved(tokenId) == address(this) ||
            nftToken.isApprovedForAll(msg.sender, address(this)),
            "Not approved"
        );
        require(!listings[tokenId].isActive, "Already listed");
        require(price > 0, "Invalid price");

        listings[tokenId] = Listing({
            seller: msg.sender,
            price: price,
            isActive: true
        });
        emit NFTListed(tokenId, msg.sender, price);
    }
    function buyNFT(uint256 tokenId, uint256 amount) external {
        Listing storage listing = listings[tokenId];
        require(listing.isActive, "Not for sale");
        require(amount == listing.price, "Incorrect payment");
        require(listing.seller != msg.sender, "Cannot buy your own NFT");

        require(paymentToken.transferFrom(msg.sender, listing.seller, amount), "Token transfer failed");
        nftToken.safeTransferFrom(listing.seller, msg.sender, tokenId);
        listing.isActive = false;

        emit NFTSold(tokenId, msg.sender, listing.seller, amount);
    }

    // ERC1363 接收回调：当 AErc20.transferAndCall(...) 转入本合约时触发
    function onTransferReceived(
        address operator,
        address from,
        uint256 value,
        bytes memory data
    ) external override returns (bytes4) {
        require(msg.sender == address(paymentToken), "Only accept payment token");
        require(operator == from, "Only direct buyer call");

        // data 里编码 tokenId: abi.encode(tokenId)
        uint256 tokenId = abi.decode(data, (uint256));
        Listing storage listing = listings[tokenId];
        require(listing.isActive, "Not for sale");
        require(value == listing.price, "Incorrect payment");
        require(listing.seller != from, "Cannot buy your own NFT");

        // Token 已经转到 market，这里把钱打给卖家
        require(paymentToken.transfer(listing.seller, value), "Payout failed");
        nftToken.safeTransferFrom(listing.seller, from, tokenId);
        listing.isActive = false;

        emit NFTSold(tokenId, from, listing.seller, value);
        return IERC1363Receiver.onTransferReceived.selector;
    }
}
```

## 最小调用流程（ERC1363）

1. 卖家 mint NFT：
   - `tokenId = myErc721.safeMint(seller, "ipfs://...")`
2. 卖家授权市场合约转移该 NFT（只授权一次）：
   - `myErc721.approve(address(market), tokenId)`
3. 卖家上架：
   - `market.listNFT(tokenId, price)`
4. 买家拿到 AErc20 后，直接购买（不需要先 approve）：
   - `aErc20.transferAndCall(address(market), price, abi.encode(tokenId))`

这样购买逻辑会在 `NFTMarket.onTransferReceived` 中自动执行。
