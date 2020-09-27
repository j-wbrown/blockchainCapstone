// migrating the appropriate contracts
var Verifier = artifacts.require('Verifier.sol');
var SolnSquareVerifier = artifacts.require('SoInSquareVerifier.sol');
var ERC721MintableComplete = artifacts.require('customERC721Token');
module.exports = function(deployer) {
  deployer.deploy(SolnSquareVerifier);
  deployer.deploy(ERC721MintableComplete);
  deployer.deploy(Verifier);
};
