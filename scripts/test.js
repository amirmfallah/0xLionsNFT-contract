const HDWalletProvider = require("@truffle/hdwallet-provider");
const web3 = require("web3");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const ganache = require("ganache");

//*vars
const MNEMONIC = process.env.MNEMONIC;
const API_KEY = process.env.NODE_KEY;

const NFT_CONTRACT_ADDRESS = "0xa12e246d3A178DB0e9dBD7D3191e7Bf7a2BCA5a1";
const OWNER_ADDRESS = "0xA2fBbffA2Cd06667AE0327d56C358D07f361d3e3";
const MUMBAI = `https://rpc-mumbai.maticvigil.com/v1/${API_KEY}`;
const MATIC = `https://rpc-mainnet.maticvigil.com/v1/${API_KEY}`;
const rink = "https://rinkeby.infura.io/v3/eff0770e240c478bac80351b31dd5e97";

//* Remember to
//*Parse the contract artifact for ABI reference.
let rawdata = fs.readFileSync(
  path.resolve(__dirname, "../build/contracts/XLionsV1.json")
);
let contractAbi = JSON.parse(rawdata);
const NFT_ABI = contractAbi.abi;

async function test() {
  try {
    //*define web3, contract and wallet instances
    //const provider = new HDWalletProvider(MNEMONIC, MUMBAI);
    const provider = new HDWalletProvider(MNEMONIC, rink);

    const web3Instance = new web3(provider);
    //const web3Instance = new web3("http://127.0.0.1:8545");
    const nftContract = new web3Instance.eth.Contract(
      NFT_ABI,
      NFT_CONTRACT_ADDRESS
    );
    const lastBlock = await web3Instance.eth.getBlock("latest");
    console.log(lastBlock);
    const nonce = await web3Instance.eth.getTransactionCount(
      OWNER_ADDRESS,
      "latest"
    ); //get latest nonce

    //the transaction
    const tx = {
      from: OWNER_ADDRESS,
      to: NFT_CONTRACT_ADDRESS,
      nonce: nonce,
      value: "10000000000000000",
    };

    //* just mint
    await nftContract.methods
      .tokenURI(0)
      .call()
      .then((res) => {
        console.log(res);
        console.log("minted");
      })
      .catch((error) => console.log(error));
  } catch (e) {
    console.log(e);
  }
}

//invoke
test()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
