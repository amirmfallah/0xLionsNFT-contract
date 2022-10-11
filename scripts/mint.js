const HDWalletProvider = require("@truffle/hdwallet-provider");
const web3 = require("web3");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const ganache = require("ganache");

const NFT_CONTRACT_ADDRESS = "0x479E03611EA2dC23f5eF539Dda5392Ce3D86F56D";
const OWNER_ADDRESS = "0x784392F8A5ed09F97Fd116CFe47FC978fF37bFd7";

const lionsAddr = "0x450Bc0a99d88a634556A208C9b6B37358705d80A";

//* Remember to
//*Parse the contract artifact for ABI reference.
let rawdata1 = fs.readFileSync(
  path.resolve(__dirname, "../build/contracts/Kangaroos.json")
);
let contractAbi1 = JSON.parse(rawdata1);
const NFT_ABI = contractAbi1.abi;

let rawdata2 = fs.readFileSync(
  path.resolve(__dirname, "../build/contracts/XLionsV1.json")
);
let contractAbi2 = JSON.parse(rawdata2);
const lionsABI = contractAbi2.abi;

async function main() {
  try {
    //*define web3, contract and wallet instances
    const provider = new HDWalletProvider(
      "5368c98d48888aacaf4ff00ee4594ac8b35a36875de370e46210be866b16f7a8",
      "http://127.0.0.1:8545"
    );
    //const provider = new HDWalletProvider(MNEMONIC, rink);

    const web3Instance = new web3(provider);
    const nftContractL = new web3Instance.eth.Contract(lionsABI, lionsAddr);

    const nftContractK = new web3Instance.eth.Contract(
      NFT_ABI,
      NFT_CONTRACT_ADDRESS
    );

    //the transaction
    const tx = {
      from: OWNER_ADDRESS,
      to: NFT_CONTRACT_ADDRESS,
      value: "20000000000000000",
    };
    //100000000000000000

    // await nftContract.methods
    //   .setUriSuffix("")
    //   .send(tx)
    //   .then((res) => {
    //     console.log(res);
    //     console.log("minted");
    //   })
    //   .catch((error) => console.log(error));
    await nftContractL.methods
      .getApproved(0)
      .call()
      .then((res) => {
        console.log(res);
        console.log("minted");
      })
      .catch((error) => console.log(error));

    await nftContractL.methods
      .mintItem(1)
      .send(tx)
      .then((res) => {
        console.log(res.events);
        console.log("minted");
      })
      .catch((error) => console.log(error));

    await nftContractL.methods
      .setApprovalForAll(NFT_CONTRACT_ADDRESS, true)
      .send({
        from: OWNER_ADDRESS,
        to: lionsAddr,
        value: "0",
      })
      .then((res) => {
        console.log(res.events);
        console.log("approved");
      })
      .catch((error) => console.log(error));

    await nftContractK.methods
      .mintItem(1, lionsAddr, 0)
      .send(tx)
      .then((res) => {
        console.log(res);
        console.log("minted");
      })
      .catch((error) => console.log(error));

    // await nftContract.methods
    //   .setMaxInTRX(1000)
    //   .send(tx)
    //   .then((res) => {
    //     console.log(res);
    //     console.log("minted");
    //   })
    //   .catch((error) => console.log(error));

    // await nftContract.methods
    //   .reveal(true)
    //   .send(tx)
    //   .then((res) => {
    //     console.log(res);
    //     console.log("minted");
    //   })
    //   .catch((error) => console.log(error));

    // await nftContract.methods
    //   .withdraw()
    //   .send(tx)
    //   .then((res) => {
    //     console.log(res);
    //     console.log("minted");
    //   })
    //   .catch((error) => console.log(error));

    // console.log(
    //   await web3Instance.eth.getBalance(
    //     "0x17c39711565c5874344b7b8eccF022373dc6FBed"
    //   )
    // );
  } catch (e) {
    console.log(e);
  }
}

//invoke
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
