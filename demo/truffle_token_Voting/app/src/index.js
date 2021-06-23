import Web3 from "web3";
import votingArtifact from "../../build/contracts/Voting.json";

let candidates = {
  Alice: "candidate-1",
  Bob: "candidate-2",
  Cary: "candidate-3",
};
const App = {
  web3: null,
  account: null,
  voting: null,
  tokenPrice: null,
  start: async function() {
    const { web3 } = this;
    try {
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = votingArtifact.networks[networkId];
      this.voting = new web3.eth.Contract(
        votingArtifact.abi,
        deployedNetwork.address
      );
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];
      this.loadCandidatesAndVotes();
    } catch (error) {
      console.error("Нет подключения", error);
    }
  },
  loadCandidatesAndVotes: async function() {
    const { totalVotesFor } = this.voting.methods;
    let candidateNames = Object.keys(candidates);
    for (var i = 0; i < candidateNames.length; i++) {
      let name = candidateNames[i];
      var count = await totalVotesFor(this.web3.utils.asciiToHex(name)).call();
      console.log(count);
      $("#" + candidates[name]).html(count);
    }
  },
  lookupVoterInfo: function() {
    let address = $("#voter-info").val();
    const { voterDetails } = this.voting.methods;
    console.log(address);
    voterDetails(address)
      .call()
      .then(function(v) {
        $("#tokens-bought").html("Total Tokens bought: " + v[0].toString());
        let votesPerCandidate = v[1];
        $("#votes-cast").empty();
        $("#votes-cast").append("Votes cast per candidate: <br>");
        let allCandidates = Object.keys(candidates);
        for (let i = 0; i < allCandidates.length; i++) {
          $("#votes-cast").append(
            allCandidates[i] + ": " + votesPerCandidate[i] + "<br>"
          );
        }
      });
  },
  buyTokens: async function() {
    let tokensToBuy = $("#buy").val();
    const { tokenPrice, buy } = this.voting.methods;
    tokenPrice()
      .call()
      .then(function(v) {
        App.tokenPrice = parseFloat(App.web3.utils.fromWei(v.toString()));
        $("#token-cost").html(App.tokenPrice + " Ether");

        let price = tokensToBuy * App.tokenPrice;
        $("#buy-msg").html("Purchase order has been submitted. Please wait.");
        buy()
          .send({
            value: App.web3.utils.toWei(`${price}`, "ether"),
            from: App.account,
          })
          .then(function(v) {
            console.log(v);
            $("#buy-msg").html(``);
            App.web3.eth.getBalance(App.account, function(error, result) {
              $("#contract-balance").html(
                App.web3.utils.fromWei(result.toString()) + " Ether"
              );
            });
          });
      });
  },
  voteForCandidate: async function() {
    let candidateName = $("#candidate").val();
    let voteTokens = $("#vote-tokens").val();
    $("#msg").html(
      "Vote has been submitted. The vote count will increment as soon as the vote is recorded on the blockchain. Please wait."
    );
    $("#candidate").val("");
    $("#vote-tokens").val("");
    const { totalVotesFor, voteForCandidate } = this.voting.methods;
    await voteForCandidate(
      this.web3.utils.asciiToHex(candidateName),
      this.web3.utils.toHex(voteTokens)
    ).send({
      gas: 140000,
      from: App.account,
    });
    let div_id = candidates[candidateName];
    var count = await totalVotesFor(
      this.web3.utils.asciiToHex(candidateName)
    ).call();
    $("#" + div_id).html(count);
    $("#msg").html("");
  },
};
window.App = App;
window.addEventListener("load", function() {
  if (window.ethereum) {
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable();
  } else {
    console.warn("Нет web3 провайдера!");
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:8545")
    );
  }
  App.start();
});
