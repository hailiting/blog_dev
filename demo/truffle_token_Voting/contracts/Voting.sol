// SPDX-License-Identifier: MIT
pragma solidity >0.4.22;

contract Voting {
    struct voter {
        address voterAddress;
        uint256 tokensBought;
        uint256[] tokensUsedPerCandidate;
    }
    mapping(address => voter) public voterInfo;
    mapping(bytes32 => uint256) public votesReceived;
    bytes32[] public candidateList;
    uint256 public totalTokens;
    uint256 public balanceTokens;
    uint256 public tokenPrice;

    constructor(
        uint256 tokens,
        uint256 pricePerToken,
        bytes32[] memory candidateNames
    ) public {
        candidateList = candidateNames;
        totalTokens = tokens;
        balanceTokens = tokens;
        tokenPrice = pricePerToken;
    }

    function buy() public payable returns (uint256) {
        uint256 tokensToBuy = msg.value / tokenPrice;
        require(tokensToBuy <= balanceTokens);
        voterInfo[msg.sender].voterAddress = msg.sender;
        voterInfo[msg.sender].tokensBought += tokensToBuy;
        balanceTokens -= tokensToBuy;
        return tokensToBuy;
    }

    function totalVotesFor(bytes32 candidate) public view returns (uint256) {
        return votesReceived[candidate];
    }

    function voteForCandidate(bytes32 candidate, uint256 votesInTokens) public {
        uint256 index = indexOfCandidate(candidate);
        require(index != uint256(-1));
        if (voterInfo[msg.sender].tokensUsedPerCandidate.length == 0) {
            for (uint256 i = 0; i < candidateList.length; i++) {
                voterInfo[msg.sender].tokensUsedPerCandidate.push(0);
            }
        }
        uint256 availableTokens =
            voterInfo[msg.sender].tokensBought -
                totalTokensUsed(voterInfo[msg.sender].tokensUsedPerCandidate);
        require(availableTokens >= votesInTokens);
        votesReceived[candidate] += votesInTokens;
        voterInfo[msg.sender].tokensUsedPerCandidate[index] += votesInTokens;
    }

    function totalTokensUsed(uint256[] memory _tokensUsedPerCandidate)
        private
        pure
        returns (uint256)
    {
        uint256 totalUsedTokens = 0;
        for (uint256 i = 0; i < _tokensUsedPerCandidate.length; i++) {
            totalUsedTokens += _tokensUsedPerCandidate[i];
        }
        return totalUsedTokens;
    }

    function indexOfCandidate(bytes32 candidate) public view returns (uint256) {
        for (uint256 i = 0; i < candidateList.length; i++) {
            if (candidateList[i] == candidate) {
                return i;
            }
        }
        return uint256(-1);
    }

    function tokensSold() public view returns (uint256) {
        return totalTokens - balanceTokens;
    }

    function voterDetails(address user)
        public
        view
        returns (uint256, uint256[] memory)
    {
        return (
            voterInfo[user].tokensBought,
            voterInfo[user].tokensUsedPerCandidate
        );
    }

    function transferTo(address payable account) public {
        account.transfer(address(this).balance);
    }

    function allCandidates() public view returns (bytes32[] memory) {
        return candidateList;
    }
}
