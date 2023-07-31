const networks = {
  eth: "eth",
  goerli: "goerli",
  bscMainnet: "bscMainnet",
  bscTestnet: "bscTestnet",
  hardhat: "hardhat",
};

const network = process.env.NETWORK;
console.log(chalk.green(network), "network");
if (!network || !networks[network]) {
  throw new Error(`env NETWORK: ${network}`);
}
await $`yarn workspace @pancakeswap/v3-core run hardhat run scripts/deploy.ts --network ${network}`;
console.log(chalk.blue("Done!"));

const c = await fs.readJson(`./projects/v3-core/deployments/${network}.json`);
const address = {
  ...c,
};

console.log(chalk.blue("Writing to file..."));
console.log(chalk.yellow(JSON.stringify(addresses, null, 2)));

fs.writeJson(`./deployments/${network}.json`, addresses, { spaces: 2 });
