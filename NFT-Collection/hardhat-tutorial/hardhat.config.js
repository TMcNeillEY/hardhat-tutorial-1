require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

/** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.17",
// };
const ALCHEMY_API_KEY_URL = process.env.ALCHEMY_API_KEY_URL;
//ToDo: come back to change out the rinkeby keys with goerli keys
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY;

module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: ALCHEMY_API_KEY_URL,
      accounts: [GOERLI_PRIVATE_KEY],
    },
  },
};