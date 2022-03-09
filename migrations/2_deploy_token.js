const nft = artifacts.require("XLionsV1");

module.exports = async function (deployer) {
  await deployer.deploy(nft);
};
