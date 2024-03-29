// // We require the Hardhat Runtime Environment explicitly here. This is optional
// // but useful for running the script in a standalone fashion through `node <script>`.
// //
// // You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// // will compile your contracts, add the Hardhat Runtime Environment's members to the
// // global scope, and execute the script.
// // const hre = require("hardhat");

// // async function main() {
// //   const currentTimestampInSeconds = Math.round(Date.now() / 1000);
// //   const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
// //   const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

// //   const lockedAmount = hre.ethers.utils.parseEther("1");

// //   const Lock = await hre.ethers.getContractFactory("Lock");
// //   const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

// //   await lock.deployed();

// //   console.log(
// //     `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
// //   );
// // }

// // // We recommend this pattern to be able to use async/await everywhere
// // // and properly handle errors.
// // main().catch((error) => {
// //   console.error(error);
// //   process.exitCode = 1;
// // });
// const { ethers } = require("hardhat");
// require("dotenv").config({ path: ".env" });
// const { WHITELIST_CONTRACT_ADDRESS, METADATA_URL, CRYPTODEVS_NFT_CONTRACT_ADDRESS } = require("../constants");

// async function main() {
//   // Address of the whitelist contract that you deployed in the previous module
//   const whitelistContract = WHITELIST_CONTRACT_ADDRESS;
//   // URL from where we can extract the metadata for a Crypto Dev NFT
//   const metadataURL = METADATA_URL;
//   // Deploy the FakeNFTMarketplace contract first
//   const FakeNFTMarketplace = await ethers.getContractFactory(
//     "FakeNFTMarketplace"
//   );
//   const fakeNftMarketplace = await FakeNFTMarketplace.deploy();
//   await fakeNftMarketplace.deployed();

//   console.log("FakeNFTMarketplace deployed to: ", fakeNftMarketplace.address);

//   /*
//   A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
//   so cryptoDevsContract here is a factory for instances of our CryptoDevs contract.
//   */
//   const cryptoDevsContract = await ethers.getContractFactory("CryptoDevs");
//   const CryptoDevsDAO = await ethers.getContractFactory("CryptoDevsDAO");


//   // deploy the contract
//   const deployedCryptoDevsContract = await cryptoDevsContract.deploy(
//     metadataURL,
//     whitelistContract
//   );

//   // print the address of the deployed contract
//   console.log(
//     "Crypto Devs Contract Address:",
//     deployedCryptoDevsContract.address
//   );
// }
// // Now deploy the CryptoDevsDAO contract
// const cryptoDevsDAO = await CryptoDevsDAO.deploy(
//   fakeNftMarketplace.address,
//   CRYPTODEVS_NFT_CONTRACT_ADDRESS,
//   {
//     // This assumes your account has at least 1 ETH in it's account
//     // Change this value as you want
//     value: ethers.utils.parseEther("1"),
//   }
// );
// await cryptoDevsDAO.deployed();

// console.log("CryptoDevsDAO deployed to: ", cryptoDevsDAO.address);


// // Call the main function and catch if there is any error
// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });

const { ethers } = require("hardhat");
const { CRYPTODEVS_NFT_CONTRACT_ADDRESS } = require("../constants");

async function main() {
  // Deploy the FakeNFTMarketplace contract first
  const FakeNFTMarketplace = await ethers.getContractFactory(
    "FakeNFTMarketplace"
  );
  const fakeNftMarketplace = await FakeNFTMarketplace.deploy();
  await fakeNftMarketplace.deployed();

  console.log("FakeNFTMarketplace deployed to: ", fakeNftMarketplace.address);

  // Now deploy the CryptoDevsDAO contract
  const CryptoDevsDAO = await ethers.getContractFactory("CryptoDevsDAO");
  const cryptoDevsDAO = await CryptoDevsDAO.deploy(
    fakeNftMarketplace.address,
    CRYPTODEVS_NFT_CONTRACT_ADDRESS,
    {
      value: ethers.utils.parseEther("0.1"),
    }
  );
  await cryptoDevsDAO.deployed();

  console.log("CryptoDevsDAO deployed to: ", cryptoDevsDAO.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

//   FakeNFTMarketplace deployed to:  0x36445974bF45dEf06444709CF04491e977027006
// CryptoDevsDAO deployed to:  0xCBc9e29c958cd103d9298c057e1635b409332401