// migrating the appropriate contracts
var Verifier = artifacts.require('Verifier.sol');
var SolnSquareVerifier = artifacts.require('SoInSquareVerifier.sol');
var erc = artifacts.require("customERC721Token");
module.exports = function(deployer) {
  deployer.deploy(erc);
  deployer.deploy(Verifier).then(() => {
     return deployer.deploy(SolnSquareVerifier, Verifier.address);
  });
};
