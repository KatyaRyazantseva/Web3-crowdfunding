require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const util = require("util");
const compiledFactory = require("./build/CampaignFactory.json");

// First argument is the mnemonic phrase
const provider = new HDWalletProvider(
  process.env.MNEMONIC_PHASE,
  process.env.FACTORY_PROVIDER
);

const web3 = new Web3(provider);

const deploy = async () => {
  // Get a list of all accounts
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account...:", accounts[0]);

  // Use one of those accounts to deploy a contract
  const contract = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({
      data: compiledFactory.evm.bytecode.object,
    })
    .send({ from: accounts[0], gas: "2000000" });

  console.log(
    util.inspect(compiledFactory.abi, {
      showHidden: false,
      depth: null,
      colors: true,
    })
  );
  console.log("Contract deployed to:", contract.options.address);

  // To prevent a hanging deployment:
  provider.engine.stop();
};

deploy();
