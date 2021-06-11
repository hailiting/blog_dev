var Voting = artifacts.require("Voting");
module.exports = function(deployer) {
  deployer.deploy(Voting, 10000, web3.utils.toWei("0.01", "ether"), [
    web3.utils.fromAscii("Alice", 32),
    web3.utils.fromAscii("Bob", 32),
    web3.utils.fromAscii("Cary", 32),
  ]);
};
