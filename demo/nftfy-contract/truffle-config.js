const HDWalletProvider = require("@truffle/hdwallet-provider");
module.exports = {
  networks: {
    rinkeby: {
      provider: function () {
        var mnemonic =
          "ride pave scissors sponsor already number flag spawn local copper bargain until"; //put ETH wallet 12 mnemonic code
        return new HDWalletProvider(
          mnemonic,
          "https://rinkeby.infura.io/v3/3a2412dbe7c442969bee740219722d92",
          "0x64a339884648c7c99d293Af4c95E39982A65cd4E"
        );
      },
      network_id: "4",
    },
  },
  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },
  contracts_directory: "./full/",
  // contracts_build_directory: "./src/abis/",
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.0",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },

  // Truffle DB is currently disabled by default; to enable it, change enabled:
  // false to enabled: true. The default storage location can also be
  // overridden by specifying the adapter settings, as shown in the commented code below.
  //
  // NOTE: It is not possible to migrate your contracts to truffle DB and you should
  // make a backup of your artifacts to a safe location before enabling this feature.
  //
  // After you backed up your artifacts you can utilize db by running migrate as follows:
  // $ truffle migrate --reset --compile-all
  //
  // db: {
  // enabled: false,
  // host: "127.0.0.1",
  // adapter: {
  //   name: "sqlite",
  //   settings: {
  //     directory: ".db"
  //   }
  // }
  // }
  // api_keys: ["truffle-plugin-verify"],
};
