// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./IERC20.sol";

contract MyNFT {
    struct ERC20Asset {
        address erc20Token;
        uint256 erc20Amount;
    }
    struct NFT {
        address owner;
        uint256 tokenId;
        mapping(uint256 => ERC20Asset) assets;
    }
    mapping(uint256 => NFT) public nfts;
    event NFTCreated(address indexed owner, uint256 indexed tokenId);
    event ERC20AssetAdded(
        uint256 indexed tokenId,
        address indexed erc20Token,
        uint256 indexed erc20Amount
    );
    event ERC20Transferred(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId,
        address indexed erc20Token,
        uint256 erc20Amount
    );

    function createNft(uint256 _tokenId) external {
        nfts[_tokenId] = NFT(msg.sender, _tokenId, 0);
        emit NFTCreated(msg.sender, _tokenId);
    }

    function addERC20Asset(
        uint256 _tokenId,
        address _erc20Token,
        uint256 _erc20Amount
    ) external {
        NFT storage nft = nfts[_tokenId];
        require(nft.owner == msg.sender, "You are not the owner of the NFT");
        uint256 assetIndex = nft.numAssets;
        nft.assets[assetIndex] = ERC20Asset(_erc20Token, _erc20Amount);
        nft.numAssets += 1;
        emit ERC20AssetAdded(_tokenId, _erc20Token, _erc20Amount);
    }

    function getERC20Balance(
        uint256 _tokenId,
        address _assetIndex
    ) public view returns (uint256) {
        NFT memory nft = nfts[_tokenId];
        require(_assetIndex < nft.numAssets, "Invalid asset index");
        ERC20Asset storage asset = nft.assets[_assetIndex];

        IERC20 erc20 = IERC20(nft.erc20Token);
        return erc20.balanceOf(nft.owner);
    }

    function transferERC20(
        uint256 _tokenId,
        uint256 _assetIndex,
        address _to,
        uint256 _erc20Amount
    ) external {
        NFT storage nft = nfts[_tokenId];
        require(msg.sender == nft.owner, "Not the owner of the NFT");
        require(_assetIndex < nft.numAssets, "Invalid asset index");
        ERC20Asset storage asset = nft.assets[_assetIndex];

        require(
            _erc20Amount <= asset.erc20Amount,
            "Insufficient ERC-20 balance"
        );
        IERC20 erc20 = IERC20(asset.erc20Token);
        erc20.transfer(_to, _erc20Amount);
        asset.erc20Amount -= _erc20Amount;
        emit ERC20Transferred(
            msg.sender,
            _to,
            _tokenId,
            asset.erc20Token,
            _erc20Amount
        );
    }
}
