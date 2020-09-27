// migrating the appropriate contracts
var Verifier = artifacts.require('Verifier.sol');
var SolnSquareVerifier = artifacts.require('SoInSquareVerifier.sol');
var customERC721Token = artifacts.require('customERC721Token');
module.exports = function(deployer) {
  deployer.deploy(SolnSquareVerifier);
  deployer.deploy(customERC721Token);
  deployer.deploy(Verifier);
};
