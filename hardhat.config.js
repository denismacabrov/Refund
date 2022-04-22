require("@nomiclabs/hardhat-waffle");

const {privateKey} = require('./secrets.json');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.4",
      },
      {
        version: "0.5.16",
        settings: {},
      },
      {
        version: "0.6.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 999999
          },
          evmVersion: "istanbul", 
          outputSelection: {
           "*": {
             "": [
               "ast"
             ],
             "*": [
               "evm.bytecode.object",
               "evm.deployedBytecode.object",
               "abi",
               "evm.bytecode.sourceMap",
               "evm.deployedBytecode.sourceMap",
               "metadata"
             ]
           },
         }
        },
      },
      {
        version: "0.4.18",
        settings: {},
      },
    ],
  },
  defaultNetwork: "hardhat",
   networks: {
      hardhat: {},
      rinkeby: {
         url: "https://rinkeby.infura.io/v3/47bcfcab54cd4104a97fb13f84ae431e",
         accounts: [privateKey]
      },
      ropsten: {
        url: "https://ropsten.infura.io/v3/47bcfcab54cd4104a97fb13f84ae431e",
        accounts: [privateKey]
     },
     bsctestnet: {
         url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
         accounts: [privateKey]
      },
     mumbai: {
         url: "https://rpc-mumbai.matic.today/",
         accounts: [privateKey]
      }
   },
  etherscan: {
    apiKey: "R12EHHV3BF9ZYT8CBMZMXU9HZMYCG5D1AD"
  }
};
