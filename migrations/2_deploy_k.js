const nft = artifacts.require("Kangaroos");

module.exports = async function (deployer) {
  await deployer.deploy(nft, "https://api.mint0xlionsv1.xyz/metadata/");
};
