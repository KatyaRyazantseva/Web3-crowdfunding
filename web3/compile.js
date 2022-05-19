// compile code will go here
const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");

// Get rid of the build folder before compile
const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

// This way path will be readable by both windows/linux
const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf8");

const campaign = {
  language: "Solidity",
  sources: {
    "Campaign.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(campaign))).contracts[
  "Campaign.sol"
];

// Recreate the build folder
fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, `${contract}.json`),
    output[contract]
  );
}
