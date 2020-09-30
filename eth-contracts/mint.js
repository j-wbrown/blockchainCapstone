const HDWalletProvider = require("truffle-hdwallet-provider")
const web3 = require('web3')
const config = require('./config');
/* const MNEMONIC = process.env.MNEMONIC
const INFURA_KEY = process.env.INFURA_KEY
const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS
const OWNER_ADDRESS = process.env.OWNER_ADDRESS
const NETWORK = process.env.NETWORK */
const MNEMONIC = config.MNEMONIC
const INFURA_KEY = config.INFURA_KEY
let NFT_CONTRACT_ADDRESS = config.CONTRACT_ADDRESS
let OWNER_ADDRESS = config.OWNER_ADDRESS
const NETWORK = config.NETWORK
const NUM_TOKENS = 10
const proof = [
    require('../zokrates/code/square/proof'),
    require('../zokrates/code/square/proof'),
    require('../zokrates/code/square/proof'),
    require('../zokrates/code/square/proof'),
    require('../zokrates/code/square/proof'),
    require('../zokrates/code/square/proof'),
    require('../zokrates/code/square/proof'),
    require('../zokrates/code/square/proof'),
    require('../zokrates/code/square/proof'),
    require('../zokrates/code/square/proof'),
    ];
const CONTRACT_FILE = {
    "contractName": "SoInSquareVerifier",
    "abi": [
      {
        "constant": true,
        "inputs": [
          {
            "name": "interfaceId",
            "type": "bytes4"
          }
        ],
        "name": "supportsInterface",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "getApproved",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "to",
            "type": "address"
          },
          {
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "isPaused",
            "type": "bool"
          }
        ],
        "name": "setPaused",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "from",
            "type": "address"
          },
          {
            "name": "to",
            "type": "address"
          },
          {
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "transferFrom",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_myid",
            "type": "bytes32"
          },
          {
            "name": "_result",
            "type": "string"
          }
        ],
        "name": "__callback",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "owner",
            "type": "address"
          },
          {
            "name": "index",
            "type": "uint256"
          }
        ],
        "name": "tokenOfOwnerByIndex",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_myid",
            "type": "bytes32"
          },
          {
            "name": "_result",
            "type": "string"
          },
          {
            "name": "_proof",
            "type": "bytes"
          }
        ],
        "name": "__callback",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "to",
            "type": "address"
          },
          {
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "mint",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "from",
            "type": "address"
          },
          {
            "name": "to",
            "type": "address"
          },
          {
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "index",
            "type": "uint256"
          }
        ],
        "name": "tokenByIndex",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "ownerOf",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getOwner",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "to",
            "type": "address"
          },
          {
            "name": "approved",
            "type": "bool"
          }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "from",
            "type": "address"
          },
          {
            "name": "to",
            "type": "address"
          },
          {
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "name": "_data",
            "type": "bytes"
          }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "tokenURI",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "baseTokenURI",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "owner",
            "type": "address"
          },
          {
            "name": "operator",
            "type": "address"
          }
        ],
        "name": "isApprovedForAll",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "name": "theAddress",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "newSolution",
            "type": "address"
          }
        ],
        "name": "addSolution",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "to",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "approved",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "Approval",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "operator",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "approved",
            "type": "bool"
          }
        ],
        "name": "ApprovalForAll",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "addr",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "Paused",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "addr",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "Unpaused",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "addr",
            "type": "address"
          }
        ],
        "name": "changedOwnership",
        "type": "event"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "newAddress",
            "type": "address"
          },
          {
            "name": "solutionId",
            "type": "uint256"
          },
          {
            "name": "a",
            "type": "uint256[2]"
          },
          {
            "name": "b",
            "type": "uint256[2][2]"
          },
          {
            "name": "c",
            "type": "uint256[2]"
          },
          {
            "name": "input",
            "type": "uint256[2]"
          }
        ],
        "name": "addNewSolution",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getSolutionsAdded",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getTokensMinted",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "a",
            "type": "uint256[2]"
          },
          {
            "name": "b",
            "type": "uint256[2][2]"
          },
          {
            "name": "c",
            "type": "uint256[2]"
          },
          {
            "name": "input",
            "type": "uint256[2]"
          },
          {
            "name": "newAddress",
            "type": "address"
          },
          {
            "name": "newId",
            "type": "uint256"
          }
        ],
        "name": "mintNFT",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ],
    "metadata": "{\"compiler\":{\"version\":\"0.5.5+commit.47a71e8f\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"constant\":true,\"inputs\":[{\"name\":\"interfaceId\",\"type\":\"bytes4\"}],\"name\":\"supportsInterface\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"name\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"getApproved\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"to\",\"type\":\"address\"},{\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"approve\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"isPaused\",\"type\":\"bool\"}],\"name\":\"setPaused\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"totalSupply\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"from\",\"type\":\"address\"},{\"name\":\"to\",\"type\":\"address\"},{\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"transferFrom\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_myid\",\"type\":\"bytes32\"},{\"name\":\"_result\",\"type\":\"string\"}],\"name\":\"__callback\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"owner\",\"type\":\"address\"},{\"name\":\"index\",\"type\":\"uint256\"}],\"name\":\"tokenOfOwnerByIndex\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_myid\",\"type\":\"bytes32\"},{\"name\":\"_result\",\"type\":\"string\"},{\"name\":\"_proof\",\"type\":\"bytes\"}],\"name\":\"__callback\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"to\",\"type\":\"address\"},{\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"mint\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"from\",\"type\":\"address\"},{\"name\":\"to\",\"type\":\"address\"},{\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"safeTransferFrom\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"getSolutionsAdded\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"index\",\"type\":\"uint256\"}],\"name\":\"tokenByIndex\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"ownerOf\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"a\",\"type\":\"uint256[2]\"},{\"name\":\"b\",\"type\":\"uint256[2][2]\"},{\"name\":\"c\",\"type\":\"uint256[2]\"},{\"name\":\"input\",\"type\":\"uint256[2]\"},{\"name\":\"newAddress\",\"type\":\"address\"},{\"name\":\"newId\",\"type\":\"uint256\"}],\"name\":\"mintNFT\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"getOwner\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"symbol\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"to\",\"type\":\"address\"},{\"name\":\"approved\",\"type\":\"bool\"}],\"name\":\"setApprovalForAll\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"newAddress\",\"type\":\"address\"},{\"name\":\"solutionId\",\"type\":\"uint256\"},{\"name\":\"a\",\"type\":\"uint256[2]\"},{\"name\":\"b\",\"type\":\"uint256[2][2]\"},{\"name\":\"c\",\"type\":\"uint256[2]\"},{\"name\":\"input\",\"type\":\"uint256[2]\"}],\"name\":\"addNewSolution\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"from\",\"type\":\"address\"},{\"name\":\"to\",\"type\":\"address\"},{\"name\":\"tokenId\",\"type\":\"uint256\"},{\"name\":\"_data\",\"type\":\"bytes\"}],\"name\":\"safeTransferFrom\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"tokenURI\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"baseTokenURI\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"getTokensMinted\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"owner\",\"type\":\"address\"},{\"name\":\"operator\",\"type\":\"address\"}],\"name\":\"isApprovedForAll\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"name\":\"theAddress\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"newSolution\",\"type\":\"address\"}],\"name\":\"addSolution\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"to\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"approved\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"Approval\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"operator\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"approved\",\"type\":\"bool\"}],\"name\":\"ApprovalForAll\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"addr\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"Paused\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"addr\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"Unpaused\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"addr\",\"type\":\"address\"}],\"name\":\"changedOwnership\",\"type\":\"event\"}],\"devdoc\":{\"methods\":{\"isApprovedForAll(address,address)\":{\"details\":\"Tells whether an operator is approved by a given owner\\r\",\"params\":{\"operator\":\"operator address which you want to query the approval of\\r\",\"owner\":\"owner address which you want to query the approval of\\r\"},\"return\":\"bool whether the given operator is approved by the given owner\\r\"},\"setApprovalForAll(address,bool)\":{\"details\":\"Sets or unsets the approval of a given operator\\r An operator is allowed to transfer all tokens of the sender on their behalf\\r\",\"params\":{\"approved\":\"representing the status of the approval to be set\\r\",\"to\":\"operator address to set the approval\\r\"}},\"supportsInterface(bytes4)\":{\"details\":\"implement supportsInterface(bytes4) using a lookup table\\r\"},\"tokenByIndex(uint256)\":{\"details\":\"Gets the token ID at a given index of all the tokens in this contract\\r Reverts if the index is greater or equal to the total number of tokens\\r\",\"params\":{\"index\":\"uint256 representing the index to be accessed of the tokens list\\r\"},\"return\":\"uint256 token ID at the given index of the tokens list\\r\"},\"tokenOfOwnerByIndex(address,uint256)\":{\"details\":\"Gets the token ID at a given index of the tokens list of the requested owner\\r\",\"params\":{\"index\":\"uint256 representing the index to be accessed of the requested tokens list\\r\",\"owner\":\"address owning the tokens list to be accessed\\r\"},\"return\":\"uint256 token ID at the given index of the tokens list owned by the requested address\\r\"},\"totalSupply()\":{\"details\":\"Gets the total amount of tokens stored by the contract\\r\",\"return\":\"uint256 representing the total amount of tokens\\r\"}}},\"userdoc\":{\"methods\":{}}},\"settings\":{\"compilationTarget\":{\"/C/Users/jb7741/Downloads/udacity/Blockchain-Capstone/eth-contracts/contracts/SolnSquareVerifier.sol\":\"SoInSquareVerifier\"},\"evmVersion\":\"constantinople\",\"libraries\":{},\"optimizer\":{\"enabled\":false,\"runs\":200},\"remappings\":[]},\"sources\":{\"/C/Users/jb7741/Downloads/udacity/Blockchain-Capstone/eth-contracts/contracts/ERC721Mintable.sol\":{\"keccak256\":\"0xc488d149fa4b8c41318b057e1bd1cdae4ccebccb99960625ed668422d5b679eb\",\"urls\":[\"bzzr://aa4eb668351d01900e09d63743e983c29ffb62db2c87eb72c3470621893186f6\"]},\"/C/Users/jb7741/Downloads/udacity/Blockchain-Capstone/eth-contracts/contracts/Oraclize.sol\":{\"keccak256\":\"0xc38194ed2d1a36907876f5836db0fd286125a56df657a2a28a3a5967b7d2b2a0\",\"urls\":[\"bzzr://80c5d5ebe0b16d0230061758ed8ae5141e2f3dd14cbe7175b4722a702ea7fdd7\"]},\"/C/Users/jb7741/Downloads/udacity/Blockchain-Capstone/eth-contracts/contracts/SolnSquareVerifier.sol\":{\"keccak256\":\"0xcc2d4646b102828f2b5873a093a95c36cb4a2feee6117d64de25cb131b2bf577\",\"urls\":[\"bzzr://af90369d898296c4e210db1e539f0c4f3bf25053f53cd6977c5e5808fad3a3a1\"]},\"/C/Users/jb7741/Downloads/udacity/Blockchain-Capstone/eth-contracts/contracts/Verifier.sol\":{\"keccak256\":\"0x31431bdd022edea7558dc8057f50326972f95dbe346e795861fe1d4a1194c7eb\",\"urls\":[\"bzzr://c37d972ec0e8e19bb0c51cd121151d50973b4267879c917457cc4de59ad52c83\"]},\"openzeppelin-solidity/contracts/drafts/Counters.sol\":{\"keccak256\":\"0x5be8533c5950173dc2b77b75108fae6e6c5449aedadde3385ba457394aad2384\",\"urls\":[\"bzzr://8ab3b1e3d023aafb8a2d127de323b74567084e821b955b5f543e67fe964b1a6b\"]},\"openzeppelin-solidity/contracts/math/SafeMath.sol\":{\"keccak256\":\"0x640b6dee7a4b830bdfd52b5031a07fc2b12209f5b2e29e5d364a7d37f69d8076\",\"urls\":[\"bzzr://292843005e754e752644f767477ec5ad7a1ffc91ddb18c38b8079c62f3993cad\"]},\"openzeppelin-solidity/contracts/token/ERC721/IERC721Receiver.sol\":{\"keccak256\":\"0x042048c375daca04b31e31c91bbae912b84b5eb818c4e31b2deb530fd2305342\",\"urls\":[\"bzzr://2f8b9c142d30b43eab7b77dbcc632a51987eeb62371777d765e9311c0b3c4c13\"]},\"openzeppelin-solidity/contracts/utils/Address.sol\":{\"keccak256\":\"0x1a8e5072509c5ea7365eb1d48030b9be865140c8fb779968da0a459a0e174a11\",\"urls\":[\"bzzr://4e1d23731da27602b8c552e54fb9976dadf8cf46a8f90a3c8c1b85fe044618b9\"]}},\"version\":1}",
    "bytecode": "0x60806040523480156200001157600080fd5b5060405160208062003f2b833981018060405260208110156200003357600080fd5b81019080805190602001909291905050506040518060400160405280600881526020017f43617073746f6e650000000000000000000000000000000000000000000000008152506040518060400160405280600781526020017f4341505053544e000000000000000000000000000000000000000000000000008152506040518060600160405280603f815260200162003eec603f9139336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507fbfaea6a5831818a14c642eaa23c5eed274ba1be3f18b642b251f57862fe9e2ec33604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a160008060146101000a81548160ff0219169083151502179055506200019f6301ffc9a760e01b6200028d60201b60201c565b620001b76380ac58cd60e01b6200028d60201b60201c565b620001cf63780e9d6360e01b6200028d60201b60201c565b82600f9080519060200190620001e79291906200032f565b508160109080519060200190620002009291906200032f565b508060119080519060200190620002199291906200032f565b5062000232635b5e139f60e01b6200028d60201b60201c565b5050506000601481905550600060158190555080601360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050620003de565b63ffffffff60e01b817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614151515620002c357600080fd5b6001806000837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200037257805160ff1916838001178555620003a3565b82800160010185558215620003a3579182015b82811115620003a257825182559160200191906001019062000385565b5b509050620003b29190620003b6565b5090565b620003db91905b80821115620003d7576000816000905550600101620003bd565b5090565b90565b613afe80620003ee6000396000f3fe608060405234801561001057600080fd5b50600436106101a95760003560e01c80634f6ccce7116100f9578063a4b601b111610097578063d547cfb711610071578063d547cfb714610e6a578063d69f6bae14610eed578063e985e9c514610f0b578063f2fde38b14610f87576101a9565b8063a4b601b114610b33578063b88d4fde14610cbe578063c87b56dd14610dc3576101a9565b80637b112aa0116100d35780637b112aa01461088b578063893d20e814610a1657806395d89b4114610a60578063a22cb46514610ae3576101a9565b80634f6ccce7146107835780636352211e146107c557806370a0823114610833576101a9565b806323b872dd1161016657806338bbfa501161014057806338bbfa501461053557806340c10f191461069157806342842e0e146106f75780634868bd1914610765576101a9565b806323b872dd146103a057806327dc297e1461040e5780632f745c59146104d3576101a9565b806301ffc9a7146101ae57806306fdde0314610213578063081812fc14610296578063095ea7b31461030457806316c38b3c1461035257806318160ddd14610382575b600080fd5b6101f9600480360360208110156101c457600080fd5b8101908080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19169060200190929190505050610fcb565b604051808215151515815260200191505060405180910390f35b61021b611033565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561025b578082015181840152602081019050610240565b50505050905090810190601f1680156102885780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102c2600480360360208110156102ac57600080fd5b81019080803590602001909291905050506110d5565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6103506004803603604081101561031a57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611219565b005b6103806004803603602081101561036857600080fd5b810190808035151590602001909291905050506114ec565b005b61038a6115cd565b6040518082815260200191505060405180910390f35b61040c600480360360608110156103b657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506115da565b005b6104d16004803603604081101561042457600080fd5b81019080803590602001909291908035906020019064010000000081111561044b57600080fd5b82018360208201111561045d57600080fd5b8035906020019184600183028401116401000000008311171561047f57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506116f3565b005b61051f600480360360408110156104e957600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611736565b6040518082815260200191505060405180910390f35b61068f6004803603606081101561054b57600080fd5b81019080803590602001909291908035906020019064010000000081111561057257600080fd5b82018360208201111561058457600080fd5b803590602001918460018302840111640100000000831117156105a657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561060957600080fd5b82018360208201111561061b57600080fd5b8035906020019184600183028401116401000000008311171561063d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506117ad565b005b6106dd600480360360408110156106a757600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506117b2565b604051808215151515815260200191505060405180910390f35b6107636004803603606081101561070d57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611895565b005b61076d611940565b6040518082815260200191505060405180910390f35b6107af6004803603602081101561079957600080fd5b810190808035906020019092919050505061194a565b6040518082815260200191505060405180910390f35b6107f1600480360360208110156107db57600080fd5b8101908080359060200190929190505050611982565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6108756004803603602081101561084957600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611a49565b6040518082815260200191505060405180910390f35b610a1460048036036101808110156108a257600080fd5b8101908080604001906002806020026040519081016040528092919082600260200280828437600081840152601f19601f82011690508083019250505050505091929192908060800190600280602002604051908101604052809291906000905b82821015610957578382604002016002806020026040519081016040528092919082600260200280828437600081840152601f19601f82011690508083019250505050505081526020019060010190610903565b50505050919291929080604001906002806020026040519081016040528092919082600260200280828437600081840152601f19601f820116905080830192505050505050919291929080604001906002806020026040519081016040528092919082600260200280828437600081840152601f19601f8201169050808301925050505050509192919290803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611b23565b005b610a1e611d36565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610a68611d5f565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610aa8578082015181840152602081019050610a8d565b50505050905090810190601f168015610ad55780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610b3160048036036040811015610af957600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803515159060200190929190505050611e01565b005b610cbc6004803603610180811015610b4a57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919080604001906002806020026040519081016040528092919082600260200280828437600081840152601f19601f82011690508083019250505050505091929192908060800190600280602002604051908101604052809291906000905b82821015610c29578382604002016002806020026040519081016040528092919082600260200280828437600081840152601f19601f82011690508083019250505050505081526020019060010190610bd5565b50505050919291929080604001906002806020026040519081016040528092919082600260200280828437600081840152601f19601f820116905080830192505050505050919291929080604001906002806020026040519081016040528092919082600260200280828437600081840152601f19601f8201169050808301925050505050509192919290505050611fc8565b005b610dc160048036036080811015610cd457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919080359060200190640100000000811115610d3b57600080fd5b820183602082011115610d4d57600080fd5b80359060200191846001830284011164010000000083111715610d6f57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506120e7565b005b610def60048036036020811015610dd957600080fd5b810190808035906020019092919050505061219a565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610e2f578082015181840152602081019050610e14565b50505050905090810190601f168015610e5c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610e726122cc565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610eb2578082015181840152602081019050610e97565b50505050905090810190601f168015610edf5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610ef561236e565b6040518082815260200191505060405180910390f35b610f6d60048036036040811015610f2157600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050612378565b604051808215151515815260200191505060405180910390f35b610fc960048036036020811015610f9d57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050612496565b005b600060016000837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060009054906101000a900460ff169050919050565b6060600f8054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156110cb5780601f106110a0576101008083540402835291602001916110cb565b820191906000526020600020905b8154815290600101906020018083116110ae57829003601f168201915b5050505050905090565b6000801515600060149054906101000a900460ff161515141515611161576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f436f6e7472616374206d757374206e6f7420626520706175736564000000000081525060200191505060405180910390fd5b61116a826126a3565b15156111de576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260148152602001807f746f6b656e20646f6573206e6f7420657869737400000000000000000000000081525060200191505060405180910390fd5b6003600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60001515600060149054906101000a900460ff1615151415156112a4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f436f6e7472616374206d757374206e6f7420626520706175736564000000000081525060200191505060405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff166002600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415151561135e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526031815260200180613aa26031913960400191505060405180910390fd5b611366611d36565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515611408576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601d8152602001807f73656e646572206d75737420626520636f6e7472616374206f776e657200000081525060200191505060405180910390fd5b816003600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff166002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156115b0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260198152602001807f4f6e6c7920746865206f776e657220697320616c6c6f7765640000000000000081525060200191505060405180910390fd5b80600060146101000a81548160ff02191690831515021790555050565b6000600880549050905090565b60001515600060149054906101000a900460ff161515141515611665576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f436f6e7472616374206d757374206e6f7420626520706175736564000000000081525060200191505060405180910390fd5b61166f8382612715565b15156116e3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600f8152602001807f6973206e6f7420617070726f766564000000000000000000000000000000000081525060200191505060405180910390fd5b6116ee8383836127aa565b505050565b611732828260006040519080825280601f01601f19166020018201604052801561172c5781602001600182028038833980820191505090505b506117ad565b5050565b600061174183611a49565b8210151561174e57600080fd5b600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208281548110151561179a57fe5b9060005260206000200154905092915050565b505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515611878576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260198152602001807f4f6e6c7920746865206f776e657220697320616c6c6f7765640000000000000081525060200191505060405180910390fd5b61188283836127ce565b61188b826127ef565b6001905092915050565b60001515600060149054906101000a900460ff161515141515611920576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f436f6e7472616374206d757374206e6f7420626520706175736564000000000081525060200191505060405180910390fd5b61193b838383604051806020016040528060008152506120e7565b505050565b6000601454905090565b60006119546115cd565b8210151561196157600080fd5b60088281548110151561197057fe5b90600052602060002001549050919050565b6000801515600060149054906101000a900460ff161515141515611a0e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f436f6e7472616374206d757374206e6f7420626520706175736564000000000081525060200191505060405180910390fd5b6002600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6000801515600060149054906101000a900460ff161515141515611ad5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f436f6e7472616374206d757374206e6f7420626520706175736564000000000081525060200191505060405180910390fd5b611b1c600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020612942565b9050919050565b6000868686866040516020018085600260200280838360005b83811015611b57578082015181840152602081019050611b3c565b505050509050018460026000925b81841015611bab5782846020020151600260200280838360005b83811015611b9a578082015181840152602081019050611b7f565b505050509050019260010192611b65565b9250505083600260200280838360005b83811015611bd6578082015181840152602081019050611bbb565b5050505090500182600260200280838360005b83811015611c04578082015181840152602081019050611be9565b50505050905001945050505050604051602081830303815290604052805190602001209050600073ffffffffffffffffffffffffffffffffffffffff166016600083815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515611d03576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260178152602001807f736f6c7574696f6e20616c72656164792065786973747300000000000000000081525060200191505060405180910390fd5b611d11838389898989611fc8565b611d1b83836117b2565b50600160156000828254019250508190555050505050505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b606060108054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015611df75780601f10611dcc57610100808354040283529160200191611df7565b820191906000526020600020905b815481529060010190602001808311611dda57829003601f168201915b5050505050905090565b60001515600060149054906101000a900460ff161515141515611e8c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f436f6e7472616374206d757374206e6f7420626520706175736564000000000081525060200191505060405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614151515611ec757600080fd5b80600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051808215151515815260200191505060405180910390a35050565b6000611fd685858585612950565b905060405180604001604052808781526020018873ffffffffffffffffffffffffffffffffffffffff16815250601660008381526020019081526020016000206000820151816000015560208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555090505060016014600082825401925050819055507f832e169522ce4784adfa242eb30432606742d59c8efed729c7973be828a60c6d87604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a150505050505050565b60001515600060149054906101000a900460ff161515141515612172576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f436f6e7472616374206d757374206e6f7420626520706175736564000000000081525060200191505060405180910390fd5b61217d8484846115da565b61218984848484612a5e565b151561219457600080fd5b50505050565b60606121a5826126a3565b1515612219576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260148152602001807f746f6b656e20646f6573206e6f7420657869737400000000000000000000000081525060200191505060405180910390fd5b601260008381526020019081526020016000208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156122c05780601f10612295576101008083540402835291602001916122c0565b820191906000526020600020905b8154815290600101906020018083116122a357829003601f168201915b50505050509050919050565b606060118054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156123645780601f1061233957610100808354040283529160200191612364565b820191906000526020600020905b81548152906001019060200180831161234757829003601f168201915b5050505050905090565b6000601554905090565b6000801515600060149054906101000a900460ff161515141515612404576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f436f6e7472616374206d757374206e6f7420626520706175736564000000000081525060200191505060405180910390fd5b600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561255a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260198152602001807f4f6e6c7920746865206f776e657220697320616c6c6f7765640000000000000081525060200191505060405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415156125fd576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600f8152602001807f496e76616c69642061646472657373000000000000000000000000000000000081525060200191505060405180910390fd5b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507fbfaea6a5831818a14c642eaa23c5eed274ba1be3f18b642b251f57862fe9e2ec81604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a150565b6000806002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415915050919050565b60008061272183611982565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16148061279057508373ffffffffffffffffffffffffffffffffffffffff16612778846110d5565b73ffffffffffffffffffffffffffffffffffffffff16145b806127a157506127a08185612378565b5b91505092915050565b6127b5838383612c49565b6127bf8382612f0f565b6127c982826130b3565b505050565b6127d8828261317a565b6127e282826130b3565b6127eb81613396565b5050565b6127f8816126a3565b151561286c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260138152602001807f746f6b656e206973206e6f74206578697374210000000000000000000000000081525060200191505060405180910390fd5b61291860118054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156129055780601f106128da57610100808354040283529160200191612905565b820191906000526020600020905b8154815290600101906020018083116128e857829003601f168201915b5050505050612913836133e2565b61351c565b60126000838152602001908152602001600020908051906020019061293e9291906139d0565b5050565b600081600001549050919050565b6000848484846040516020018085600260200280838360005b83811015612984578082015181840152602081019050612969565b505050509050018460026000925b818410156129d85782846020020151600260200280838360005b838110156129c75780820151818401526020810190506129ac565b505050509050019260010192612992565b9250505083600260200280838360005b83811015612a035780820151818401526020810190506129e8565b5050505090500182600260200280838360005b83811015612a31578082015181840152602081019050612a16565b50505050905001945050505050604051602081830303815290604052805190602001209050949350505050565b6000612a7f8473ffffffffffffffffffffffffffffffffffffffff16613560565b1515612a8e5760019050612c41565b60008473ffffffffffffffffffffffffffffffffffffffff1663150b7a02338887876040518563ffffffff1660e01b8152600401808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b83811015612b69578082015181840152602081019050612b4e565b50505050905090810190601f168015612b965780820380516001836020036101000a031916815260200191505b5095505050505050602060405180830381600087803b158015612bb857600080fd5b505af1158015612bcc573d6000803e3d6000fd5b505050506040513d6020811015612be257600080fd5b8101908080519060200190929190505050905063150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149150505b949350505050565b8273ffffffffffffffffffffffffffffffffffffffff16612c6982611982565b73ffffffffffffffffffffffffffffffffffffffff16141515612cf4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f546f6b656e20646f6573206e6f742062656c6f6e6720746f206164647265737381525060200191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614151515612d99576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260128152602001807f4164647265737320697320696e76616c6964000000000000000000000000000081525060200191505060405180910390fd5b6003600082815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055612e16600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206135ab565b612e5d600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206135ce565b816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4505050565b6000612f676001600660008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805490506135e490919063ffffffff16565b9050600060076000848152602001908152602001600020549050818114151561305a576000600660008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002083815481101515612fd857fe5b9060005260206000200154905080600660008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208381548110151561303257fe5b9060005260206000200181905550816007600083815260200190815260200160002081905550505b600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208054809190600190036130ac9190613a50565b5050505050565b600660008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805490506007600083815260200190815260200160002081905550600660008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190806001815401808255809150509060018203906000526020600020016000909192909190915055505050565b613183816126a3565b1515156131f8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260148152602001807f546f6b656e20616c72656164792065786973747300000000000000000000000081525060200191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415151561329d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260168152602001807f546865206164647265737320697320696e76616c69640000000000000000000081525060200191505060405180910390fd5b816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550613336600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206135ce565b808273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a45050565b6008805490506009600083815260200190815260200160002081905550600881908060018154018082558091505090600182039060005260206000200160009091929091909150555050565b6060600082141561342a576040518060400160405280600181526020017f30000000000000000000000000000000000000000000000000000000000000008152509050613517565b600082905060005b600082141515613458578080600101915050600a8281151561345057fe5b049150613432565b6060816040519080825280601f01601f19166020018201604052801561348d5781602001600182028038833980820191505090505b50905060006001830390505b60008614151561350f57600a868115156134af57fe5b0660300160f81b8282806001900393508151811015156134cb57fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600a8681151561350757fe5b049550613499565b819450505050505b919050565b6060613558838360405180602001604052806000815250604051806020016040528060008152506040518060200160405280600081525061362e565b905092915050565b60008060007fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a47060001b9050833f91508082141580156135a257506000801b8214155b92505050919050565b6135c3600182600001546135e490919063ffffffff16565b816000018190555050565b6001816000016000828254019250508190555050565b600061362683836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f77000081525061390e565b905092915050565b6060808690506060869050606086905060608690506060869050606081518351855187518951010101016040519080825280601f01601f19166020018201604052801561368a5781602001600182028038833980820191505090505b509050606081905060008090506000809050600090505b88518110156137155788818151811015156136b857fe5b90602001015160f81c60f81b83838060010194508151811015156136d857fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535080806001019150506136a1565b600090505b875181101561378e57878181518110151561373157fe5b90602001015160f81c60f81b838380600101945081518110151561375157fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350808060010191505061371a565b600090505b86518110156138075786818151811015156137aa57fe5b90602001015160f81c60f81b83838060010194508151811015156137ca57fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053508080600101915050613793565b600090505b855181101561388057858181518110151561382357fe5b90602001015160f81c60f81b838380600101945081518110151561384357fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350808060010191505061380c565b600090505b84518110156138f957848181518110151561389c57fe5b90602001015160f81c60f81b83838060010194508151811015156138bc57fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053508080600101915050613885565b82995050505050505050505095945050505050565b600083831115829015156139bd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015613982578082015181840152602081019050613967565b50505050905090810190601f1680156139af5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5060008385039050809150509392505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10613a1157805160ff1916838001178555613a3f565b82800160010185558215613a3f579182015b82811115613a3e578251825591602001919060010190613a23565b5b509050613a4c9190613a7c565b5090565b815481835581811115613a7757818360005260206000209182019101613a769190613a7c565b5b505050565b613a9e91905b80821115613a9a576000816000905550600101613a82565b5090565b9056fe4164647265737320746f206265207472616e7366657272656420746f20697320616c726561647920746865206f776e6572a165627a7a7230582010a08260ed024e88f30d3502d058f8519992dbeb15e5c4dec46bd7915e7ce05b002968747470733a2f2f73332d75732d776573742d322e616d617a6f6e6177732e636f6d2f756461636974792d626c6f636b636861696e2f63617073746f6e652f",
    "deployedBytecode": "0x608060405234801561001057600080fd5b50600436106101a95760003560e01c80634f6ccce7116100f9578063a4b601b111610097578063d547cfb711610071578063d547cfb714610e6a578063d69f6bae14610eed578063e985e9c514610f0b578063f2fde38b14610f87576101a9565b8063a4b601b114610b33578063b88d4fde14610cbe578063c87b56dd14610dc3576101a9565b80637b112aa0116100d35780637b112aa01461088b578063893d20e814610a1657806395d89b4114610a60578063a22cb46514610ae3576101a9565b80634f6ccce7146107835780636352211e146107c557806370a0823114610833576101a9565b806323b872dd1161016657806338bbfa501161014057806338bbfa501461053557806340c10f191461069157806342842e0e146106f75780634868bd1914610765576101a9565b806323b872dd146103a057806327dc297e1461040e5780632f745c59146104d3576101a9565b806301ffc9a7146101ae57806306fdde0314610213578063081812fc14610296578063095ea7b31461030457806316c38b3c1461035257806318160ddd14610382575b600080fd5b6101f9600480360360208110156101c457600080fd5b8101908080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19169060200190929190505050610fcb565b604051808215151515815260200191505060405180910390f35b61021b611033565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561025b578082015181840152602081019050610240565b50505050905090810190601f1680156102885780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102c2600480360360208110156102ac57600080fd5b81019080803590602001909291905050506110d5565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6103506004803603604081101561031a57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611219565b005b6103806004803603602081101561036857600080fd5b810190808035151590602001909291905050506114ec565b005b61038a6115cd565b6040518082815260200191505060405180910390f35b61040c600480360360608110156103b657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506115da565b005b6104d16004803603604081101561042457600080fd5b81019080803590602001909291908035906020019064010000000081111561044b57600080fd5b82018360208201111561045d57600080fd5b8035906020019184600183028401116401000000008311171561047f57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506116f3565b005b61051f600480360360408110156104e957600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611736565b6040518082815260200191505060405180910390f35b61068f6004803603606081101561054b57600080fd5b81019080803590602001909291908035906020019064010000000081111561057257600080fd5b82018360208201111561058457600080fd5b803590602001918460018302840111640100000000831117156105a657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561060957600080fd5b82018360208201111561061b57600080fd5b8035906020019184600183028401116401000000008311171561063d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506117ad565b005b6106dd600480360360408110156106a757600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506117b2565b604051808215151515815260200191505060405180910390f35b6107636004803603606081101561070d57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611895565b005b61076d611940565b6040518082815260200191505060405180910390f35b6107af6004803603602081101561079957600080fd5b810190808035906020019092919050505061194a565b6040518082815260200191505060405180910390f35b6107f1600480360360208110156107db57600080fd5b8101908080359060200190929190505050611982565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6108756004803603602081101561084957600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611a49565b6040518082815260200191505060405180910390f35b610a1460048036036101808110156108a257600080fd5b8101908080604001906002806020026040519081016040528092919082600260200280828437600081840152601f19601f82011690508083019250505050505091929192908060800190600280602002604051908101604052809291906000905b82821015610957578382604002016002806020026040519081016040528092919082600260200280828437600081840152601f19601f82011690508083019250505050505081526020019060010190610903565b50505050919291929080604001906002806020026040519081016040528092919082600260200280828437600081840152601f19601f820116905080830192505050505050919291929080604001906002806020026040519081016040528092919082600260200280828437600081840152601f19601f8201169050808301925050505050509192919290803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611b23565b005b610a1e611d36565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610a68611d5f565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610aa8578082015181840152602081019050610a8d565b50505050905090810190601f168015610ad55780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610b3160048036036040811015610af957600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803515159060200190929190505050611e01565b005b610cbc6004803603610180811015610b4a57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919080604001906002806020026040519081016040528092919082600260200280828437600081840152601f19601f82011690508083019250505050505091929192908060800190600280602002604051908101604052809291906000905b82821015610c29578382604002016002806020026040519081016040528092919082600260200280828437600081840152601f19601f82011690508083019250505050505081526020019060010190610bd5565b50505050919291929080604001906002806020026040519081016040528092919082600260200280828437600081840152601f19601f820116905080830192505050505050919291929080604001906002806020026040519081016040528092919082600260200280828437600081840152601f19601f8201169050808301925050505050509192919290505050611fc8565b005b610dc160048036036080811015610cd457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919080359060200190640100000000811115610d3b57600080fd5b820183602082011115610d4d57600080fd5b80359060200191846001830284011164010000000083111715610d6f57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506120e7565b005b610def60048036036020811015610dd957600080fd5b810190808035906020019092919050505061219a565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610e2f578082015181840152602081019050610e14565b50505050905090810190601f168015610e5c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610e726122cc565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610eb2578082015181840152602081019050610e97565b50505050905090810190601f168015610edf5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610ef561236e565b6040518082815260200191505060405180910390f35b610f6d60048036036040811015610f2157600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050612378565b604051808215151515815260200191505060405180910390f35b610fc960048036036020811015610f9d57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050612496565b005b600060016000837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060009054906101000a900460ff169050919050565b6060600f8054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156110cb5780601f106110a0576101008083540402835291602001916110cb565b820191906000526020600020905b8154815290600101906020018083116110ae57829003601f168201915b5050505050905090565b6000801515600060149054906101000a900460ff161515141515611161576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f436f6e7472616374206d757374206e6f7420626520706175736564000000000081525060200191505060405180910390fd5b61116a826126a3565b15156111de576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260148152602001807f746f6b656e20646f6573206e6f7420657869737400000000000000000000000081525060200191505060405180910390fd5b6003600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60001515600060149054906101000a900460ff1615151415156112a4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f436f6e7472616374206d757374206e6f7420626520706175736564000000000081525060200191505060405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff166002600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415151561135e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526031815260200180613aa26031913960400191505060405180910390fd5b611366611d36565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515611408576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601d8152602001807f73656e646572206d75737420626520636f6e7472616374206f776e657200000081525060200191505060405180910390fd5b816003600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff166002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156115b0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260198152602001807f4f6e6c7920746865206f776e657220697320616c6c6f7765640000000000000081525060200191505060405180910390fd5b80600060146101000a81548160ff02191690831515021790555050565b6000600880549050905090565b60001515600060149054906101000a900460ff161515141515611665576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f436f6e7472616374206d757374206e6f7420626520706175736564000000000081525060200191505060405180910390fd5b61166f8382612715565b15156116e3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600f8152602001807f6973206e6f7420617070726f766564000000000000000000000000000000000081525060200191505060405180910390fd5b6116ee8383836127aa565b505050565b611732828260006040519080825280601f01601f19166020018201604052801561172c5781602001600182028038833980820191505090505b506117ad565b5050565b600061174183611a49565b8210151561174e57600080fd5b600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208281548110151561179a57fe5b9060005260206000200154905092915050565b505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515611878576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260198152602001807f4f6e6c7920746865206f776e657220697320616c6c6f7765640000000000000081525060200191505060405180910390fd5b61188283836127ce565b61188b826127ef565b6001905092915050565b60001515600060149054906101000a900460ff161515141515611920576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f436f6e7472616374206d757374206e6f7420626520706175736564000000000081525060200191505060405180910390fd5b61193b838383604051806020016040528060008152506120e7565b505050565b6000601454905090565b60006119546115cd565b8210151561196157600080fd5b60088281548110151561197057fe5b90600052602060002001549050919050565b6000801515600060149054906101000a900460ff161515141515611a0e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f436f6e7472616374206d757374206e6f7420626520706175736564000000000081525060200191505060405180910390fd5b6002600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6000801515600060149054906101000a900460ff161515141515611ad5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f436f6e7472616374206d757374206e6f7420626520706175736564000000000081525060200191505060405180910390fd5b611b1c600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020612942565b9050919050565b6000868686866040516020018085600260200280838360005b83811015611b57578082015181840152602081019050611b3c565b505050509050018460026000925b81841015611bab5782846020020151600260200280838360005b83811015611b9a578082015181840152602081019050611b7f565b505050509050019260010192611b65565b9250505083600260200280838360005b83811015611bd6578082015181840152602081019050611bbb565b5050505090500182600260200280838360005b83811015611c04578082015181840152602081019050611be9565b50505050905001945050505050604051602081830303815290604052805190602001209050600073ffffffffffffffffffffffffffffffffffffffff166016600083815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515611d03576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260178152602001807f736f6c7574696f6e20616c72656164792065786973747300000000000000000081525060200191505060405180910390fd5b611d11838389898989611fc8565b611d1b83836117b2565b50600160156000828254019250508190555050505050505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b606060108054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015611df75780601f10611dcc57610100808354040283529160200191611df7565b820191906000526020600020905b815481529060010190602001808311611dda57829003601f168201915b5050505050905090565b60001515600060149054906101000a900460ff161515141515611e8c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f436f6e7472616374206d757374206e6f7420626520706175736564000000000081525060200191505060405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614151515611ec757600080fd5b80600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051808215151515815260200191505060405180910390a35050565b6000611fd685858585612950565b905060405180604001604052808781526020018873ffffffffffffffffffffffffffffffffffffffff16815250601660008381526020019081526020016000206000820151816000015560208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555090505060016014600082825401925050819055507f832e169522ce4784adfa242eb30432606742d59c8efed729c7973be828a60c6d87604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a150505050505050565b60001515600060149054906101000a900460ff161515141515612172576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f436f6e7472616374206d757374206e6f7420626520706175736564000000000081525060200191505060405180910390fd5b61217d8484846115da565b61218984848484612a5e565b151561219457600080fd5b50505050565b60606121a5826126a3565b1515612219576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260148152602001807f746f6b656e20646f6573206e6f7420657869737400000000000000000000000081525060200191505060405180910390fd5b601260008381526020019081526020016000208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156122c05780601f10612295576101008083540402835291602001916122c0565b820191906000526020600020905b8154815290600101906020018083116122a357829003601f168201915b50505050509050919050565b606060118054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156123645780601f1061233957610100808354040283529160200191612364565b820191906000526020600020905b81548152906001019060200180831161234757829003601f168201915b5050505050905090565b6000601554905090565b6000801515600060149054906101000a900460ff161515141515612404576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f436f6e7472616374206d757374206e6f7420626520706175736564000000000081525060200191505060405180910390fd5b600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561255a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260198152602001807f4f6e6c7920746865206f776e657220697320616c6c6f7765640000000000000081525060200191505060405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415156125fd576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600f8152602001807f496e76616c69642061646472657373000000000000000000000000000000000081525060200191505060405180910390fd5b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507fbfaea6a5831818a14c642eaa23c5eed274ba1be3f18b642b251f57862fe9e2ec81604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a150565b6000806002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415915050919050565b60008061272183611982565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16148061279057508373ffffffffffffffffffffffffffffffffffffffff16612778846110d5565b73ffffffffffffffffffffffffffffffffffffffff16145b806127a157506127a08185612378565b5b91505092915050565b6127b5838383612c49565b6127bf8382612f0f565b6127c982826130b3565b505050565b6127d8828261317a565b6127e282826130b3565b6127eb81613396565b5050565b6127f8816126a3565b151561286c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260138152602001807f746f6b656e206973206e6f74206578697374210000000000000000000000000081525060200191505060405180910390fd5b61291860118054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156129055780601f106128da57610100808354040283529160200191612905565b820191906000526020600020905b8154815290600101906020018083116128e857829003601f168201915b5050505050612913836133e2565b61351c565b60126000838152602001908152602001600020908051906020019061293e9291906139d0565b5050565b600081600001549050919050565b6000848484846040516020018085600260200280838360005b83811015612984578082015181840152602081019050612969565b505050509050018460026000925b818410156129d85782846020020151600260200280838360005b838110156129c75780820151818401526020810190506129ac565b505050509050019260010192612992565b9250505083600260200280838360005b83811015612a035780820151818401526020810190506129e8565b5050505090500182600260200280838360005b83811015612a31578082015181840152602081019050612a16565b50505050905001945050505050604051602081830303815290604052805190602001209050949350505050565b6000612a7f8473ffffffffffffffffffffffffffffffffffffffff16613560565b1515612a8e5760019050612c41565b60008473ffffffffffffffffffffffffffffffffffffffff1663150b7a02338887876040518563ffffffff1660e01b8152600401808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b83811015612b69578082015181840152602081019050612b4e565b50505050905090810190601f168015612b965780820380516001836020036101000a031916815260200191505b5095505050505050602060405180830381600087803b158015612bb857600080fd5b505af1158015612bcc573d6000803e3d6000fd5b505050506040513d6020811015612be257600080fd5b8101908080519060200190929190505050905063150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149150505b949350505050565b8273ffffffffffffffffffffffffffffffffffffffff16612c6982611982565b73ffffffffffffffffffffffffffffffffffffffff16141515612cf4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f546f6b656e20646f6573206e6f742062656c6f6e6720746f206164647265737381525060200191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614151515612d99576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260128152602001807f4164647265737320697320696e76616c6964000000000000000000000000000081525060200191505060405180910390fd5b6003600082815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055612e16600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206135ab565b612e5d600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206135ce565b816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4505050565b6000612f676001600660008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805490506135e490919063ffffffff16565b9050600060076000848152602001908152602001600020549050818114151561305a576000600660008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002083815481101515612fd857fe5b9060005260206000200154905080600660008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208381548110151561303257fe5b9060005260206000200181905550816007600083815260200190815260200160002081905550505b600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208054809190600190036130ac9190613a50565b5050505050565b600660008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805490506007600083815260200190815260200160002081905550600660008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190806001815401808255809150509060018203906000526020600020016000909192909190915055505050565b613183816126a3565b1515156131f8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260148152602001807f546f6b656e20616c72656164792065786973747300000000000000000000000081525060200191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415151561329d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260168152602001807f546865206164647265737320697320696e76616c69640000000000000000000081525060200191505060405180910390fd5b816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550613336600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206135ce565b808273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a45050565b6008805490506009600083815260200190815260200160002081905550600881908060018154018082558091505090600182039060005260206000200160009091929091909150555050565b6060600082141561342a576040518060400160405280600181526020017f30000000000000000000000000000000000000000000000000000000000000008152509050613517565b600082905060005b600082141515613458578080600101915050600a8281151561345057fe5b049150613432565b6060816040519080825280601f01601f19166020018201604052801561348d5781602001600182028038833980820191505090505b50905060006001830390505b60008614151561350f57600a868115156134af57fe5b0660300160f81b8282806001900393508151811015156134cb57fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600a8681151561350757fe5b049550613499565b819450505050505b919050565b6060613558838360405180602001604052806000815250604051806020016040528060008152506040518060200160405280600081525061362e565b905092915050565b60008060007fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a47060001b9050833f91508082141580156135a257506000801b8214155b92505050919050565b6135c3600182600001546135e490919063ffffffff16565b816000018190555050565b6001816000016000828254019250508190555050565b600061362683836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f77000081525061390e565b905092915050565b6060808690506060869050606086905060608690506060869050606081518351855187518951010101016040519080825280601f01601f19166020018201604052801561368a5781602001600182028038833980820191505090505b509050606081905060008090506000809050600090505b88518110156137155788818151811015156136b857fe5b90602001015160f81c60f81b83838060010194508151811015156136d857fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535080806001019150506136a1565b600090505b875181101561378e57878181518110151561373157fe5b90602001015160f81c60f81b838380600101945081518110151561375157fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350808060010191505061371a565b600090505b86518110156138075786818151811015156137aa57fe5b90602001015160f81c60f81b83838060010194508151811015156137ca57fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053508080600101915050613793565b600090505b855181101561388057858181518110151561382357fe5b90602001015160f81c60f81b838380600101945081518110151561384357fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350808060010191505061380c565b600090505b84518110156138f957848181518110151561389c57fe5b90602001015160f81c60f81b83838060010194508151811015156138bc57fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053508080600101915050613885565b82995050505050505050505095945050505050565b600083831115829015156139bd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015613982578082015181840152602081019050613967565b50505050905090810190601f1680156139af5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5060008385039050809150509392505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10613a1157805160ff1916838001178555613a3f565b82800160010185558215613a3f579182015b82811115613a3e578251825591602001919060010190613a23565b5b509050613a4c9190613a7c565b5090565b815481835581811115613a7757818360005260206000209182019101613a769190613a7c565b5b505050565b613a9e91905b80821115613a9a576000816000905550600101613a82565b5090565b9056fe4164647265737320746f206265207472616e7366657272656420746f20697320616c726561647920746865206f776e6572a165627a7a7230582010a08260ed024e88f30d3502d058f8519992dbeb15e5c4dec46bd7915e7ce05b0029",
    "sourceMap": "208:2074:3:-;;;1477:150;8:9:-1;5:2;;;30:1;27;20:12;5:2;1477:150:3;;;;;;;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;1477:150:3;;;;;;;;;;;;;;;;20693:289:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;925:10;916:6;;:19;;;;;;;;;;;;;;;;;;951:28;968:10;951:28;;;;;;;;;;;;;;;;;;;;;;2247:5;2237:7;;:15;;;;;;;;;;;;;;;;;;3206:40;2787:10;3225:20;;3206:18;;;:40;;:::i;:::-;5406;5276:10;5425:20;;5406:18;;;:40;;:::i;:::-;13228:51;12821:10;13247:31;;13228:18;;;:51;;:::i;:::-;20844:4;20836:5;:12;;;;;;;;;;;;:::i;:::-;;20869:6;20859:7;:16;;;;;;;;;;;;:::i;:::-;;20902:12;20886:13;:28;;;;;;;;;;;;:::i;:::-;;20925:49;20495:10;20944:29;;20925:18;;;:49;;:::i;:::-;20693:289;;;1544:1:3;1528:13;:17;;;;1573:1;1556:14;:18;;;;1608:10;1585:11;;:34;;;;;;;;;;;;;;;;;;1477:150;208:2074;;3569:161:0;3660:10;3645:25;;:11;:25;;;;;3637:34;;;;;;;;3718:4;3682:20;:33;3703:11;3682:33;;;;;;;;;;;;;;;;;;:40;;;;;;;;;;;;;;;;;;3569:161;:::o;208:2074:3:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;",
    "deployedSourceMap": "208:2074:3:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;208:2074:3;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3350:135:0;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;3350:135:0;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;20990:84;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;20990:84:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;6666:243;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;6666:243:0;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;6028:630;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;6028:630:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;2622:88;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;2622:88:0;;;;;;;;;;;;;;;;;;;:::i;:::-;;14011:96;;;:::i;:::-;;;;;;;;;;;;;;;;;;;7937:210;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;7937:210:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;15167:124:2;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;15167:124:2;;;;;;;;;;;;;;;;;;;21:11:-1;8;5:28;2:2;;;46:1;43;36:12;2:2;15167:124:2;;35:9:-1;28:4;12:14;8:25;5:40;2:2;;;58:1;55;48:12;2:2;15167:124:2;;;;;;100:9:-1;95:1;81:12;77:20;67:8;63:35;60:50;39:11;25:12;22:29;11:107;8:2;;;131:1;128;121:12;8:2;15167:124:2;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;30:3:-1;22:6;14;1:33;99:1;93:3;85:6;81:16;74:27;137:4;133:9;126:4;121:3;117:14;113:30;106:37;;169:3;161:6;157:16;147:26;;15167:124:2;;;;;;;;;;;;;;;:::i;:::-;;13668:185:0;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;13668:185:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;15299:169:2;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;15299:169:2;;;;;;;;;;;;;;;;;;;21:11:-1;8;5:28;2:2;;;46:1;43;36:12;2:2;15299:169:2;;35:9:-1;28:4;12:14;8:25;5:40;2:2;;;58:1;55;48:12;2:2;15299:169:2;;;;;;100:9:-1;95:1;81:12;77:20;67:8;63:35;60:50;39:11;25:12;22:29;11:107;8:2;;;131:1;128;121:12;8:2;15299:169:2;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;30:3:-1;22:6;14;1:33;99:1;93:3;85:6;81:16;74:27;137:4;133:9;126:4;121:3;117:14;113:30;106:37;;169:3;161:6;157:16;147:26;;15299:169:2;;;;;;;;;;;;;;;;;21:11:-1;8;5:28;2:2;;;46:1;43;36:12;2:2;15299:169:2;;35:9:-1;28:4;12:14;8:25;5:40;2:2;;;58:1;55;48:12;2:2;15299:169:2;;;;;;100:9:-1;95:1;81:12;77:20;67:8;63:35;60:50;39:11;25:12;22:29;11:107;8:2;;;131:1;128;121:12;8:2;15299:169:2;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;30:3:-1;22:6;14;1:33;99:1;93:3;85:6;81:16;74:27;137:4;133:9;126:4;121:3;117:14;113:30;106:37;;169:3;161:6;157:16;147:26;;15299:169:2;;;;;;;;;;;;;;;:::i;:::-;;22385:185:0;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;22385:185:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;8155:147;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;8155:147:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;1009:97:3;;;:::i;:::-;;;;;;;;;;;;;;;;;;;14452:151:0;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;14452:151:0;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;5773:179;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;5773:179:0;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;5462:303;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;5462:303:0;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;1635:644:3;;;;;;13:3:-1;8;5:12;2:2;;;30:1;27;20:12;2:2;1635:644:3;;;;;;;;;;;;;;;;;;;;;;;;;;;30:3:-1;22:6;14;1:33;99:1;93:3;85:6;81:16;74:27;137:4;133:9;126:4;121:3;117:14;113:30;106:37;;169:3;161:6;157:16;147:26;;1635:644:3;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;30:3:-1;22:6;14;1:33;99:1;93:3;85:6;81:16;74:27;137:4;133:9;126:4;121:3;117:14;113:30;106:37;;169:3;161:6;157:16;147:26;;1635:644:3;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;30:3:-1;22:6;14;1:33;99:1;93:3;85:6;81:16;74:27;137:4;133:9;126:4;121:3;117:14;113:30;106:37;;169:3;161:6;157:16;147:26;;1635:644:3;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;30:3:-1;22:6;14;1:33;99:1;93:3;85:6;81:16;74:27;137:4;133:9;126:4;121:3;117:14;113:30;106:37;;169:3;161:6;157:16;147:26;;1635:644:3;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;1558:81:0;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;21082:88;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;21082:88:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;7209:230;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;7209:230:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;560:441:3;;;;;;13:3:-1;8;5:12;2:2;;;30:1;27;20:12;2:2;560:441:3;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;30:3:-1;22:6;14;1:33;99:1;93:3;85:6;81:16;74:27;137:4;133:9;126:4;121:3;117:14;113:30;106:37;;169:3;161:6;157:16;147:26;;560:441:3;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;30:3:-1;22:6;14;1:33;99:1;93:3;85:6;81:16;74:27;137:4;133:9;126:4;121:3;117:14;113:30;106:37;;169:3;161:6;157:16;147:26;;560:441:3;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;30:3:-1;22:6;14;1:33;99:1;93:3;85:6;81:16;74:27;137:4;133:9;126:4;121:3;117:14;113:30;106:37;;169:3;161:6;157:16;147:26;;560:441:3;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;30:3:-1;22:6;14;1:33;99:1;93:3;85:6;81:16;74:27;137:4;133:9;126:4;121:3;117:14;113:30;106:37;;169:3;161:6;157:16;147:26;;560:441:3;;;;;;;;;;;;;;:::i;:::-;;8310:227:0;;;;;;13:3:-1;8;5:12;2:2;;;30:1;27;20:12;2:2;8310:227:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;21:11:-1;8;5:28;2:2;;;46:1;43;36:12;2:2;8310:227:0;;35:9:-1;28:4;12:14;8:25;5:40;2:2;;;58:1;55;48:12;2:2;8310:227:0;;;;;;100:9:-1;95:1;81:12;77:20;67:8;63:35;60:50;39:11;25:12;22:29;11:107;8:2;;;131:1;128;121:12;8:2;8310:227:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;30:3:-1;22:6;14;1:33;99:1;93:3;85:6;81:16;74:27;137:4;133:9;126:4;121:3;117:14;113:30;106:37;;169:3;161:6;157:16;147:26;;8310:227:0;;;;;;;;;;;;;;;:::i;:::-;;21367:177;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;21367:177:0;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;21367:177:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;21178:99;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;21178:99:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1114:96:3;;;:::i;:::-;;;;;;;;;;;;;;;;;;;7768:161:0;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;7768:161:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;1188:362;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;1188:362:0;;;;;;;;;;;;;;;;;;;:::i;:::-;;3350:135;3420:4;3444:20;:33;3465:11;3444:33;;;;;;;;;;;;;;;;;;;;;;;;;;;3437:40;;3350:135;;;:::o;20990:84::-;21028:13;21061:5;21054:12;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;20990:84;:::o;6666:243::-;6739:7;2340:5;2329:16;;:7;;;;;;;;;;;:16;;;2321:55;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;6819:16;6827:7;6819;:16::i;:::-;6811:48;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;6877:15;:24;6893:7;6877:24;;;;;;;;;;;;;;;;;;;;;6870:31;;6666:243;;;:::o;6028:630::-;2340:5;2329:16;;:7;;;;;;;;;;;:16;;;2321:55;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;6225:2;6201:26;;:11;:20;6213:7;6201:20;;;;;;;;;;;;;;;;;;;;;:26;;;;6193:87;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;6418:10;:8;:10::i;:::-;6404:24;;:10;:24;;;6396:66;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;6553:2;6526:15;:24;6542:7;6526:24;;;;;;;;;;;;:29;;;;;;;;;;;;;;;;;;6641:7;6638:2;6608:41;;6617:11;:20;6629:7;6617:20;;;;;;;;;;;;;;;;;;;;;6608:41;;;;;;;;;;;;6028:630;;:::o;2622:88::-;1125:6;;;;;;;;;;;1111:20;;:10;:20;;;1103:57;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2694:8;2684:7;;:18;;;;;;;;;;;;;;;;;;2622:88;:::o;14011:96::-;14055:7;14082:10;:17;;;;14075:24;;14011:96;:::o;7937:210::-;2340:5;2329:16;;:7;;;;;;;;;;;:16;;;2321:55;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8042:33;8061:4;8067:7;8042:18;:33::i;:::-;8034:60;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8107:32;8121:4;8127:2;8131:7;8107:13;:32::i;:::-;7937:210;;;:::o;15167:124:2:-;15243:40;15254:5;15261:7;15280:1;15270:12;;;;;;;;;;;;;;;;;;;;;;;;;29:1:-1;21:6;17:14;116:4;104:10;96:6;87:34;147:4;139:6;135:17;125:27;;0:156;15270:12:2;;;;15243:10;:40::i;:::-;15167:124;;:::o;13668:185:0:-;13748:7;13784:16;13794:5;13784:9;:16::i;:::-;13776:5;:24;13768:33;;;;;;;;13819:12;:19;13832:5;13819:19;;;;;;;;;;;;;;;13839:5;13819:26;;;;;;;;;;;;;;;;;;13812:33;;13668:185;;;;:::o;15299:169:2:-;;;;:::o;22385:185:0:-;22453:4;1125:6;;;;;;;;;;;1111:20;;:10;:20;;;1103:57;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;22470:24;22482:2;22486:7;22470:11;:24::i;:::-;22505:35;22532:7;22505:26;:35::i;:::-;22558:4;22551:11;;22385:185;;;;:::o;8155:147::-;2340:5;2329:16;;:7;;;;;;;;;;;:16;;;2321:55;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8255:39;8272:4;8278:2;8282:7;8255:39;;;;;;;;;;;;:16;:39::i;:::-;8155:147;;;:::o;1009:97:3:-;1058:7;1085:13;;1078:20;;1009:97;:::o;14452:151:0:-;14510:7;14546:13;:11;:13::i;:::-;14538:5;:21;14530:30;;;;;;;;14578:10;14589:5;14578:17;;;;;;;;;;;;;;;;;;14571:24;;14452:151;;;:::o;5773:179::-;5842:7;2340:5;2329:16;;:7;;;;;;;;;;;:16;;;2321:55;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;5924:11;:20;5936:7;5924:20;;;;;;;;;;;;;;;;;;;;;5917:27;;5773:179;;;:::o;5462:303::-;5531:7;2340:5;2329:16;;:7;;;;;;;;;;;:16;;;2321:55;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;5723:34;:17;:24;5741:5;5723:24;;;;;;;;;;;;;;;:32;:34::i;:::-;5716:41;;5462:303;;;:::o;1635:644:3:-;1926:15;1971:1;1973;1975;1977:5;1954:29;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;1954:29:3;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;1954:29:3;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;1954:29:3;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;1954:29:3;;;;;;;;;;;;;;49:4:-1;39:7;30;26:21;22:32;13:7;6:49;1954:29:3;;;1944:40;;;;;;1926:58;;2066:1;2020:48;;:9;:18;2030:7;2020:18;;;;;;;;;;;:34;;;;;;;;;;;;:48;;;2012:84;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2124:49;2139:10;2151:5;2158:1;2161;2164;2167:5;2124:14;:49::i;:::-;2201:23;2206:10;2218:5;2201:4;:23::i;:::-;;2270:1;2252:14;;:19;;;;;;;;;;;1635:644;;;;;;;:::o;1558:81:0:-;1598:7;1625:6;;;;;;;;;;;1618:13;;1558:81;:::o;21082:88::-;21122:13;21155:7;21148:14;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;21082:88;:::o;7209:230::-;2340:5;2329:16;;:7;;;;;;;;;;;:16;;;2321:55;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;7308:10;7302:16;;:2;:16;;;;7294:25;;;;;;;;7367:8;7330:18;:30;7349:10;7330:30;;;;;;;;;;;;;;;:34;7361:2;7330:34;;;;;;;;;;;;;;;;:45;;;;;;;;;;;;;;;;;;7418:2;7391:40;;7406:10;7391:40;;;7422:8;7391:40;;;;;;;;;;;;;;;;;;;;;;7209:230;;:::o;560:441:3:-;742:20;765;773:1;775;777;779:5;765:7;:20::i;:::-;742:43;;822:103;;;;;;;;861:10;822:103;;;;903:10;822:103;;;;;796:9;:23;806:12;796:23;;;;;;;;;;;:129;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;953:1;936:13;;:18;;;;;;;;;;;970:23;982:10;970:23;;;;;;;;;;;;;;;;;;;;;;560:441;;;;;;;:::o;8310:227:0:-;2340:5;2329:16;;:7;;;;;;;;;;;:16;;;2321:55;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8430:31;8443:4;8449:2;8453:7;8430:12;:31::i;:::-;8480:48;8503:4;8509:2;8513:7;8522:5;8480:22;:48::i;:::-;8472:57;;;;;;;;8310:227;;;;:::o;21367:177::-;21425:13;21459:16;21467:7;21459;:16::i;:::-;21451:48;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;21517:10;:19;21528:7;21517:19;;;;;;;;;;;21510:26;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;21367:177;;;:::o;21178:99::-;21224:13;21256;21249:20;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;21178:99;:::o;1114:96:3:-;1161:7;1188:14;;1181:21;;1114:96;:::o;7768:161:0:-;7862:4;2340:5;2329:16;;:7;;;;;;;;;;;:16;;;2321:55;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;7886:18;:25;7905:5;7886:25;;;;;;;;;;;;;;;:35;7912:8;7886:35;;;;;;;;;;;;;;;;;;;;;;;;;7879:42;;7768:161;;;;:::o;1188:362::-;1125:6;;;;;;;;;;;1111:20;;:10;:20;;;1103:57;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1438:8;1417:29;;1425:8;1417:29;;;1409:57;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1492:8;1483:6;;:17;;;;;;;;;;;;;;;;;;1516:26;1533:8;1516:26;;;;;;;;;;;;;;;;;;;;;;1188:362;:::o;8738:155::-;8795:4;8812:13;8828:11;:20;8840:7;8828:20;;;;;;;;;;;;;;;;;;;;;8812:36;;8883:1;8866:19;;:5;:19;;;;8859:26;;;8738:155;;;:::o;9262:249::-;9347:4;9364:13;9380:16;9388:7;9380;:16::i;:::-;9364:32;;9426:5;9415:16;;:7;:16;;;:51;;;;9459:7;9435:31;;:20;9447:7;9435:11;:20::i;:::-;:31;;;9415:51;:87;;;;9470:32;9487:5;9494:7;9470:16;:32::i;:::-;9415:87;9407:96;;;9262:249;;;;:::o;14987:245::-;15073:38;15093:4;15099:2;15103:7;15073:19;:38::i;:::-;15124:47;15157:4;15163:7;15124:32;:47::i;:::-;15184:40;15212:2;15216:7;15184:27;:40::i;:::-;14987:245;;;:::o;15495:202::-;15559:24;15571:2;15575:7;15559:11;:24::i;:::-;15596:40;15624:2;15628:7;15596:27;:40::i;:::-;15649;15681:7;15649:31;:40::i;:::-;15495:202;;:::o;22032:::-;22112:16;22120:7;22112;:16::i;:::-;22104:47;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;22184:42;22194:13;22184:42;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;22208:17;22217:7;22208:8;:17::i;:::-;22184:9;:42::i;:::-;22162:10;:19;22173:7;22162:19;;;;;;;;;;;:64;;;;;;;;;;;;:::i;:::-;;22032:202;:::o;1065:112:5:-;1130:7;1156;:14;;;1149:21;;1065:112;;;:::o;1218:251:3:-;1394:7;1448:1;1450;1452;1454:5;1431:29;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;1431:29:3;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;1431:29:3;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;1431:29:3;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;1431:29:3;;;;;;;;;;;;;;49:4:-1;39:7;30;26:21;22:32;13:7;6:49;1431:29:3;;;1421:40;;;;;;1414:47;;1218:251;;;;;;:::o;11634:356:0:-;11756:4;11783:15;:2;:13;;;:15::i;:::-;11782:16;11778:60;;;11822:4;11815:11;;;;11778:60;11850:13;11882:2;11866:36;;;11903:10;11915:4;11921:7;11930:5;11866:70;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;11866:70:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;11866:70:0;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;11866:70:0;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;11866:70:0;;;;;;;;;;;;;;;;11850:86;;4392:10;11965:16;;11955:26;;;:6;:26;;;;11947:35;;;11634:356;;;;;;;:::o;10390:705::-;10577:4;10557:24;;:16;10565:7;10557;:16::i;:::-;:24;;;10549:69;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;10720:1;10706:16;;:2;:16;;;;10698:47;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;10773:15;:24;10789:7;10773:24;;;;;;;;;;;;10766:31;;;;;;;;;;;10890:35;:17;:23;10908:4;10890:23;;;;;;;;;;;;;;;:33;:35::i;:::-;10936:33;:17;:21;10954:2;10936:21;;;;;;;;;;;;;;;:31;:33::i;:::-;11003:2;10980:11;:20;10992:7;10980:20;;;;;;;;;;;;:25;;;;;;;;;;;;;;;;;;11079:7;11075:2;11060:27;;11069:4;11060:27;;;;;;;;;;;;10390:705;;;:::o;17511:1148::-;17777:22;17802:32;17832:1;17802:12;:18;17815:4;17802:18;;;;;;;;;;;;;;;:25;;;;:29;;:32;;;;:::i;:::-;17777:57;;17845:18;17866:17;:26;17884:7;17866:26;;;;;;;;;;;;17845:47;;18013:14;17999:10;:28;;17995:328;;;18044:19;18066:12;:18;18079:4;18066:18;;;;;;;;;;;;;;;18085:14;18066:34;;;;;;;;;;;;;;;;;;18044:56;;18150:11;18117:12;:18;18130:4;18117:18;;;;;;;;;;;;;;;18136:10;18117:30;;;;;;;;;;;;;;;;;:44;;;;18267:10;18234:17;:30;18252:11;18234:30;;;;;;;;;;;:43;;;;17995:328;;18412:12;:18;18425:4;18412:18;;;;;;;;;;;;;;;:27;;;;;;;;;;;;:::i;:::-;;17511:1148;;;;:::o;16335:186::-;16449:12;:16;16462:2;16449:16;;;;;;;;;;;;;;;:23;;;;16420:17;:26;16438:7;16420:26;;;;;;;;;;;:52;;;;16483:12;:16;16496:2;16483:16;;;;;;;;;;;;;;;16505:7;16483:30;;39:1:-1;33:3;27:10;23:18;57:10;52:3;45:23;79:10;72:17;;0:93;16483:30:0;;;;;;;;;;;;;;;;;;;;;;16335:186;;:::o;9672:515::-;9745:16;9753:7;9745;:16::i;:::-;9744:17;9736:50;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;9821:1;9807:16;;:2;:16;;;;9799:51;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;9968:2;9945:11;:20;9957:7;9945:20;;;;;;;;;;;;:25;;;;;;;;;;;;;;;;;;10060:33;:17;:21;10078:2;10060:21;;;;;;;;;;;;;;;:31;:33::i;:::-;10171:7;10167:2;10146:33;;10163:1;10146:33;;;;;;;;;;;;9672:515;;:::o;16722:164::-;16826:10;:17;;;;16799:15;:24;16815:7;16799:24;;;;;;;;;;;:44;;;;16854:10;16870:7;16854:24;;39:1:-1;33:3;27:10;23:18;57:10;52:3;45:23;79:10;72:17;;0:93;16854:24:0;;;;;;;;;;;;;;;;;;;;;;16722:164;:::o;44306:482:2:-;44356:27;44406:1;44400:2;:7;44396:50;;;44424:10;;;;;;;;;;;;;;;;;;;;;44396:50;44456:6;44465:2;44456:11;;44478:8;44497:69;44509:1;44504;:6;;44497:69;;;44527:5;;;;;;;44552:2;44547:7;;;;;;;;;;;44497:69;;;44576:17;44606:3;44596:14;;;;;;;;;;;;;;;;;;;;;;;;;29:1:-1;21:6;17:14;116:4;104:10;96:6;87:34;147:4;139:6;135:17;125:27;;0:156;44596:14:2;;;;44576:34;;44621:6;44636:1;44630:3;:7;44621:16;;44648:103;44661:1;44655:2;:7;;44648:103;;;44712:2;44707;:7;;;;;;;;44702:2;:12;44691:25;;44679:4;44684:3;;;;;;;44679:9;;;;;;;;;;;;;;:37;;;;;;;;;;;44737:2;44731:8;;;;;;;;;;;44648:103;;;44775:4;44761:19;;;;;;44306:482;;;;:::o;40649:168::-;40727:33;40780:29;40790:2;40794;40780:29;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:9;:29::i;:::-;40773:36;;40649:168;;;;:::o;686:610:8:-;746:4;1004:16;1030:19;1052:66;1030:88;;;;1219:7;1207:20;1195:32;;1258:11;1246:8;:23;;:42;;;;;1285:3;1273:15;;:8;:15;;1246:42;1238:51;;;;686:610;;;:::o;1367:108:5:-;1447:21;1466:1;1447:7;:14;;;:18;;:21;;;;:::i;:::-;1430:7;:14;;:38;;;;1367:108;:::o;1183:178::-;1353:1;1335:7;:14;;;:19;;;;;;;;;;;1183:178;:::o;1274:134:6:-;1332:7;1358:43;1362:1;1365;1358:43;;;;;;;;;;;;;;;;;:3;:43::i;:::-;1351:50;;1274:134;;;;:::o;41231:1046:2:-;41363:33;41409:16;41434:2;41409:28;;41448:16;41473:2;41448:28;;41487:16;41512:2;41487:28;;41526:16;41551:2;41526:28;;41565:16;41590:2;41565:28;;41604:19;41689:3;:10;41676:3;:10;41663:3;:10;41650:3;:10;41637:3;:10;:23;:36;:49;:62;41626:74;;;;;;;;;;;;;;;;;;;;;;;;;29:1:-1;21:6;17:14;116:4;104:10;96:6;87:34;147:4;139:6;135:17;125:27;;0:156;41626:74:2;;;;41604:96;;41711:19;41739:5;41711:34;;41756:6;41765:1;41756:10;;41777:6;41786:1;41777:10;;41807:1;41803:5;;41798:80;41814:3;:10;41810:1;:14;41798:80;;;41860:3;41864:1;41860:6;;;;;;;;;;;;;;;;;;;41846;41853:3;;;;;;41846:11;;;;;;;;;;;;;;:20;;;;;;;;;;;41826:3;;;;;;;41798:80;;;41897:1;41893:5;;41888:80;41904:3;:10;41900:1;:14;41888:80;;;41950:3;41954:1;41950:6;;;;;;;;;;;;;;;;;;;41936;41943:3;;;;;;41936:11;;;;;;;;;;;;;;:20;;;;;;;;;;;41916:3;;;;;;;41888:80;;;41987:1;41983:5;;41978:80;41994:3;:10;41990:1;:14;41978:80;;;42040:3;42044:1;42040:6;;;;;;;;;;;;;;;;;;;42026;42033:3;;;;;;42026:11;;;;;;;;;;;;;;:20;;;;;;;;;;;42006:3;;;;;;;41978:80;;;42077:1;42073:5;;42068:80;42084:3;:10;42080:1;:14;42068:80;;;42130:3;42134:1;42130:6;;;;;;;;;;;;;;;;;;;42116;42123:3;;;;;;42116:11;;;;;;;;;;;;;;:20;;;;;;;;;;;42096:3;;;;;;;42068:80;;;42167:1;42163:5;;42158:80;42174:3;:10;42170:1;:14;42158:80;;;42220:3;42224:1;42220:6;;;;;;;;;;;;;;;;;;;42206;42213:3;;;;;;42206:11;;;;;;;;;;;;;;:20;;;;;;;;;;;42186:3;;;;;;;42158:80;;;42262:6;42248:21;;;;;;;;;;;41231:1046;;;;;;;:::o;1732:187:6:-;1818:7;1850:1;1845;:6;;1853:12;1837:29;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;1837:29:6;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1876:9;1892:1;1888;:5;1876:17;;1911:1;1904:8;;;1732:187;;;;;:::o;208:2074:3:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o",
    "source": "pragma solidity >=0.4.21 <0.6.0;\r\n\r\nimport \"./ERC721Mintable.sol\";\r\nimport \"./Verifier.sol\";\r\n\r\n\r\n// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>\r\n\r\ncontract SoInSquareVerifier is customERC721Token {\r\n    struct solution {  \r\n        uint256  solutionIndex;  \r\n        address solutionAddress; \r\n    }\r\n\r\n    Verifier zokVerifier;\r\n\r\n    uint256 noOfSolutions;\r\n\r\n    uint256 noTokensMinted;\r\n\r\n    mapping(bytes32 => solution) private solutions;\r\n\r\n    event addSolution(address newSolution);\r\n\r\n    function addNewSolution(address newAddress, uint256 solutionId, uint[2] memory a,uint[2][2] memory b,\r\n                     uint[2] memory c, uint[2] memory input) public {\r\n        bytes32 solutionHash = getHash(a,b,c,input);\r\n        solutions[solutionHash] = solution({\r\n            solutionIndex: solutionId,\r\n            solutionAddress: newAddress\r\n        });\r\n        noOfSolutions += 1;\r\n        emit addSolution(newAddress);\r\n    }\r\n\r\n    function getSolutionsAdded() public view returns(uint256) {\r\n        return noOfSolutions;\r\n    }\r\n\r\n    function getTokensMinted() public view returns(uint256) {\r\n        return noTokensMinted;\r\n    }\r\n\r\n    function getHash(uint[2] memory a,\r\n                    uint[2][2] memory b,\r\n                    uint[2] memory c,\r\n                    uint[2] memory input) internal returns(bytes32) {\r\n        return keccak256(abi.encodePacked(a,b,c,input));\r\n    }\r\n\r\n    constructor (address theAddress) public {\r\n        noOfSolutions = 0;\r\n        noTokensMinted = 0;\r\n        zokVerifier = Verifier(theAddress);\r\n    }\r\n\r\n    function mintNFT(uint[2] memory a,uint[2][2] memory b,\r\n                     uint[2] memory c, uint[2] memory input, address newAddress, uint256 newId) public {\r\n                         //require(zokVerifier.verifyTx(a,b,c,input), \"solution verification failed\");\r\n                         bytes32 solHash = keccak256(abi.encodePacked(a,b,c,input));\r\n                         require(solutions[solHash].solutionAddress == address(0), \"solution already exists\");\r\n                         addNewSolution(newAddress, newId, a, b, c, input);\r\n                         mint(newAddress, newId);\r\n                         noTokensMinted += 1;\r\n    }\r\n}\r\n\r\n// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class\r\n\r\n\r\n\r\n// TODO define a solutions struct that can hold an index & an address\r\n\r\n\r\n// TODO define an array of the above struct\r\n\r\n\r\n// TODO define a mapping to store unique solutions submitted\r\n\r\n\r\n\r\n// TODO Create an event to emit when a solution is added\r\n\r\n\r\n\r\n// TODO Create a function to add the solutions to the array and emit the event\r\n\r\n\r\n\r\n// TODO Create a function to mint new NFT only after the solution has been verified\r\n//  - make sure the solution is unique (has not been used before)\r\n//  - make sure you handle metadata as well as tokenSuplly\r\n\r\n  \r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n",
    "sourcePath": "C:/Users/jb7741/Downloads/udacity/Blockchain-Capstone/eth-contracts/contracts/SolnSquareVerifier.sol",
    "ast": {
      "absolutePath": "/C/Users/jb7741/Downloads/udacity/Blockchain-Capstone/eth-contracts/contracts/SolnSquareVerifier.sol",
      "exportedSymbols": {
        "SoInSquareVerifier": [
          7665
        ]
      },
      "id": 7666,
      "nodeType": "SourceUnit",
      "nodes": [
        {
          "id": 7451,
          "literals": [
            "solidity",
            ">=",
            "0.4",
            ".21",
            "<",
            "0.6",
            ".0"
          ],
          "nodeType": "PragmaDirective",
          "src": "0:32:3"
        },
        {
          "absolutePath": "/C/Users/jb7741/Downloads/udacity/Blockchain-Capstone/eth-contracts/contracts/ERC721Mintable.sol",
          "file": "./ERC721Mintable.sol",
          "id": 7452,
          "nodeType": "ImportDirective",
          "scope": 7666,
          "sourceUnit": 1125,
          "src": "36:30:3",
          "symbolAliases": [],
          "unitAlias": ""
        },
        {
          "absolutePath": "/C/Users/jb7741/Downloads/udacity/Blockchain-Capstone/eth-contracts/contracts/Verifier.sol",
          "file": "./Verifier.sol",
          "id": 7453,
          "nodeType": "ImportDirective",
          "scope": 7666,
          "sourceUnit": 10216,
          "src": "68:24:3",
          "symbolAliases": [],
          "unitAlias": ""
        },
        {
          "baseContracts": [
            {
              "arguments": null,
              "baseName": {
                "contractScope": null,
                "id": 7454,
                "name": "customERC721Token",
                "nodeType": "UserDefinedTypeName",
                "referencedDeclaration": 1124,
                "src": "239:17:3",
                "typeDescriptions": {
                  "typeIdentifier": "t_contract$_customERC721Token_$1124",
                  "typeString": "contract customERC721Token"
                }
              },
              "id": 7455,
              "nodeType": "InheritanceSpecifier",
              "src": "239:17:3"
            }
          ],
          "contractDependencies": [
            72,
            131,
            682,
            980,
            1091,
            177,
            1124,
            7449
          ],
          "contractKind": "contract",
          "documentation": null,
          "fullyImplemented": true,
          "id": 7665,
          "linearizedBaseContracts": [
            7665,
            1124,
            1091,
            7449,
            980,
            682,
            177,
            131,
            72
          ],
          "name": "SoInSquareVerifier",
          "nodeType": "ContractDefinition",
          "nodes": [
            {
              "canonicalName": "SoInSquareVerifier.solution",
              "id": 7460,
              "members": [
                {
                  "constant": false,
                  "id": 7457,
                  "name": "solutionIndex",
                  "nodeType": "VariableDeclaration",
                  "scope": 7460,
                  "src": "293:22:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 7456,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "293:7:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 7459,
                  "name": "solutionAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 7460,
                  "src": "328:23:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 7458,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "328:7:3",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "name": "solution",
              "nodeType": "StructDefinition",
              "scope": 7665,
              "src": "264:96:3",
              "visibility": "public"
            },
            {
              "constant": false,
              "id": 7462,
              "name": "zokVerifier",
              "nodeType": "VariableDeclaration",
              "scope": 7665,
              "src": "368:20:3",
              "stateVariable": true,
              "storageLocation": "default",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Verifier_$10215",
                "typeString": "contract Verifier"
              },
              "typeName": {
                "contractScope": null,
                "id": 7461,
                "name": "Verifier",
                "nodeType": "UserDefinedTypeName",
                "referencedDeclaration": 10215,
                "src": "368:8:3",
                "typeDescriptions": {
                  "typeIdentifier": "t_contract$_Verifier_$10215",
                  "typeString": "contract Verifier"
                }
              },
              "value": null,
              "visibility": "internal"
            },
            {
              "constant": false,
              "id": 7464,
              "name": "noOfSolutions",
              "nodeType": "VariableDeclaration",
              "scope": 7665,
              "src": "397:21:3",
              "stateVariable": true,
              "storageLocation": "default",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              },
              "typeName": {
                "id": 7463,
                "name": "uint256",
                "nodeType": "ElementaryTypeName",
                "src": "397:7:3",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                }
              },
              "value": null,
              "visibility": "internal"
            },
            {
              "constant": false,
              "id": 7466,
              "name": "noTokensMinted",
              "nodeType": "VariableDeclaration",
              "scope": 7665,
              "src": "427:22:3",
              "stateVariable": true,
              "storageLocation": "default",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              },
              "typeName": {
                "id": 7465,
                "name": "uint256",
                "nodeType": "ElementaryTypeName",
                "src": "427:7:3",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                }
              },
              "value": null,
              "visibility": "internal"
            },
            {
              "constant": false,
              "id": 7470,
              "name": "solutions",
              "nodeType": "VariableDeclaration",
              "scope": 7665,
              "src": "458:46:3",
              "stateVariable": true,
              "storageLocation": "default",
              "typeDescriptions": {
                "typeIdentifier": "t_mapping$_t_bytes32_$_t_struct$_solution_$7460_storage_$",
                "typeString": "mapping(bytes32 => struct SoInSquareVerifier.solution)"
              },
              "typeName": {
                "id": 7469,
                "keyType": {
                  "id": 7467,
                  "name": "bytes32",
                  "nodeType": "ElementaryTypeName",
                  "src": "466:7:3",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  }
                },
                "nodeType": "Mapping",
                "src": "458:28:3",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_bytes32_$_t_struct$_solution_$7460_storage_$",
                  "typeString": "mapping(bytes32 => struct SoInSquareVerifier.solution)"
                },
                "valueType": {
                  "contractScope": null,
                  "id": 7468,
                  "name": "solution",
                  "nodeType": "UserDefinedTypeName",
                  "referencedDeclaration": 7460,
                  "src": "477:8:3",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_solution_$7460_storage_ptr",
                    "typeString": "struct SoInSquareVerifier.solution"
                  }
                }
              },
              "value": null,
              "visibility": "private"
            },
            {
              "anonymous": false,
              "documentation": null,
              "id": 7474,
              "name": "addSolution",
              "nodeType": "EventDefinition",
              "parameters": {
                "id": 7473,
                "nodeType": "ParameterList",
                "parameters": [
                  {
                    "constant": false,
                    "id": 7472,
                    "indexed": false,
                    "name": "newSolution",
                    "nodeType": "VariableDeclaration",
                    "scope": 7474,
                    "src": "531:19:3",
                    "stateVariable": false,
                    "storageLocation": "default",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    },
                    "typeName": {
                      "id": 7471,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "531:7:3",
                      "stateMutability": "nonpayable",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  }
                ],
                "src": "530:21:3"
              },
              "src": "513:39:3"
            },
            {
              "body": {
                "id": 7525,
                "nodeType": "Block",
                "src": "731:270:3",
                "statements": [
                  {
                    "assignments": [
                      7500
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 7500,
                        "name": "solutionHash",
                        "nodeType": "VariableDeclaration",
                        "scope": 7525,
                        "src": "742:20:3",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        },
                        "typeName": {
                          "id": 7499,
                          "name": "bytes32",
                          "nodeType": "ElementaryTypeName",
                          "src": "742:7:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes32",
                            "typeString": "bytes32"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 7507,
                    "initialValue": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "id": 7502,
                          "name": "a",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7482,
                          "src": "773:1:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                            "typeString": "uint256[2] memory"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 7503,
                          "name": "b",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7488,
                          "src": "775:1:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_array$_t_uint256_$2_memory_$2_memory_ptr",
                            "typeString": "uint256[2] memory[2] memory"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 7504,
                          "name": "c",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7492,
                          "src": "777:1:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                            "typeString": "uint256[2] memory"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 7505,
                          "name": "input",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7496,
                          "src": "779:5:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                            "typeString": "uint256[2] memory"
                          }
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                            "typeString": "uint256[2] memory"
                          },
                          {
                            "typeIdentifier": "t_array$_t_array$_t_uint256_$2_memory_$2_memory_ptr",
                            "typeString": "uint256[2] memory[2] memory"
                          },
                          {
                            "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                            "typeString": "uint256[2] memory"
                          },
                          {
                            "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                            "typeString": "uint256[2] memory"
                          }
                        ],
                        "id": 7501,
                        "name": "getHash",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7576,
                        "src": "765:7:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_nonpayable$_t_array$_t_uint256_$2_memory_ptr_$_t_array$_t_array$_t_uint256_$2_memory_$2_memory_ptr_$_t_array$_t_uint256_$2_memory_ptr_$_t_array$_t_uint256_$2_memory_ptr_$returns$_t_bytes32_$",
                          "typeString": "function (uint256[2] memory,uint256[2] memory[2] memory,uint256[2] memory,uint256[2] memory) returns (bytes32)"
                        }
                      },
                      "id": 7506,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "765:20:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes32",
                        "typeString": "bytes32"
                      }
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "742:43:3"
                  },
                  {
                    "expression": {
                      "argumentTypes": null,
                      "id": 7515,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftHandSide": {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 7508,
                          "name": "solutions",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7470,
                          "src": "796:9:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_bytes32_$_t_struct$_solution_$7460_storage_$",
                            "typeString": "mapping(bytes32 => struct SoInSquareVerifier.solution storage ref)"
                          }
                        },
                        "id": 7510,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 7509,
                          "name": "solutionHash",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7500,
                          "src": "806:12:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes32",
                            "typeString": "bytes32"
                          }
                        },
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": true,
                        "nodeType": "IndexAccess",
                        "src": "796:23:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_solution_$7460_storage",
                          "typeString": "struct SoInSquareVerifier.solution storage ref"
                        }
                      },
                      "nodeType": "Assignment",
                      "operator": "=",
                      "rightHandSide": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 7512,
                            "name": "solutionId",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 7478,
                            "src": "861:10:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 7513,
                            "name": "newAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 7476,
                            "src": "903:10:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": null,
                          "id": 7511,
                          "name": "solution",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7460,
                          "src": "822:8:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_struct$_solution_$7460_storage_ptr_$",
                            "typeString": "type(struct SoInSquareVerifier.solution storage pointer)"
                          }
                        },
                        "id": 7514,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "structConstructorCall",
                        "lValueRequested": false,
                        "names": [
                          "solutionIndex",
                          "solutionAddress"
                        ],
                        "nodeType": "FunctionCall",
                        "src": "822:103:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_solution_$7460_memory",
                          "typeString": "struct SoInSquareVerifier.solution memory"
                        }
                      },
                      "src": "796:129:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_solution_$7460_storage",
                        "typeString": "struct SoInSquareVerifier.solution storage ref"
                      }
                    },
                    "id": 7516,
                    "nodeType": "ExpressionStatement",
                    "src": "796:129:3"
                  },
                  {
                    "expression": {
                      "argumentTypes": null,
                      "id": 7519,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftHandSide": {
                        "argumentTypes": null,
                        "id": 7517,
                        "name": "noOfSolutions",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7464,
                        "src": "936:13:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "nodeType": "Assignment",
                      "operator": "+=",
                      "rightHandSide": {
                        "argumentTypes": null,
                        "hexValue": "31",
                        "id": 7518,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "953:1:3",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_1_by_1",
                          "typeString": "int_const 1"
                        },
                        "value": "1"
                      },
                      "src": "936:18:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 7520,
                    "nodeType": "ExpressionStatement",
                    "src": "936:18:3"
                  },
                  {
                    "eventCall": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "id": 7522,
                          "name": "newAddress",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7476,
                          "src": "982:10:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        ],
                        "id": 7521,
                        "name": "addSolution",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7474,
                        "src": "970:11:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_event_nonpayable$_t_address_$returns$__$",
                          "typeString": "function (address)"
                        }
                      },
                      "id": 7523,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "970:23:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_tuple$__$",
                        "typeString": "tuple()"
                      }
                    },
                    "id": 7524,
                    "nodeType": "EmitStatement",
                    "src": "965:28:3"
                  }
                ]
              },
              "documentation": null,
              "id": 7526,
              "implemented": true,
              "kind": "function",
              "modifiers": [],
              "name": "addNewSolution",
              "nodeType": "FunctionDefinition",
              "parameters": {
                "id": 7497,
                "nodeType": "ParameterList",
                "parameters": [
                  {
                    "constant": false,
                    "id": 7476,
                    "name": "newAddress",
                    "nodeType": "VariableDeclaration",
                    "scope": 7526,
                    "src": "584:18:3",
                    "stateVariable": false,
                    "storageLocation": "default",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    },
                    "typeName": {
                      "id": 7475,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "584:7:3",
                      "stateMutability": "nonpayable",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  },
                  {
                    "constant": false,
                    "id": 7478,
                    "name": "solutionId",
                    "nodeType": "VariableDeclaration",
                    "scope": 7526,
                    "src": "604:18:3",
                    "stateVariable": false,
                    "storageLocation": "default",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "typeName": {
                      "id": 7477,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "604:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  },
                  {
                    "constant": false,
                    "id": 7482,
                    "name": "a",
                    "nodeType": "VariableDeclaration",
                    "scope": 7526,
                    "src": "624:16:3",
                    "stateVariable": false,
                    "storageLocation": "memory",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                      "typeString": "uint256[2]"
                    },
                    "typeName": {
                      "baseType": {
                        "id": 7479,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "624:4:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 7481,
                      "length": {
                        "argumentTypes": null,
                        "hexValue": "32",
                        "id": 7480,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "629:1:3",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_2_by_1",
                          "typeString": "int_const 2"
                        },
                        "value": "2"
                      },
                      "nodeType": "ArrayTypeName",
                      "src": "624:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_uint256_$2_storage_ptr",
                        "typeString": "uint256[2]"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  },
                  {
                    "constant": false,
                    "id": 7488,
                    "name": "b",
                    "nodeType": "VariableDeclaration",
                    "scope": 7526,
                    "src": "641:19:3",
                    "stateVariable": false,
                    "storageLocation": "memory",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_array$_t_uint256_$2_memory_$2_memory_ptr",
                      "typeString": "uint256[2][2]"
                    },
                    "typeName": {
                      "baseType": {
                        "baseType": {
                          "id": 7483,
                          "name": "uint",
                          "nodeType": "ElementaryTypeName",
                          "src": "641:4:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 7485,
                        "length": {
                          "argumentTypes": null,
                          "hexValue": "32",
                          "id": 7484,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "646:1:3",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_2_by_1",
                            "typeString": "int_const 2"
                          },
                          "value": "2"
                        },
                        "nodeType": "ArrayTypeName",
                        "src": "641:7:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$2_storage_ptr",
                          "typeString": "uint256[2]"
                        }
                      },
                      "id": 7487,
                      "length": {
                        "argumentTypes": null,
                        "hexValue": "32",
                        "id": 7486,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "649:1:3",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_2_by_1",
                          "typeString": "int_const 2"
                        },
                        "value": "2"
                      },
                      "nodeType": "ArrayTypeName",
                      "src": "641:10:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_array$_t_uint256_$2_storage_$2_storage_ptr",
                        "typeString": "uint256[2][2]"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  },
                  {
                    "constant": false,
                    "id": 7492,
                    "name": "c",
                    "nodeType": "VariableDeclaration",
                    "scope": 7526,
                    "src": "684:16:3",
                    "stateVariable": false,
                    "storageLocation": "memory",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                      "typeString": "uint256[2]"
                    },
                    "typeName": {
                      "baseType": {
                        "id": 7489,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "684:4:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 7491,
                      "length": {
                        "argumentTypes": null,
                        "hexValue": "32",
                        "id": 7490,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "689:1:3",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_2_by_1",
                          "typeString": "int_const 2"
                        },
                        "value": "2"
                      },
                      "nodeType": "ArrayTypeName",
                      "src": "684:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_uint256_$2_storage_ptr",
                        "typeString": "uint256[2]"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  },
                  {
                    "constant": false,
                    "id": 7496,
                    "name": "input",
                    "nodeType": "VariableDeclaration",
                    "scope": 7526,
                    "src": "702:20:3",
                    "stateVariable": false,
                    "storageLocation": "memory",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                      "typeString": "uint256[2]"
                    },
                    "typeName": {
                      "baseType": {
                        "id": 7493,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "702:4:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 7495,
                      "length": {
                        "argumentTypes": null,
                        "hexValue": "32",
                        "id": 7494,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "707:1:3",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_2_by_1",
                          "typeString": "int_const 2"
                        },
                        "value": "2"
                      },
                      "nodeType": "ArrayTypeName",
                      "src": "702:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_uint256_$2_storage_ptr",
                        "typeString": "uint256[2]"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  }
                ],
                "src": "583:140:3"
              },
              "returnParameters": {
                "id": 7498,
                "nodeType": "ParameterList",
                "parameters": [],
                "src": "731:0:3"
              },
              "scope": 7665,
              "src": "560:441:3",
              "stateMutability": "nonpayable",
              "superFunction": null,
              "visibility": "public"
            },
            {
              "body": {
                "id": 7533,
                "nodeType": "Block",
                "src": "1067:39:3",
                "statements": [
                  {
                    "expression": {
                      "argumentTypes": null,
                      "id": 7531,
                      "name": "noOfSolutions",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 7464,
                      "src": "1085:13:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "functionReturnParameters": 7530,
                    "id": 7532,
                    "nodeType": "Return",
                    "src": "1078:20:3"
                  }
                ]
              },
              "documentation": null,
              "id": 7534,
              "implemented": true,
              "kind": "function",
              "modifiers": [],
              "name": "getSolutionsAdded",
              "nodeType": "FunctionDefinition",
              "parameters": {
                "id": 7527,
                "nodeType": "ParameterList",
                "parameters": [],
                "src": "1035:2:3"
              },
              "returnParameters": {
                "id": 7530,
                "nodeType": "ParameterList",
                "parameters": [
                  {
                    "constant": false,
                    "id": 7529,
                    "name": "",
                    "nodeType": "VariableDeclaration",
                    "scope": 7534,
                    "src": "1058:7:3",
                    "stateVariable": false,
                    "storageLocation": "default",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "typeName": {
                      "id": 7528,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "1058:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  }
                ],
                "src": "1057:9:3"
              },
              "scope": 7665,
              "src": "1009:97:3",
              "stateMutability": "view",
              "superFunction": null,
              "visibility": "public"
            },
            {
              "body": {
                "id": 7541,
                "nodeType": "Block",
                "src": "1170:40:3",
                "statements": [
                  {
                    "expression": {
                      "argumentTypes": null,
                      "id": 7539,
                      "name": "noTokensMinted",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 7466,
                      "src": "1188:14:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "functionReturnParameters": 7538,
                    "id": 7540,
                    "nodeType": "Return",
                    "src": "1181:21:3"
                  }
                ]
              },
              "documentation": null,
              "id": 7542,
              "implemented": true,
              "kind": "function",
              "modifiers": [],
              "name": "getTokensMinted",
              "nodeType": "FunctionDefinition",
              "parameters": {
                "id": 7535,
                "nodeType": "ParameterList",
                "parameters": [],
                "src": "1138:2:3"
              },
              "returnParameters": {
                "id": 7538,
                "nodeType": "ParameterList",
                "parameters": [
                  {
                    "constant": false,
                    "id": 7537,
                    "name": "",
                    "nodeType": "VariableDeclaration",
                    "scope": 7542,
                    "src": "1161:7:3",
                    "stateVariable": false,
                    "storageLocation": "default",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "typeName": {
                      "id": 7536,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "1161:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  }
                ],
                "src": "1160:9:3"
              },
              "scope": 7665,
              "src": "1114:96:3",
              "stateMutability": "view",
              "superFunction": null,
              "visibility": "public"
            },
            {
              "body": {
                "id": 7575,
                "nodeType": "Block",
                "src": "1403:66:3",
                "statements": [
                  {
                    "expression": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 7568,
                              "name": "a",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 7546,
                              "src": "1448:1:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                                "typeString": "uint256[2] memory"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 7569,
                              "name": "b",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 7552,
                              "src": "1450:1:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_array$_t_uint256_$2_memory_$2_memory_ptr",
                                "typeString": "uint256[2] memory[2] memory"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 7570,
                              "name": "c",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 7556,
                              "src": "1452:1:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                                "typeString": "uint256[2] memory"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 7571,
                              "name": "input",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 7560,
                              "src": "1454:5:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                                "typeString": "uint256[2] memory"
                              }
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                                "typeString": "uint256[2] memory"
                              },
                              {
                                "typeIdentifier": "t_array$_t_array$_t_uint256_$2_memory_$2_memory_ptr",
                                "typeString": "uint256[2] memory[2] memory"
                              },
                              {
                                "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                                "typeString": "uint256[2] memory"
                              },
                              {
                                "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                                "typeString": "uint256[2] memory"
                              }
                            ],
                            "expression": {
                              "argumentTypes": null,
                              "id": 7566,
                              "name": "abi",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 10544,
                              "src": "1431:3:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_magic_abi",
                                "typeString": "abi"
                              }
                            },
                            "id": 7567,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "memberName": "encodePacked",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": null,
                            "src": "1431:16:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_abiencodepacked_pure$__$returns$_t_bytes_memory_ptr_$",
                              "typeString": "function () pure returns (bytes memory)"
                            }
                          },
                          "id": 7572,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "1431:29:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        ],
                        "id": 7565,
                        "name": "keccak256",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 10551,
                        "src": "1421:9:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_keccak256_pure$_t_bytes_memory_ptr_$returns$_t_bytes32_$",
                          "typeString": "function (bytes memory) pure returns (bytes32)"
                        }
                      },
                      "id": 7573,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "1421:40:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes32",
                        "typeString": "bytes32"
                      }
                    },
                    "functionReturnParameters": 7564,
                    "id": 7574,
                    "nodeType": "Return",
                    "src": "1414:47:3"
                  }
                ]
              },
              "documentation": null,
              "id": 7576,
              "implemented": true,
              "kind": "function",
              "modifiers": [],
              "name": "getHash",
              "nodeType": "FunctionDefinition",
              "parameters": {
                "id": 7561,
                "nodeType": "ParameterList",
                "parameters": [
                  {
                    "constant": false,
                    "id": 7546,
                    "name": "a",
                    "nodeType": "VariableDeclaration",
                    "scope": 7576,
                    "src": "1235:16:3",
                    "stateVariable": false,
                    "storageLocation": "memory",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                      "typeString": "uint256[2]"
                    },
                    "typeName": {
                      "baseType": {
                        "id": 7543,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "1235:4:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 7545,
                      "length": {
                        "argumentTypes": null,
                        "hexValue": "32",
                        "id": 7544,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1240:1:3",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_2_by_1",
                          "typeString": "int_const 2"
                        },
                        "value": "2"
                      },
                      "nodeType": "ArrayTypeName",
                      "src": "1235:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_uint256_$2_storage_ptr",
                        "typeString": "uint256[2]"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  },
                  {
                    "constant": false,
                    "id": 7552,
                    "name": "b",
                    "nodeType": "VariableDeclaration",
                    "scope": 7576,
                    "src": "1274:19:3",
                    "stateVariable": false,
                    "storageLocation": "memory",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_array$_t_uint256_$2_memory_$2_memory_ptr",
                      "typeString": "uint256[2][2]"
                    },
                    "typeName": {
                      "baseType": {
                        "baseType": {
                          "id": 7547,
                          "name": "uint",
                          "nodeType": "ElementaryTypeName",
                          "src": "1274:4:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 7549,
                        "length": {
                          "argumentTypes": null,
                          "hexValue": "32",
                          "id": 7548,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "1279:1:3",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_2_by_1",
                            "typeString": "int_const 2"
                          },
                          "value": "2"
                        },
                        "nodeType": "ArrayTypeName",
                        "src": "1274:7:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$2_storage_ptr",
                          "typeString": "uint256[2]"
                        }
                      },
                      "id": 7551,
                      "length": {
                        "argumentTypes": null,
                        "hexValue": "32",
                        "id": 7550,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1282:1:3",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_2_by_1",
                          "typeString": "int_const 2"
                        },
                        "value": "2"
                      },
                      "nodeType": "ArrayTypeName",
                      "src": "1274:10:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_array$_t_uint256_$2_storage_$2_storage_ptr",
                        "typeString": "uint256[2][2]"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  },
                  {
                    "constant": false,
                    "id": 7556,
                    "name": "c",
                    "nodeType": "VariableDeclaration",
                    "scope": 7576,
                    "src": "1316:16:3",
                    "stateVariable": false,
                    "storageLocation": "memory",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                      "typeString": "uint256[2]"
                    },
                    "typeName": {
                      "baseType": {
                        "id": 7553,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "1316:4:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 7555,
                      "length": {
                        "argumentTypes": null,
                        "hexValue": "32",
                        "id": 7554,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1321:1:3",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_2_by_1",
                          "typeString": "int_const 2"
                        },
                        "value": "2"
                      },
                      "nodeType": "ArrayTypeName",
                      "src": "1316:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_uint256_$2_storage_ptr",
                        "typeString": "uint256[2]"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  },
                  {
                    "constant": false,
                    "id": 7560,
                    "name": "input",
                    "nodeType": "VariableDeclaration",
                    "scope": 7576,
                    "src": "1355:20:3",
                    "stateVariable": false,
                    "storageLocation": "memory",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                      "typeString": "uint256[2]"
                    },
                    "typeName": {
                      "baseType": {
                        "id": 7557,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "1355:4:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 7559,
                      "length": {
                        "argumentTypes": null,
                        "hexValue": "32",
                        "id": 7558,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1360:1:3",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_2_by_1",
                          "typeString": "int_const 2"
                        },
                        "value": "2"
                      },
                      "nodeType": "ArrayTypeName",
                      "src": "1355:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_uint256_$2_storage_ptr",
                        "typeString": "uint256[2]"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  }
                ],
                "src": "1234:142:3"
              },
              "returnParameters": {
                "id": 7564,
                "nodeType": "ParameterList",
                "parameters": [
                  {
                    "constant": false,
                    "id": 7563,
                    "name": "",
                    "nodeType": "VariableDeclaration",
                    "scope": 7576,
                    "src": "1394:7:3",
                    "stateVariable": false,
                    "storageLocation": "default",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    },
                    "typeName": {
                      "id": 7562,
                      "name": "bytes32",
                      "nodeType": "ElementaryTypeName",
                      "src": "1394:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes32",
                        "typeString": "bytes32"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  }
                ],
                "src": "1393:9:3"
              },
              "scope": 7665,
              "src": "1218:251:3",
              "stateMutability": "nonpayable",
              "superFunction": null,
              "visibility": "internal"
            },
            {
              "body": {
                "id": 7595,
                "nodeType": "Block",
                "src": "1517:110:3",
                "statements": [
                  {
                    "expression": {
                      "argumentTypes": null,
                      "id": 7583,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftHandSide": {
                        "argumentTypes": null,
                        "id": 7581,
                        "name": "noOfSolutions",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7464,
                        "src": "1528:13:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "nodeType": "Assignment",
                      "operator": "=",
                      "rightHandSide": {
                        "argumentTypes": null,
                        "hexValue": "30",
                        "id": 7582,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1544:1:3",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_0_by_1",
                          "typeString": "int_const 0"
                        },
                        "value": "0"
                      },
                      "src": "1528:17:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 7584,
                    "nodeType": "ExpressionStatement",
                    "src": "1528:17:3"
                  },
                  {
                    "expression": {
                      "argumentTypes": null,
                      "id": 7587,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftHandSide": {
                        "argumentTypes": null,
                        "id": 7585,
                        "name": "noTokensMinted",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7466,
                        "src": "1556:14:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "nodeType": "Assignment",
                      "operator": "=",
                      "rightHandSide": {
                        "argumentTypes": null,
                        "hexValue": "30",
                        "id": 7586,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1573:1:3",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_0_by_1",
                          "typeString": "int_const 0"
                        },
                        "value": "0"
                      },
                      "src": "1556:18:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 7588,
                    "nodeType": "ExpressionStatement",
                    "src": "1556:18:3"
                  },
                  {
                    "expression": {
                      "argumentTypes": null,
                      "id": 7593,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftHandSide": {
                        "argumentTypes": null,
                        "id": 7589,
                        "name": "zokVerifier",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7462,
                        "src": "1585:11:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_Verifier_$10215",
                          "typeString": "contract Verifier"
                        }
                      },
                      "nodeType": "Assignment",
                      "operator": "=",
                      "rightHandSide": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 7591,
                            "name": "theAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 7578,
                            "src": "1608:10:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          ],
                          "id": 7590,
                          "name": "Verifier",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 10215,
                          "src": "1599:8:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_Verifier_$10215_$",
                            "typeString": "type(contract Verifier)"
                          }
                        },
                        "id": 7592,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "1599:20:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_Verifier_$10215",
                          "typeString": "contract Verifier"
                        }
                      },
                      "src": "1585:34:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_Verifier_$10215",
                        "typeString": "contract Verifier"
                      }
                    },
                    "id": 7594,
                    "nodeType": "ExpressionStatement",
                    "src": "1585:34:3"
                  }
                ]
              },
              "documentation": null,
              "id": 7596,
              "implemented": true,
              "kind": "constructor",
              "modifiers": [],
              "name": "",
              "nodeType": "FunctionDefinition",
              "parameters": {
                "id": 7579,
                "nodeType": "ParameterList",
                "parameters": [
                  {
                    "constant": false,
                    "id": 7578,
                    "name": "theAddress",
                    "nodeType": "VariableDeclaration",
                    "scope": 7596,
                    "src": "1490:18:3",
                    "stateVariable": false,
                    "storageLocation": "default",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    },
                    "typeName": {
                      "id": 7577,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1490:7:3",
                      "stateMutability": "nonpayable",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  }
                ],
                "src": "1489:20:3"
              },
              "returnParameters": {
                "id": 7580,
                "nodeType": "ParameterList",
                "parameters": [],
                "src": "1517:0:3"
              },
              "scope": 7665,
              "src": "1477:150:3",
              "stateMutability": "nonpayable",
              "superFunction": null,
              "visibility": "public"
            },
            {
              "body": {
                "id": 7663,
                "nodeType": "Block",
                "src": "1794:485:3",
                "statements": [
                  {
                    "assignments": [
                      7622
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 7622,
                        "name": "solHash",
                        "nodeType": "VariableDeclaration",
                        "scope": 7663,
                        "src": "1926:15:3",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        },
                        "typeName": {
                          "id": 7621,
                          "name": "bytes32",
                          "nodeType": "ElementaryTypeName",
                          "src": "1926:7:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes32",
                            "typeString": "bytes32"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 7632,
                    "initialValue": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 7626,
                              "name": "a",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 7600,
                              "src": "1971:1:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                                "typeString": "uint256[2] memory"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 7627,
                              "name": "b",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 7606,
                              "src": "1973:1:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_array$_t_uint256_$2_memory_$2_memory_ptr",
                                "typeString": "uint256[2] memory[2] memory"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 7628,
                              "name": "c",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 7610,
                              "src": "1975:1:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                                "typeString": "uint256[2] memory"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 7629,
                              "name": "input",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 7614,
                              "src": "1977:5:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                                "typeString": "uint256[2] memory"
                              }
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                                "typeString": "uint256[2] memory"
                              },
                              {
                                "typeIdentifier": "t_array$_t_array$_t_uint256_$2_memory_$2_memory_ptr",
                                "typeString": "uint256[2] memory[2] memory"
                              },
                              {
                                "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                                "typeString": "uint256[2] memory"
                              },
                              {
                                "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                                "typeString": "uint256[2] memory"
                              }
                            ],
                            "expression": {
                              "argumentTypes": null,
                              "id": 7624,
                              "name": "abi",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 10544,
                              "src": "1954:3:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_magic_abi",
                                "typeString": "abi"
                              }
                            },
                            "id": 7625,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "memberName": "encodePacked",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": null,
                            "src": "1954:16:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_abiencodepacked_pure$__$returns$_t_bytes_memory_ptr_$",
                              "typeString": "function () pure returns (bytes memory)"
                            }
                          },
                          "id": 7630,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "1954:29:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        ],
                        "id": 7623,
                        "name": "keccak256",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 10551,
                        "src": "1944:9:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_keccak256_pure$_t_bytes_memory_ptr_$returns$_t_bytes32_$",
                          "typeString": "function (bytes memory) pure returns (bytes32)"
                        }
                      },
                      "id": 7631,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "1944:40:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes32",
                        "typeString": "bytes32"
                      }
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "1926:58:3"
                  },
                  {
                    "expression": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          },
                          "id": 7641,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 7634,
                                "name": "solutions",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 7470,
                                "src": "2020:9:3",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_mapping$_t_bytes32_$_t_struct$_solution_$7460_storage_$",
                                  "typeString": "mapping(bytes32 => struct SoInSquareVerifier.solution storage ref)"
                                }
                              },
                              "id": 7636,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 7635,
                                "name": "solHash",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 7622,
                                "src": "2030:7:3",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_bytes32",
                                  "typeString": "bytes32"
                                }
                              },
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "nodeType": "IndexAccess",
                              "src": "2020:18:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_solution_$7460_storage",
                                "typeString": "struct SoInSquareVerifier.solution storage ref"
                              }
                            },
                            "id": 7637,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "solutionAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 7459,
                            "src": "2020:34:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "==",
                          "rightExpression": {
                            "argumentTypes": null,
                            "arguments": [
                              {
                                "argumentTypes": null,
                                "hexValue": "30",
                                "id": 7639,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": true,
                                "kind": "number",
                                "lValueRequested": false,
                                "nodeType": "Literal",
                                "src": "2066:1:3",
                                "subdenomination": null,
                                "typeDescriptions": {
                                  "typeIdentifier": "t_rational_0_by_1",
                                  "typeString": "int_const 0"
                                },
                                "value": "0"
                              }
                            ],
                            "expression": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_rational_0_by_1",
                                  "typeString": "int_const 0"
                                }
                              ],
                              "id": 7638,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "lValueRequested": false,
                              "nodeType": "ElementaryTypeNameExpression",
                              "src": "2058:7:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_type$_t_address_$",
                                "typeString": "type(address)"
                              },
                              "typeName": "address"
                            },
                            "id": 7640,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "typeConversion",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "2058:10:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address_payable",
                              "typeString": "address payable"
                            }
                          },
                          "src": "2020:48:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "hexValue": "736f6c7574696f6e20616c726561647920657869737473",
                          "id": 7642,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "string",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "2070:25:3",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_stringliteral_7f0d7b4edab81ae20b48681c20a6bbabcf62719437d6b348f0e9c50f475031a1",
                            "typeString": "literal_string \"solution already exists\""
                          },
                          "value": "solution already exists"
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          },
                          {
                            "typeIdentifier": "t_stringliteral_7f0d7b4edab81ae20b48681c20a6bbabcf62719437d6b348f0e9c50f475031a1",
                            "typeString": "literal_string \"solution already exists\""
                          }
                        ],
                        "id": 7633,
                        "name": "require",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [
                          10560,
                          10561
                        ],
                        "referencedDeclaration": 10561,
                        "src": "2012:7:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                          "typeString": "function (bool,string memory) pure"
                        }
                      },
                      "id": 7643,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "2012:84:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_tuple$__$",
                        "typeString": "tuple()"
                      }
                    },
                    "id": 7644,
                    "nodeType": "ExpressionStatement",
                    "src": "2012:84:3"
                  },
                  {
                    "expression": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "id": 7646,
                          "name": "newAddress",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7616,
                          "src": "2139:10:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 7647,
                          "name": "newId",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7618,
                          "src": "2151:5:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 7648,
                          "name": "a",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7600,
                          "src": "2158:1:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                            "typeString": "uint256[2] memory"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 7649,
                          "name": "b",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7606,
                          "src": "2161:1:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_array$_t_uint256_$2_memory_$2_memory_ptr",
                            "typeString": "uint256[2] memory[2] memory"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 7650,
                          "name": "c",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7610,
                          "src": "2164:1:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                            "typeString": "uint256[2] memory"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 7651,
                          "name": "input",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7614,
                          "src": "2167:5:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                            "typeString": "uint256[2] memory"
                          }
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          },
                          {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          {
                            "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                            "typeString": "uint256[2] memory"
                          },
                          {
                            "typeIdentifier": "t_array$_t_array$_t_uint256_$2_memory_$2_memory_ptr",
                            "typeString": "uint256[2] memory[2] memory"
                          },
                          {
                            "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                            "typeString": "uint256[2] memory"
                          },
                          {
                            "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                            "typeString": "uint256[2] memory"
                          }
                        ],
                        "id": 7645,
                        "name": "addNewSolution",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7526,
                        "src": "2124:14:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_uint256_$_t_array$_t_uint256_$2_memory_ptr_$_t_array$_t_array$_t_uint256_$2_memory_$2_memory_ptr_$_t_array$_t_uint256_$2_memory_ptr_$_t_array$_t_uint256_$2_memory_ptr_$returns$__$",
                          "typeString": "function (address,uint256,uint256[2] memory,uint256[2] memory[2] memory,uint256[2] memory,uint256[2] memory)"
                        }
                      },
                      "id": 7652,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "2124:49:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_tuple$__$",
                        "typeString": "tuple()"
                      }
                    },
                    "id": 7653,
                    "nodeType": "ExpressionStatement",
                    "src": "2124:49:3"
                  },
                  {
                    "expression": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "id": 7655,
                          "name": "newAddress",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7616,
                          "src": "2206:10:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 7656,
                          "name": "newId",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7618,
                          "src": "2218:5:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          },
                          {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        ],
                        "id": 7654,
                        "name": "mint",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1123,
                        "src": "2201:4:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_uint256_$returns$_t_bool_$",
                          "typeString": "function (address,uint256) returns (bool)"
                        }
                      },
                      "id": 7657,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "2201:23:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "id": 7658,
                    "nodeType": "ExpressionStatement",
                    "src": "2201:23:3"
                  },
                  {
                    "expression": {
                      "argumentTypes": null,
                      "id": 7661,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftHandSide": {
                        "argumentTypes": null,
                        "id": 7659,
                        "name": "noTokensMinted",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7466,
                        "src": "2252:14:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "nodeType": "Assignment",
                      "operator": "+=",
                      "rightHandSide": {
                        "argumentTypes": null,
                        "hexValue": "31",
                        "id": 7660,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "2270:1:3",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_1_by_1",
                          "typeString": "int_const 1"
                        },
                        "value": "1"
                      },
                      "src": "2252:19:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 7662,
                    "nodeType": "ExpressionStatement",
                    "src": "2252:19:3"
                  }
                ]
              },
              "documentation": null,
              "id": 7664,
              "implemented": true,
              "kind": "function",
              "modifiers": [],
              "name": "mintNFT",
              "nodeType": "FunctionDefinition",
              "parameters": {
                "id": 7619,
                "nodeType": "ParameterList",
                "parameters": [
                  {
                    "constant": false,
                    "id": 7600,
                    "name": "a",
                    "nodeType": "VariableDeclaration",
                    "scope": 7664,
                    "src": "1652:16:3",
                    "stateVariable": false,
                    "storageLocation": "memory",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                      "typeString": "uint256[2]"
                    },
                    "typeName": {
                      "baseType": {
                        "id": 7597,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "1652:4:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 7599,
                      "length": {
                        "argumentTypes": null,
                        "hexValue": "32",
                        "id": 7598,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1657:1:3",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_2_by_1",
                          "typeString": "int_const 2"
                        },
                        "value": "2"
                      },
                      "nodeType": "ArrayTypeName",
                      "src": "1652:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_uint256_$2_storage_ptr",
                        "typeString": "uint256[2]"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  },
                  {
                    "constant": false,
                    "id": 7606,
                    "name": "b",
                    "nodeType": "VariableDeclaration",
                    "scope": 7664,
                    "src": "1669:19:3",
                    "stateVariable": false,
                    "storageLocation": "memory",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_array$_t_uint256_$2_memory_$2_memory_ptr",
                      "typeString": "uint256[2][2]"
                    },
                    "typeName": {
                      "baseType": {
                        "baseType": {
                          "id": 7601,
                          "name": "uint",
                          "nodeType": "ElementaryTypeName",
                          "src": "1669:4:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 7603,
                        "length": {
                          "argumentTypes": null,
                          "hexValue": "32",
                          "id": 7602,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "1674:1:3",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_2_by_1",
                            "typeString": "int_const 2"
                          },
                          "value": "2"
                        },
                        "nodeType": "ArrayTypeName",
                        "src": "1669:7:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$2_storage_ptr",
                          "typeString": "uint256[2]"
                        }
                      },
                      "id": 7605,
                      "length": {
                        "argumentTypes": null,
                        "hexValue": "32",
                        "id": 7604,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1677:1:3",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_2_by_1",
                          "typeString": "int_const 2"
                        },
                        "value": "2"
                      },
                      "nodeType": "ArrayTypeName",
                      "src": "1669:10:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_array$_t_uint256_$2_storage_$2_storage_ptr",
                        "typeString": "uint256[2][2]"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  },
                  {
                    "constant": false,
                    "id": 7610,
                    "name": "c",
                    "nodeType": "VariableDeclaration",
                    "scope": 7664,
                    "src": "1712:16:3",
                    "stateVariable": false,
                    "storageLocation": "memory",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                      "typeString": "uint256[2]"
                    },
                    "typeName": {
                      "baseType": {
                        "id": 7607,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "1712:4:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 7609,
                      "length": {
                        "argumentTypes": null,
                        "hexValue": "32",
                        "id": 7608,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1717:1:3",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_2_by_1",
                          "typeString": "int_const 2"
                        },
                        "value": "2"
                      },
                      "nodeType": "ArrayTypeName",
                      "src": "1712:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_uint256_$2_storage_ptr",
                        "typeString": "uint256[2]"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  },
                  {
                    "constant": false,
                    "id": 7614,
                    "name": "input",
                    "nodeType": "VariableDeclaration",
                    "scope": 7664,
                    "src": "1730:20:3",
                    "stateVariable": false,
                    "storageLocation": "memory",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                      "typeString": "uint256[2]"
                    },
                    "typeName": {
                      "baseType": {
                        "id": 7611,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "1730:4:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 7613,
                      "length": {
                        "argumentTypes": null,
                        "hexValue": "32",
                        "id": 7612,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1735:1:3",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_2_by_1",
                          "typeString": "int_const 2"
                        },
                        "value": "2"
                      },
                      "nodeType": "ArrayTypeName",
                      "src": "1730:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_uint256_$2_storage_ptr",
                        "typeString": "uint256[2]"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  },
                  {
                    "constant": false,
                    "id": 7616,
                    "name": "newAddress",
                    "nodeType": "VariableDeclaration",
                    "scope": 7664,
                    "src": "1752:18:3",
                    "stateVariable": false,
                    "storageLocation": "default",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    },
                    "typeName": {
                      "id": 7615,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1752:7:3",
                      "stateMutability": "nonpayable",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  },
                  {
                    "constant": false,
                    "id": 7618,
                    "name": "newId",
                    "nodeType": "VariableDeclaration",
                    "scope": 7664,
                    "src": "1772:13:3",
                    "stateVariable": false,
                    "storageLocation": "default",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "typeName": {
                      "id": 7617,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "1772:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  }
                ],
                "src": "1651:135:3"
              },
              "returnParameters": {
                "id": 7620,
                "nodeType": "ParameterList",
                "parameters": [],
                "src": "1794:0:3"
              },
              "scope": 7665,
              "src": "1635:644:3",
              "stateMutability": "nonpayable",
              "superFunction": null,
              "visibility": "public"
            }
          ],
          "scope": 7666,
          "src": "208:2074:3"
        }
      ],
      "src": "0:3007:3"
    },
    "legacyAST": {
      "absolutePath": "/C/Users/jb7741/Downloads/udacity/Blockchain-Capstone/eth-contracts/contracts/SolnSquareVerifier.sol",
      "exportedSymbols": {
        "SoInSquareVerifier": [
          7665
        ]
      },
      "id": 7666,
      "nodeType": "SourceUnit",
      "nodes": [
        {
          "id": 7451,
          "literals": [
            "solidity",
            ">=",
            "0.4",
            ".21",
            "<",
            "0.6",
            ".0"
          ],
          "nodeType": "PragmaDirective",
          "src": "0:32:3"
        },
        {
          "absolutePath": "/C/Users/jb7741/Downloads/udacity/Blockchain-Capstone/eth-contracts/contracts/ERC721Mintable.sol",
          "file": "./ERC721Mintable.sol",
          "id": 7452,
          "nodeType": "ImportDirective",
          "scope": 7666,
          "sourceUnit": 1125,
          "src": "36:30:3",
          "symbolAliases": [],
          "unitAlias": ""
        },
        {
          "absolutePath": "/C/Users/jb7741/Downloads/udacity/Blockchain-Capstone/eth-contracts/contracts/Verifier.sol",
          "file": "./Verifier.sol",
          "id": 7453,
          "nodeType": "ImportDirective",
          "scope": 7666,
          "sourceUnit": 10216,
          "src": "68:24:3",
          "symbolAliases": [],
          "unitAlias": ""
        },
        {
          "baseContracts": [
            {
              "arguments": null,
              "baseName": {
                "contractScope": null,
                "id": 7454,
                "name": "customERC721Token",
                "nodeType": "UserDefinedTypeName",
                "referencedDeclaration": 1124,
                "src": "239:17:3",
                "typeDescriptions": {
                  "typeIdentifier": "t_contract$_customERC721Token_$1124",
                  "typeString": "contract customERC721Token"
                }
              },
              "id": 7455,
              "nodeType": "InheritanceSpecifier",
              "src": "239:17:3"
            }
          ],
          "contractDependencies": [
            72,
            131,
            682,
            980,
            1091,
            177,
            1124,
            7449
          ],
          "contractKind": "contract",
          "documentation": null,
          "fullyImplemented": true,
          "id": 7665,
          "linearizedBaseContracts": [
            7665,
            1124,
            1091,
            7449,
            980,
            682,
            177,
            131,
            72
          ],
          "name": "SoInSquareVerifier",
          "nodeType": "ContractDefinition",
          "nodes": [
            {
              "canonicalName": "SoInSquareVerifier.solution",
              "id": 7460,
              "members": [
                {
                  "constant": false,
                  "id": 7457,
                  "name": "solutionIndex",
                  "nodeType": "VariableDeclaration",
                  "scope": 7460,
                  "src": "293:22:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 7456,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "293:7:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 7459,
                  "name": "solutionAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 7460,
                  "src": "328:23:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 7458,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "328:7:3",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "name": "solution",
              "nodeType": "StructDefinition",
              "scope": 7665,
              "src": "264:96:3",
              "visibility": "public"
            },
            {
              "constant": false,
              "id": 7462,
              "name": "zokVerifier",
              "nodeType": "VariableDeclaration",
              "scope": 7665,
              "src": "368:20:3",
              "stateVariable": true,
              "storageLocation": "default",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Verifier_$10215",
                "typeString": "contract Verifier"
              },
              "typeName": {
                "contractScope": null,
                "id": 7461,
                "name": "Verifier",
                "nodeType": "UserDefinedTypeName",
                "referencedDeclaration": 10215,
                "src": "368:8:3",
                "typeDescriptions": {
                  "typeIdentifier": "t_contract$_Verifier_$10215",
                  "typeString": "contract Verifier"
                }
              },
              "value": null,
              "visibility": "internal"
            },
            {
              "constant": false,
              "id": 7464,
              "name": "noOfSolutions",
              "nodeType": "VariableDeclaration",
              "scope": 7665,
              "src": "397:21:3",
              "stateVariable": true,
              "storageLocation": "default",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              },
              "typeName": {
                "id": 7463,
                "name": "uint256",
                "nodeType": "ElementaryTypeName",
                "src": "397:7:3",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                }
              },
              "value": null,
              "visibility": "internal"
            },
            {
              "constant": false,
              "id": 7466,
              "name": "noTokensMinted",
              "nodeType": "VariableDeclaration",
              "scope": 7665,
              "src": "427:22:3",
              "stateVariable": true,
              "storageLocation": "default",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              },
              "typeName": {
                "id": 7465,
                "name": "uint256",
                "nodeType": "ElementaryTypeName",
                "src": "427:7:3",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                }
              },
              "value": null,
              "visibility": "internal"
            },
            {
              "constant": false,
              "id": 7470,
              "name": "solutions",
              "nodeType": "VariableDeclaration",
              "scope": 7665,
              "src": "458:46:3",
              "stateVariable": true,
              "storageLocation": "default",
              "typeDescriptions": {
                "typeIdentifier": "t_mapping$_t_bytes32_$_t_struct$_solution_$7460_storage_$",
                "typeString": "mapping(bytes32 => struct SoInSquareVerifier.solution)"
              },
              "typeName": {
                "id": 7469,
                "keyType": {
                  "id": 7467,
                  "name": "bytes32",
                  "nodeType": "ElementaryTypeName",
                  "src": "466:7:3",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  }
                },
                "nodeType": "Mapping",
                "src": "458:28:3",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_bytes32_$_t_struct$_solution_$7460_storage_$",
                  "typeString": "mapping(bytes32 => struct SoInSquareVerifier.solution)"
                },
                "valueType": {
                  "contractScope": null,
                  "id": 7468,
                  "name": "solution",
                  "nodeType": "UserDefinedTypeName",
                  "referencedDeclaration": 7460,
                  "src": "477:8:3",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_solution_$7460_storage_ptr",
                    "typeString": "struct SoInSquareVerifier.solution"
                  }
                }
              },
              "value": null,
              "visibility": "private"
            },
            {
              "anonymous": false,
              "documentation": null,
              "id": 7474,
              "name": "addSolution",
              "nodeType": "EventDefinition",
              "parameters": {
                "id": 7473,
                "nodeType": "ParameterList",
                "parameters": [
                  {
                    "constant": false,
                    "id": 7472,
                    "indexed": false,
                    "name": "newSolution",
                    "nodeType": "VariableDeclaration",
                    "scope": 7474,
                    "src": "531:19:3",
                    "stateVariable": false,
                    "storageLocation": "default",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    },
                    "typeName": {
                      "id": 7471,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "531:7:3",
                      "stateMutability": "nonpayable",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  }
                ],
                "src": "530:21:3"
              },
              "src": "513:39:3"
            },
            {
              "body": {
                "id": 7525,
                "nodeType": "Block",
                "src": "731:270:3",
                "statements": [
                  {
                    "assignments": [
                      7500
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 7500,
                        "name": "solutionHash",
                        "nodeType": "VariableDeclaration",
                        "scope": 7525,
                        "src": "742:20:3",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        },
                        "typeName": {
                          "id": 7499,
                          "name": "bytes32",
                          "nodeType": "ElementaryTypeName",
                          "src": "742:7:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes32",
                            "typeString": "bytes32"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 7507,
                    "initialValue": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "id": 7502,
                          "name": "a",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7482,
                          "src": "773:1:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                            "typeString": "uint256[2] memory"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 7503,
                          "name": "b",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7488,
                          "src": "775:1:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_array$_t_uint256_$2_memory_$2_memory_ptr",
                            "typeString": "uint256[2] memory[2] memory"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 7504,
                          "name": "c",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7492,
                          "src": "777:1:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                            "typeString": "uint256[2] memory"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 7505,
                          "name": "input",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7496,
                          "src": "779:5:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                            "typeString": "uint256[2] memory"
                          }
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                            "typeString": "uint256[2] memory"
                          },
                          {
                            "typeIdentifier": "t_array$_t_array$_t_uint256_$2_memory_$2_memory_ptr",
                            "typeString": "uint256[2] memory[2] memory"
                          },
                          {
                            "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                            "typeString": "uint256[2] memory"
                          },
                          {
                            "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                            "typeString": "uint256[2] memory"
                          }
                        ],
                        "id": 7501,
                        "name": "getHash",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7576,
                        "src": "765:7:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_nonpayable$_t_array$_t_uint256_$2_memory_ptr_$_t_array$_t_array$_t_uint256_$2_memory_$2_memory_ptr_$_t_array$_t_uint256_$2_memory_ptr_$_t_array$_t_uint256_$2_memory_ptr_$returns$_t_bytes32_$",
                          "typeString": "function (uint256[2] memory,uint256[2] memory[2] memory,uint256[2] memory,uint256[2] memory) returns (bytes32)"
                        }
                      },
                      "id": 7506,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "765:20:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes32",
                        "typeString": "bytes32"
                      }
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "742:43:3"
                  },
                  {
                    "expression": {
                      "argumentTypes": null,
                      "id": 7515,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftHandSide": {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 7508,
                          "name": "solutions",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7470,
                          "src": "796:9:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_bytes32_$_t_struct$_solution_$7460_storage_$",
                            "typeString": "mapping(bytes32 => struct SoInSquareVerifier.solution storage ref)"
                          }
                        },
                        "id": 7510,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 7509,
                          "name": "solutionHash",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7500,
                          "src": "806:12:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes32",
                            "typeString": "bytes32"
                          }
                        },
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": true,
                        "nodeType": "IndexAccess",
                        "src": "796:23:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_solution_$7460_storage",
                          "typeString": "struct SoInSquareVerifier.solution storage ref"
                        }
                      },
                      "nodeType": "Assignment",
                      "operator": "=",
                      "rightHandSide": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 7512,
                            "name": "solutionId",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 7478,
                            "src": "861:10:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 7513,
                            "name": "newAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 7476,
                            "src": "903:10:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": null,
                          "id": 7511,
                          "name": "solution",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7460,
                          "src": "822:8:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_struct$_solution_$7460_storage_ptr_$",
                            "typeString": "type(struct SoInSquareVerifier.solution storage pointer)"
                          }
                        },
                        "id": 7514,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "structConstructorCall",
                        "lValueRequested": false,
                        "names": [
                          "solutionIndex",
                          "solutionAddress"
                        ],
                        "nodeType": "FunctionCall",
                        "src": "822:103:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_solution_$7460_memory",
                          "typeString": "struct SoInSquareVerifier.solution memory"
                        }
                      },
                      "src": "796:129:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_solution_$7460_storage",
                        "typeString": "struct SoInSquareVerifier.solution storage ref"
                      }
                    },
                    "id": 7516,
                    "nodeType": "ExpressionStatement",
                    "src": "796:129:3"
                  },
                  {
                    "expression": {
                      "argumentTypes": null,
                      "id": 7519,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftHandSide": {
                        "argumentTypes": null,
                        "id": 7517,
                        "name": "noOfSolutions",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7464,
                        "src": "936:13:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "nodeType": "Assignment",
                      "operator": "+=",
                      "rightHandSide": {
                        "argumentTypes": null,
                        "hexValue": "31",
                        "id": 7518,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "953:1:3",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_1_by_1",
                          "typeString": "int_const 1"
                        },
                        "value": "1"
                      },
                      "src": "936:18:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 7520,
                    "nodeType": "ExpressionStatement",
                    "src": "936:18:3"
                  },
                  {
                    "eventCall": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "id": 7522,
                          "name": "newAddress",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7476,
                          "src": "982:10:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        ],
                        "id": 7521,
                        "name": "addSolution",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7474,
                        "src": "970:11:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_event_nonpayable$_t_address_$returns$__$",
                          "typeString": "function (address)"
                        }
                      },
                      "id": 7523,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "970:23:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_tuple$__$",
                        "typeString": "tuple()"
                      }
                    },
                    "id": 7524,
                    "nodeType": "EmitStatement",
                    "src": "965:28:3"
                  }
                ]
              },
              "documentation": null,
              "id": 7526,
              "implemented": true,
              "kind": "function",
              "modifiers": [],
              "name": "addNewSolution",
              "nodeType": "FunctionDefinition",
              "parameters": {
                "id": 7497,
                "nodeType": "ParameterList",
                "parameters": [
                  {
                    "constant": false,
                    "id": 7476,
                    "name": "newAddress",
                    "nodeType": "VariableDeclaration",
                    "scope": 7526,
                    "src": "584:18:3",
                    "stateVariable": false,
                    "storageLocation": "default",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    },
                    "typeName": {
                      "id": 7475,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "584:7:3",
                      "stateMutability": "nonpayable",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  },
                  {
                    "constant": false,
                    "id": 7478,
                    "name": "solutionId",
                    "nodeType": "VariableDeclaration",
                    "scope": 7526,
                    "src": "604:18:3",
                    "stateVariable": false,
                    "storageLocation": "default",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "typeName": {
                      "id": 7477,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "604:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  },
                  {
                    "constant": false,
                    "id": 7482,
                    "name": "a",
                    "nodeType": "VariableDeclaration",
                    "scope": 7526,
                    "src": "624:16:3",
                    "stateVariable": false,
                    "storageLocation": "memory",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                      "typeString": "uint256[2]"
                    },
                    "typeName": {
                      "baseType": {
                        "id": 7479,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "624:4:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 7481,
                      "length": {
                        "argumentTypes": null,
                        "hexValue": "32",
                        "id": 7480,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "629:1:3",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_2_by_1",
                          "typeString": "int_const 2"
                        },
                        "value": "2"
                      },
                      "nodeType": "ArrayTypeName",
                      "src": "624:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_uint256_$2_storage_ptr",
                        "typeString": "uint256[2]"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  },
                  {
                    "constant": false,
                    "id": 7488,
                    "name": "b",
                    "nodeType": "VariableDeclaration",
                    "scope": 7526,
                    "src": "641:19:3",
                    "stateVariable": false,
                    "storageLocation": "memory",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_array$_t_uint256_$2_memory_$2_memory_ptr",
                      "typeString": "uint256[2][2]"
                    },
                    "typeName": {
                      "baseType": {
                        "baseType": {
                          "id": 7483,
                          "name": "uint",
                          "nodeType": "ElementaryTypeName",
                          "src": "641:4:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 7485,
                        "length": {
                          "argumentTypes": null,
                          "hexValue": "32",
                          "id": 7484,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "646:1:3",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_2_by_1",
                            "typeString": "int_const 2"
                          },
                          "value": "2"
                        },
                        "nodeType": "ArrayTypeName",
                        "src": "641:7:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$2_storage_ptr",
                          "typeString": "uint256[2]"
                        }
                      },
                      "id": 7487,
                      "length": {
                        "argumentTypes": null,
                        "hexValue": "32",
                        "id": 7486,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "649:1:3",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_2_by_1",
                          "typeString": "int_const 2"
                        },
                        "value": "2"
                      },
                      "nodeType": "ArrayTypeName",
                      "src": "641:10:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_array$_t_uint256_$2_storage_$2_storage_ptr",
                        "typeString": "uint256[2][2]"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  },
                  {
                    "constant": false,
                    "id": 7492,
                    "name": "c",
                    "nodeType": "VariableDeclaration",
                    "scope": 7526,
                    "src": "684:16:3",
                    "stateVariable": false,
                    "storageLocation": "memory",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                      "typeString": "uint256[2]"
                    },
                    "typeName": {
                      "baseType": {
                        "id": 7489,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "684:4:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 7491,
                      "length": {
                        "argumentTypes": null,
                        "hexValue": "32",
                        "id": 7490,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "689:1:3",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_2_by_1",
                          "typeString": "int_const 2"
                        },
                        "value": "2"
                      },
                      "nodeType": "ArrayTypeName",
                      "src": "684:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_uint256_$2_storage_ptr",
                        "typeString": "uint256[2]"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  },
                  {
                    "constant": false,
                    "id": 7496,
                    "name": "input",
                    "nodeType": "VariableDeclaration",
                    "scope": 7526,
                    "src": "702:20:3",
                    "stateVariable": false,
                    "storageLocation": "memory",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                      "typeString": "uint256[2]"
                    },
                    "typeName": {
                      "baseType": {
                        "id": 7493,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "702:4:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 7495,
                      "length": {
                        "argumentTypes": null,
                        "hexValue": "32",
                        "id": 7494,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "707:1:3",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_2_by_1",
                          "typeString": "int_const 2"
                        },
                        "value": "2"
                      },
                      "nodeType": "ArrayTypeName",
                      "src": "702:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_uint256_$2_storage_ptr",
                        "typeString": "uint256[2]"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  }
                ],
                "src": "583:140:3"
              },
              "returnParameters": {
                "id": 7498,
                "nodeType": "ParameterList",
                "parameters": [],
                "src": "731:0:3"
              },
              "scope": 7665,
              "src": "560:441:3",
              "stateMutability": "nonpayable",
              "superFunction": null,
              "visibility": "public"
            },
            {
              "body": {
                "id": 7533,
                "nodeType": "Block",
                "src": "1067:39:3",
                "statements": [
                  {
                    "expression": {
                      "argumentTypes": null,
                      "id": 7531,
                      "name": "noOfSolutions",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 7464,
                      "src": "1085:13:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "functionReturnParameters": 7530,
                    "id": 7532,
                    "nodeType": "Return",
                    "src": "1078:20:3"
                  }
                ]
              },
              "documentation": null,
              "id": 7534,
              "implemented": true,
              "kind": "function",
              "modifiers": [],
              "name": "getSolutionsAdded",
              "nodeType": "FunctionDefinition",
              "parameters": {
                "id": 7527,
                "nodeType": "ParameterList",
                "parameters": [],
                "src": "1035:2:3"
              },
              "returnParameters": {
                "id": 7530,
                "nodeType": "ParameterList",
                "parameters": [
                  {
                    "constant": false,
                    "id": 7529,
                    "name": "",
                    "nodeType": "VariableDeclaration",
                    "scope": 7534,
                    "src": "1058:7:3",
                    "stateVariable": false,
                    "storageLocation": "default",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "typeName": {
                      "id": 7528,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "1058:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  }
                ],
                "src": "1057:9:3"
              },
              "scope": 7665,
              "src": "1009:97:3",
              "stateMutability": "view",
              "superFunction": null,
              "visibility": "public"
            },
            {
              "body": {
                "id": 7541,
                "nodeType": "Block",
                "src": "1170:40:3",
                "statements": [
                  {
                    "expression": {
                      "argumentTypes": null,
                      "id": 7539,
                      "name": "noTokensMinted",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 7466,
                      "src": "1188:14:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "functionReturnParameters": 7538,
                    "id": 7540,
                    "nodeType": "Return",
                    "src": "1181:21:3"
                  }
                ]
              },
              "documentation": null,
              "id": 7542,
              "implemented": true,
              "kind": "function",
              "modifiers": [],
              "name": "getTokensMinted",
              "nodeType": "FunctionDefinition",
              "parameters": {
                "id": 7535,
                "nodeType": "ParameterList",
                "parameters": [],
                "src": "1138:2:3"
              },
              "returnParameters": {
                "id": 7538,
                "nodeType": "ParameterList",
                "parameters": [
                  {
                    "constant": false,
                    "id": 7537,
                    "name": "",
                    "nodeType": "VariableDeclaration",
                    "scope": 7542,
                    "src": "1161:7:3",
                    "stateVariable": false,
                    "storageLocation": "default",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "typeName": {
                      "id": 7536,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "1161:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  }
                ],
                "src": "1160:9:3"
              },
              "scope": 7665,
              "src": "1114:96:3",
              "stateMutability": "view",
              "superFunction": null,
              "visibility": "public"
            },
            {
              "body": {
                "id": 7575,
                "nodeType": "Block",
                "src": "1403:66:3",
                "statements": [
                  {
                    "expression": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 7568,
                              "name": "a",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 7546,
                              "src": "1448:1:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                                "typeString": "uint256[2] memory"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 7569,
                              "name": "b",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 7552,
                              "src": "1450:1:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_array$_t_uint256_$2_memory_$2_memory_ptr",
                                "typeString": "uint256[2] memory[2] memory"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 7570,
                              "name": "c",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 7556,
                              "src": "1452:1:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                                "typeString": "uint256[2] memory"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 7571,
                              "name": "input",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 7560,
                              "src": "1454:5:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                                "typeString": "uint256[2] memory"
                              }
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                                "typeString": "uint256[2] memory"
                              },
                              {
                                "typeIdentifier": "t_array$_t_array$_t_uint256_$2_memory_$2_memory_ptr",
                                "typeString": "uint256[2] memory[2] memory"
                              },
                              {
                                "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                                "typeString": "uint256[2] memory"
                              },
                              {
                                "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                                "typeString": "uint256[2] memory"
                              }
                            ],
                            "expression": {
                              "argumentTypes": null,
                              "id": 7566,
                              "name": "abi",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 10544,
                              "src": "1431:3:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_magic_abi",
                                "typeString": "abi"
                              }
                            },
                            "id": 7567,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "memberName": "encodePacked",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": null,
                            "src": "1431:16:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_abiencodepacked_pure$__$returns$_t_bytes_memory_ptr_$",
                              "typeString": "function () pure returns (bytes memory)"
                            }
                          },
                          "id": 7572,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "1431:29:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        ],
                        "id": 7565,
                        "name": "keccak256",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 10551,
                        "src": "1421:9:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_keccak256_pure$_t_bytes_memory_ptr_$returns$_t_bytes32_$",
                          "typeString": "function (bytes memory) pure returns (bytes32)"
                        }
                      },
                      "id": 7573,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "1421:40:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes32",
                        "typeString": "bytes32"
                      }
                    },
                    "functionReturnParameters": 7564,
                    "id": 7574,
                    "nodeType": "Return",
                    "src": "1414:47:3"
                  }
                ]
              },
              "documentation": null,
              "id": 7576,
              "implemented": true,
              "kind": "function",
              "modifiers": [],
              "name": "getHash",
              "nodeType": "FunctionDefinition",
              "parameters": {
                "id": 7561,
                "nodeType": "ParameterList",
                "parameters": [
                  {
                    "constant": false,
                    "id": 7546,
                    "name": "a",
                    "nodeType": "VariableDeclaration",
                    "scope": 7576,
                    "src": "1235:16:3",
                    "stateVariable": false,
                    "storageLocation": "memory",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                      "typeString": "uint256[2]"
                    },
                    "typeName": {
                      "baseType": {
                        "id": 7543,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "1235:4:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 7545,
                      "length": {
                        "argumentTypes": null,
                        "hexValue": "32",
                        "id": 7544,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1240:1:3",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_2_by_1",
                          "typeString": "int_const 2"
                        },
                        "value": "2"
                      },
                      "nodeType": "ArrayTypeName",
                      "src": "1235:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_uint256_$2_storage_ptr",
                        "typeString": "uint256[2]"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  },
                  {
                    "constant": false,
                    "id": 7552,
                    "name": "b",
                    "nodeType": "VariableDeclaration",
                    "scope": 7576,
                    "src": "1274:19:3",
                    "stateVariable": false,
                    "storageLocation": "memory",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_array$_t_uint256_$2_memory_$2_memory_ptr",
                      "typeString": "uint256[2][2]"
                    },
                    "typeName": {
                      "baseType": {
                        "baseType": {
                          "id": 7547,
                          "name": "uint",
                          "nodeType": "ElementaryTypeName",
                          "src": "1274:4:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 7549,
                        "length": {
                          "argumentTypes": null,
                          "hexValue": "32",
                          "id": 7548,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "1279:1:3",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_2_by_1",
                            "typeString": "int_const 2"
                          },
                          "value": "2"
                        },
                        "nodeType": "ArrayTypeName",
                        "src": "1274:7:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$2_storage_ptr",
                          "typeString": "uint256[2]"
                        }
                      },
                      "id": 7551,
                      "length": {
                        "argumentTypes": null,
                        "hexValue": "32",
                        "id": 7550,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1282:1:3",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_2_by_1",
                          "typeString": "int_const 2"
                        },
                        "value": "2"
                      },
                      "nodeType": "ArrayTypeName",
                      "src": "1274:10:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_array$_t_uint256_$2_storage_$2_storage_ptr",
                        "typeString": "uint256[2][2]"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  },
                  {
                    "constant": false,
                    "id": 7556,
                    "name": "c",
                    "nodeType": "VariableDeclaration",
                    "scope": 7576,
                    "src": "1316:16:3",
                    "stateVariable": false,
                    "storageLocation": "memory",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                      "typeString": "uint256[2]"
                    },
                    "typeName": {
                      "baseType": {
                        "id": 7553,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "1316:4:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 7555,
                      "length": {
                        "argumentTypes": null,
                        "hexValue": "32",
                        "id": 7554,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1321:1:3",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_2_by_1",
                          "typeString": "int_const 2"
                        },
                        "value": "2"
                      },
                      "nodeType": "ArrayTypeName",
                      "src": "1316:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_uint256_$2_storage_ptr",
                        "typeString": "uint256[2]"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  },
                  {
                    "constant": false,
                    "id": 7560,
                    "name": "input",
                    "nodeType": "VariableDeclaration",
                    "scope": 7576,
                    "src": "1355:20:3",
                    "stateVariable": false,
                    "storageLocation": "memory",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                      "typeString": "uint256[2]"
                    },
                    "typeName": {
                      "baseType": {
                        "id": 7557,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "1355:4:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 7559,
                      "length": {
                        "argumentTypes": null,
                        "hexValue": "32",
                        "id": 7558,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1360:1:3",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_2_by_1",
                          "typeString": "int_const 2"
                        },
                        "value": "2"
                      },
                      "nodeType": "ArrayTypeName",
                      "src": "1355:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_uint256_$2_storage_ptr",
                        "typeString": "uint256[2]"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  }
                ],
                "src": "1234:142:3"
              },
              "returnParameters": {
                "id": 7564,
                "nodeType": "ParameterList",
                "parameters": [
                  {
                    "constant": false,
                    "id": 7563,
                    "name": "",
                    "nodeType": "VariableDeclaration",
                    "scope": 7576,
                    "src": "1394:7:3",
                    "stateVariable": false,
                    "storageLocation": "default",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    },
                    "typeName": {
                      "id": 7562,
                      "name": "bytes32",
                      "nodeType": "ElementaryTypeName",
                      "src": "1394:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes32",
                        "typeString": "bytes32"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  }
                ],
                "src": "1393:9:3"
              },
              "scope": 7665,
              "src": "1218:251:3",
              "stateMutability": "nonpayable",
              "superFunction": null,
              "visibility": "internal"
            },
            {
              "body": {
                "id": 7595,
                "nodeType": "Block",
                "src": "1517:110:3",
                "statements": [
                  {
                    "expression": {
                      "argumentTypes": null,
                      "id": 7583,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftHandSide": {
                        "argumentTypes": null,
                        "id": 7581,
                        "name": "noOfSolutions",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7464,
                        "src": "1528:13:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "nodeType": "Assignment",
                      "operator": "=",
                      "rightHandSide": {
                        "argumentTypes": null,
                        "hexValue": "30",
                        "id": 7582,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1544:1:3",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_0_by_1",
                          "typeString": "int_const 0"
                        },
                        "value": "0"
                      },
                      "src": "1528:17:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 7584,
                    "nodeType": "ExpressionStatement",
                    "src": "1528:17:3"
                  },
                  {
                    "expression": {
                      "argumentTypes": null,
                      "id": 7587,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftHandSide": {
                        "argumentTypes": null,
                        "id": 7585,
                        "name": "noTokensMinted",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7466,
                        "src": "1556:14:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "nodeType": "Assignment",
                      "operator": "=",
                      "rightHandSide": {
                        "argumentTypes": null,
                        "hexValue": "30",
                        "id": 7586,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1573:1:3",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_0_by_1",
                          "typeString": "int_const 0"
                        },
                        "value": "0"
                      },
                      "src": "1556:18:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 7588,
                    "nodeType": "ExpressionStatement",
                    "src": "1556:18:3"
                  },
                  {
                    "expression": {
                      "argumentTypes": null,
                      "id": 7593,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftHandSide": {
                        "argumentTypes": null,
                        "id": 7589,
                        "name": "zokVerifier",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7462,
                        "src": "1585:11:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_Verifier_$10215",
                          "typeString": "contract Verifier"
                        }
                      },
                      "nodeType": "Assignment",
                      "operator": "=",
                      "rightHandSide": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 7591,
                            "name": "theAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 7578,
                            "src": "1608:10:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          ],
                          "id": 7590,
                          "name": "Verifier",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 10215,
                          "src": "1599:8:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_Verifier_$10215_$",
                            "typeString": "type(contract Verifier)"
                          }
                        },
                        "id": 7592,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "1599:20:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_Verifier_$10215",
                          "typeString": "contract Verifier"
                        }
                      },
                      "src": "1585:34:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_Verifier_$10215",
                        "typeString": "contract Verifier"
                      }
                    },
                    "id": 7594,
                    "nodeType": "ExpressionStatement",
                    "src": "1585:34:3"
                  }
                ]
              },
              "documentation": null,
              "id": 7596,
              "implemented": true,
              "kind": "constructor",
              "modifiers": [],
              "name": "",
              "nodeType": "FunctionDefinition",
              "parameters": {
                "id": 7579,
                "nodeType": "ParameterList",
                "parameters": [
                  {
                    "constant": false,
                    "id": 7578,
                    "name": "theAddress",
                    "nodeType": "VariableDeclaration",
                    "scope": 7596,
                    "src": "1490:18:3",
                    "stateVariable": false,
                    "storageLocation": "default",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    },
                    "typeName": {
                      "id": 7577,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1490:7:3",
                      "stateMutability": "nonpayable",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  }
                ],
                "src": "1489:20:3"
              },
              "returnParameters": {
                "id": 7580,
                "nodeType": "ParameterList",
                "parameters": [],
                "src": "1517:0:3"
              },
              "scope": 7665,
              "src": "1477:150:3",
              "stateMutability": "nonpayable",
              "superFunction": null,
              "visibility": "public"
            },
            {
              "body": {
                "id": 7663,
                "nodeType": "Block",
                "src": "1794:485:3",
                "statements": [
                  {
                    "assignments": [
                      7622
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 7622,
                        "name": "solHash",
                        "nodeType": "VariableDeclaration",
                        "scope": 7663,
                        "src": "1926:15:3",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        },
                        "typeName": {
                          "id": 7621,
                          "name": "bytes32",
                          "nodeType": "ElementaryTypeName",
                          "src": "1926:7:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes32",
                            "typeString": "bytes32"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 7632,
                    "initialValue": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 7626,
                              "name": "a",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 7600,
                              "src": "1971:1:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                                "typeString": "uint256[2] memory"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 7627,
                              "name": "b",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 7606,
                              "src": "1973:1:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_array$_t_uint256_$2_memory_$2_memory_ptr",
                                "typeString": "uint256[2] memory[2] memory"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 7628,
                              "name": "c",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 7610,
                              "src": "1975:1:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                                "typeString": "uint256[2] memory"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 7629,
                              "name": "input",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 7614,
                              "src": "1977:5:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                                "typeString": "uint256[2] memory"
                              }
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                                "typeString": "uint256[2] memory"
                              },
                              {
                                "typeIdentifier": "t_array$_t_array$_t_uint256_$2_memory_$2_memory_ptr",
                                "typeString": "uint256[2] memory[2] memory"
                              },
                              {
                                "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                                "typeString": "uint256[2] memory"
                              },
                              {
                                "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                                "typeString": "uint256[2] memory"
                              }
                            ],
                            "expression": {
                              "argumentTypes": null,
                              "id": 7624,
                              "name": "abi",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 10544,
                              "src": "1954:3:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_magic_abi",
                                "typeString": "abi"
                              }
                            },
                            "id": 7625,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "memberName": "encodePacked",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": null,
                            "src": "1954:16:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_abiencodepacked_pure$__$returns$_t_bytes_memory_ptr_$",
                              "typeString": "function () pure returns (bytes memory)"
                            }
                          },
                          "id": 7630,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "1954:29:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        ],
                        "id": 7623,
                        "name": "keccak256",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 10551,
                        "src": "1944:9:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_keccak256_pure$_t_bytes_memory_ptr_$returns$_t_bytes32_$",
                          "typeString": "function (bytes memory) pure returns (bytes32)"
                        }
                      },
                      "id": 7631,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "1944:40:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes32",
                        "typeString": "bytes32"
                      }
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "1926:58:3"
                  },
                  {
                    "expression": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          },
                          "id": 7641,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 7634,
                                "name": "solutions",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 7470,
                                "src": "2020:9:3",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_mapping$_t_bytes32_$_t_struct$_solution_$7460_storage_$",
                                  "typeString": "mapping(bytes32 => struct SoInSquareVerifier.solution storage ref)"
                                }
                              },
                              "id": 7636,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 7635,
                                "name": "solHash",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 7622,
                                "src": "2030:7:3",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_bytes32",
                                  "typeString": "bytes32"
                                }
                              },
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "nodeType": "IndexAccess",
                              "src": "2020:18:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_solution_$7460_storage",
                                "typeString": "struct SoInSquareVerifier.solution storage ref"
                              }
                            },
                            "id": 7637,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "solutionAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 7459,
                            "src": "2020:34:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "==",
                          "rightExpression": {
                            "argumentTypes": null,
                            "arguments": [
                              {
                                "argumentTypes": null,
                                "hexValue": "30",
                                "id": 7639,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": true,
                                "kind": "number",
                                "lValueRequested": false,
                                "nodeType": "Literal",
                                "src": "2066:1:3",
                                "subdenomination": null,
                                "typeDescriptions": {
                                  "typeIdentifier": "t_rational_0_by_1",
                                  "typeString": "int_const 0"
                                },
                                "value": "0"
                              }
                            ],
                            "expression": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_rational_0_by_1",
                                  "typeString": "int_const 0"
                                }
                              ],
                              "id": 7638,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "lValueRequested": false,
                              "nodeType": "ElementaryTypeNameExpression",
                              "src": "2058:7:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_type$_t_address_$",
                                "typeString": "type(address)"
                              },
                              "typeName": "address"
                            },
                            "id": 7640,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "typeConversion",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "2058:10:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address_payable",
                              "typeString": "address payable"
                            }
                          },
                          "src": "2020:48:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "hexValue": "736f6c7574696f6e20616c726561647920657869737473",
                          "id": 7642,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "string",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "2070:25:3",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_stringliteral_7f0d7b4edab81ae20b48681c20a6bbabcf62719437d6b348f0e9c50f475031a1",
                            "typeString": "literal_string \"solution already exists\""
                          },
                          "value": "solution already exists"
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          },
                          {
                            "typeIdentifier": "t_stringliteral_7f0d7b4edab81ae20b48681c20a6bbabcf62719437d6b348f0e9c50f475031a1",
                            "typeString": "literal_string \"solution already exists\""
                          }
                        ],
                        "id": 7633,
                        "name": "require",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [
                          10560,
                          10561
                        ],
                        "referencedDeclaration": 10561,
                        "src": "2012:7:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                          "typeString": "function (bool,string memory) pure"
                        }
                      },
                      "id": 7643,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "2012:84:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_tuple$__$",
                        "typeString": "tuple()"
                      }
                    },
                    "id": 7644,
                    "nodeType": "ExpressionStatement",
                    "src": "2012:84:3"
                  },
                  {
                    "expression": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "id": 7646,
                          "name": "newAddress",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7616,
                          "src": "2139:10:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 7647,
                          "name": "newId",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7618,
                          "src": "2151:5:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 7648,
                          "name": "a",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7600,
                          "src": "2158:1:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                            "typeString": "uint256[2] memory"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 7649,
                          "name": "b",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7606,
                          "src": "2161:1:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_array$_t_uint256_$2_memory_$2_memory_ptr",
                            "typeString": "uint256[2] memory[2] memory"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 7650,
                          "name": "c",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7610,
                          "src": "2164:1:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                            "typeString": "uint256[2] memory"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 7651,
                          "name": "input",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7614,
                          "src": "2167:5:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                            "typeString": "uint256[2] memory"
                          }
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          },
                          {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          {
                            "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                            "typeString": "uint256[2] memory"
                          },
                          {
                            "typeIdentifier": "t_array$_t_array$_t_uint256_$2_memory_$2_memory_ptr",
                            "typeString": "uint256[2] memory[2] memory"
                          },
                          {
                            "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                            "typeString": "uint256[2] memory"
                          },
                          {
                            "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                            "typeString": "uint256[2] memory"
                          }
                        ],
                        "id": 7645,
                        "name": "addNewSolution",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7526,
                        "src": "2124:14:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_uint256_$_t_array$_t_uint256_$2_memory_ptr_$_t_array$_t_array$_t_uint256_$2_memory_$2_memory_ptr_$_t_array$_t_uint256_$2_memory_ptr_$_t_array$_t_uint256_$2_memory_ptr_$returns$__$",
                          "typeString": "function (address,uint256,uint256[2] memory,uint256[2] memory[2] memory,uint256[2] memory,uint256[2] memory)"
                        }
                      },
                      "id": 7652,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "2124:49:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_tuple$__$",
                        "typeString": "tuple()"
                      }
                    },
                    "id": 7653,
                    "nodeType": "ExpressionStatement",
                    "src": "2124:49:3"
                  },
                  {
                    "expression": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "id": 7655,
                          "name": "newAddress",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7616,
                          "src": "2206:10:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 7656,
                          "name": "newId",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7618,
                          "src": "2218:5:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          },
                          {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        ],
                        "id": 7654,
                        "name": "mint",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1123,
                        "src": "2201:4:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_uint256_$returns$_t_bool_$",
                          "typeString": "function (address,uint256) returns (bool)"
                        }
                      },
                      "id": 7657,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "2201:23:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "id": 7658,
                    "nodeType": "ExpressionStatement",
                    "src": "2201:23:3"
                  },
                  {
                    "expression": {
                      "argumentTypes": null,
                      "id": 7661,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftHandSide": {
                        "argumentTypes": null,
                        "id": 7659,
                        "name": "noTokensMinted",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7466,
                        "src": "2252:14:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "nodeType": "Assignment",
                      "operator": "+=",
                      "rightHandSide": {
                        "argumentTypes": null,
                        "hexValue": "31",
                        "id": 7660,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "2270:1:3",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_1_by_1",
                          "typeString": "int_const 1"
                        },
                        "value": "1"
                      },
                      "src": "2252:19:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 7662,
                    "nodeType": "ExpressionStatement",
                    "src": "2252:19:3"
                  }
                ]
              },
              "documentation": null,
              "id": 7664,
              "implemented": true,
              "kind": "function",
              "modifiers": [],
              "name": "mintNFT",
              "nodeType": "FunctionDefinition",
              "parameters": {
                "id": 7619,
                "nodeType": "ParameterList",
                "parameters": [
                  {
                    "constant": false,
                    "id": 7600,
                    "name": "a",
                    "nodeType": "VariableDeclaration",
                    "scope": 7664,
                    "src": "1652:16:3",
                    "stateVariable": false,
                    "storageLocation": "memory",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                      "typeString": "uint256[2]"
                    },
                    "typeName": {
                      "baseType": {
                        "id": 7597,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "1652:4:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 7599,
                      "length": {
                        "argumentTypes": null,
                        "hexValue": "32",
                        "id": 7598,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1657:1:3",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_2_by_1",
                          "typeString": "int_const 2"
                        },
                        "value": "2"
                      },
                      "nodeType": "ArrayTypeName",
                      "src": "1652:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_uint256_$2_storage_ptr",
                        "typeString": "uint256[2]"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  },
                  {
                    "constant": false,
                    "id": 7606,
                    "name": "b",
                    "nodeType": "VariableDeclaration",
                    "scope": 7664,
                    "src": "1669:19:3",
                    "stateVariable": false,
                    "storageLocation": "memory",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_array$_t_uint256_$2_memory_$2_memory_ptr",
                      "typeString": "uint256[2][2]"
                    },
                    "typeName": {
                      "baseType": {
                        "baseType": {
                          "id": 7601,
                          "name": "uint",
                          "nodeType": "ElementaryTypeName",
                          "src": "1669:4:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 7603,
                        "length": {
                          "argumentTypes": null,
                          "hexValue": "32",
                          "id": 7602,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "1674:1:3",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_2_by_1",
                            "typeString": "int_const 2"
                          },
                          "value": "2"
                        },
                        "nodeType": "ArrayTypeName",
                        "src": "1669:7:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$2_storage_ptr",
                          "typeString": "uint256[2]"
                        }
                      },
                      "id": 7605,
                      "length": {
                        "argumentTypes": null,
                        "hexValue": "32",
                        "id": 7604,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1677:1:3",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_2_by_1",
                          "typeString": "int_const 2"
                        },
                        "value": "2"
                      },
                      "nodeType": "ArrayTypeName",
                      "src": "1669:10:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_array$_t_uint256_$2_storage_$2_storage_ptr",
                        "typeString": "uint256[2][2]"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  },
                  {
                    "constant": false,
                    "id": 7610,
                    "name": "c",
                    "nodeType": "VariableDeclaration",
                    "scope": 7664,
                    "src": "1712:16:3",
                    "stateVariable": false,
                    "storageLocation": "memory",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                      "typeString": "uint256[2]"
                    },
                    "typeName": {
                      "baseType": {
                        "id": 7607,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "1712:4:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 7609,
                      "length": {
                        "argumentTypes": null,
                        "hexValue": "32",
                        "id": 7608,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1717:1:3",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_2_by_1",
                          "typeString": "int_const 2"
                        },
                        "value": "2"
                      },
                      "nodeType": "ArrayTypeName",
                      "src": "1712:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_uint256_$2_storage_ptr",
                        "typeString": "uint256[2]"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  },
                  {
                    "constant": false,
                    "id": 7614,
                    "name": "input",
                    "nodeType": "VariableDeclaration",
                    "scope": 7664,
                    "src": "1730:20:3",
                    "stateVariable": false,
                    "storageLocation": "memory",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
                      "typeString": "uint256[2]"
                    },
                    "typeName": {
                      "baseType": {
                        "id": 7611,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "1730:4:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 7613,
                      "length": {
                        "argumentTypes": null,
                        "hexValue": "32",
                        "id": 7612,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1735:1:3",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_2_by_1",
                          "typeString": "int_const 2"
                        },
                        "value": "2"
                      },
                      "nodeType": "ArrayTypeName",
                      "src": "1730:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_uint256_$2_storage_ptr",
                        "typeString": "uint256[2]"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  },
                  {
                    "constant": false,
                    "id": 7616,
                    "name": "newAddress",
                    "nodeType": "VariableDeclaration",
                    "scope": 7664,
                    "src": "1752:18:3",
                    "stateVariable": false,
                    "storageLocation": "default",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    },
                    "typeName": {
                      "id": 7615,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1752:7:3",
                      "stateMutability": "nonpayable",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  },
                  {
                    "constant": false,
                    "id": 7618,
                    "name": "newId",
                    "nodeType": "VariableDeclaration",
                    "scope": 7664,
                    "src": "1772:13:3",
                    "stateVariable": false,
                    "storageLocation": "default",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "typeName": {
                      "id": 7617,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "1772:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "value": null,
                    "visibility": "internal"
                  }
                ],
                "src": "1651:135:3"
              },
              "returnParameters": {
                "id": 7620,
                "nodeType": "ParameterList",
                "parameters": [],
                "src": "1794:0:3"
              },
              "scope": 7665,
              "src": "1635:644:3",
              "stateMutability": "nonpayable",
              "superFunction": null,
              "visibility": "public"
            }
          ],
          "scope": 7666,
          "src": "208:2074:3"
        }
      ],
      "src": "0:3007:3"
    },
    "compiler": {
      "name": "solc",
      "version": "0.5.5+commit.47a71e8f.Emscripten.clang"
    },
    "networks": {
      "4": {
        "events": {
          "0x832e169522ce4784adfa242eb30432606742d59c8efed729c7973be828a60c6d": {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "name": "newSolution",
                "type": "address"
              }
            ],
            "name": "addSolution",
            "type": "event"
          },
          "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef": {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "name": "from",
                "type": "address"
              },
              {
                "indexed": true,
                "name": "to",
                "type": "address"
              },
              {
                "indexed": true,
                "name": "tokenId",
                "type": "uint256"
              }
            ],
            "name": "Transfer",
            "type": "event"
          },
          "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925": {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "name": "owner",
                "type": "address"
              },
              {
                "indexed": true,
                "name": "approved",
                "type": "address"
              },
              {
                "indexed": true,
                "name": "tokenId",
                "type": "uint256"
              }
            ],
            "name": "Approval",
            "type": "event"
          },
          "0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31": {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "name": "owner",
                "type": "address"
              },
              {
                "indexed": true,
                "name": "operator",
                "type": "address"
              },
              {
                "indexed": false,
                "name": "approved",
                "type": "bool"
              }
            ],
            "name": "ApprovalForAll",
            "type": "event"
          },
          "0xab40a374bc51de372200a8bc981af8c9ecdc08dfdaef0bb6e09f88f3c616ef3d": {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "name": "addr",
                "type": "address"
              },
              {
                "indexed": false,
                "name": "amount",
                "type": "uint256"
              }
            ],
            "name": "Paused",
            "type": "event"
          },
          "0x3582d1828e26bf56bd801502bc021ac0bc8afb57c826e4986b45593c8fad389c": {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "name": "addr",
                "type": "address"
              },
              {
                "indexed": false,
                "name": "amount",
                "type": "uint256"
              }
            ],
            "name": "Unpaused",
            "type": "event"
          },
          "0xbfaea6a5831818a14c642eaa23c5eed274ba1be3f18b642b251f57862fe9e2ec": {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "name": "addr",
                "type": "address"
              }
            ],
            "name": "changedOwnership",
            "type": "event"
          }
        },
        "links": {},
        "address": "0x96c9b189B963E0061e51554F8208DFAAAFF642a5",
        "transactionHash": "0xecdf269217d81b8da19dbc1bfc6b4c495305b31e2bb75ffd65a85dabc5e11e9d"
      },
      "1601246225301": {
        "events": {
          "0x832e169522ce4784adfa242eb30432606742d59c8efed729c7973be828a60c6d": {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "name": "newSolution",
                "type": "address"
              }
            ],
            "name": "addSolution",
            "type": "event"
          },
          "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef": {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "name": "from",
                "type": "address"
              },
              {
                "indexed": true,
                "name": "to",
                "type": "address"
              },
              {
                "indexed": true,
                "name": "tokenId",
                "type": "uint256"
              }
            ],
            "name": "Transfer",
            "type": "event"
          },
          "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925": {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "name": "owner",
                "type": "address"
              },
              {
                "indexed": true,
                "name": "approved",
                "type": "address"
              },
              {
                "indexed": true,
                "name": "tokenId",
                "type": "uint256"
              }
            ],
            "name": "Approval",
            "type": "event"
          },
          "0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31": {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "name": "owner",
                "type": "address"
              },
              {
                "indexed": true,
                "name": "operator",
                "type": "address"
              },
              {
                "indexed": false,
                "name": "approved",
                "type": "bool"
              }
            ],
            "name": "ApprovalForAll",
            "type": "event"
          },
          "0xab40a374bc51de372200a8bc981af8c9ecdc08dfdaef0bb6e09f88f3c616ef3d": {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "name": "addr",
                "type": "address"
              },
              {
                "indexed": false,
                "name": "amount",
                "type": "uint256"
              }
            ],
            "name": "Paused",
            "type": "event"
          },
          "0x3582d1828e26bf56bd801502bc021ac0bc8afb57c826e4986b45593c8fad389c": {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "name": "addr",
                "type": "address"
              },
              {
                "indexed": false,
                "name": "amount",
                "type": "uint256"
              }
            ],
            "name": "Unpaused",
            "type": "event"
          },
          "0xbfaea6a5831818a14c642eaa23c5eed274ba1be3f18b642b251f57862fe9e2ec": {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "name": "addr",
                "type": "address"
              }
            ],
            "name": "changedOwnership",
            "type": "event"
          }
        },
        "links": {},
        "address": "0xf2ee0b0Cdcae5013930B92c0Ba54F7F7f1933613",
        "transactionHash": "0xc6cb4fb00a8e13b0279eea7e6fdcb3854e24b218e164ef4f21bf2b723454c08b"
      },
      "1601254292576": {
        "events": {
          "0x832e169522ce4784adfa242eb30432606742d59c8efed729c7973be828a60c6d": {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "name": "newSolution",
                "type": "address"
              }
            ],
            "name": "addSolution",
            "type": "event"
          },
          "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef": {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "name": "from",
                "type": "address"
              },
              {
                "indexed": true,
                "name": "to",
                "type": "address"
              },
              {
                "indexed": true,
                "name": "tokenId",
                "type": "uint256"
              }
            ],
            "name": "Transfer",
            "type": "event"
          },
          "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925": {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "name": "owner",
                "type": "address"
              },
              {
                "indexed": true,
                "name": "approved",
                "type": "address"
              },
              {
                "indexed": true,
                "name": "tokenId",
                "type": "uint256"
              }
            ],
            "name": "Approval",
            "type": "event"
          },
          "0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31": {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "name": "owner",
                "type": "address"
              },
              {
                "indexed": true,
                "name": "operator",
                "type": "address"
              },
              {
                "indexed": false,
                "name": "approved",
                "type": "bool"
              }
            ],
            "name": "ApprovalForAll",
            "type": "event"
          },
          "0xab40a374bc51de372200a8bc981af8c9ecdc08dfdaef0bb6e09f88f3c616ef3d": {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "name": "addr",
                "type": "address"
              },
              {
                "indexed": false,
                "name": "amount",
                "type": "uint256"
              }
            ],
            "name": "Paused",
            "type": "event"
          },
          "0x3582d1828e26bf56bd801502bc021ac0bc8afb57c826e4986b45593c8fad389c": {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "name": "addr",
                "type": "address"
              },
              {
                "indexed": false,
                "name": "amount",
                "type": "uint256"
              }
            ],
            "name": "Unpaused",
            "type": "event"
          },
          "0xbfaea6a5831818a14c642eaa23c5eed274ba1be3f18b642b251f57862fe9e2ec": {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "name": "addr",
                "type": "address"
              }
            ],
            "name": "changedOwnership",
            "type": "event"
          }
        },
        "links": {},
        "address": "0xFb5a9d39E8fB475f4A970A92C6594BA397f74988",
        "transactionHash": "0xf954167be879779082b795756ee03153b8b6634271e234e78b3a76123b379267"
      }
    },
    "schemaVersion": "3.2.3",
    "updatedAt": "2020-09-28T01:45:35.293Z",
    "networkType": "ethereum",
    "devdoc": {
      "methods": {
        "isApprovedForAll(address,address)": {
          "details": "Tells whether an operator is approved by a given owner\r",
          "params": {
            "operator": "operator address which you want to query the approval of\r",
            "owner": "owner address which you want to query the approval of\r"
          },
          "return": "bool whether the given operator is approved by the given owner\r"
        },
        "setApprovalForAll(address,bool)": {
          "details": "Sets or unsets the approval of a given operator\r An operator is allowed to transfer all tokens of the sender on their behalf\r",
          "params": {
            "approved": "representing the status of the approval to be set\r",
            "to": "operator address to set the approval\r"
          }
        },
        "supportsInterface(bytes4)": {
          "details": "implement supportsInterface(bytes4) using a lookup table\r"
        },
        "tokenByIndex(uint256)": {
          "details": "Gets the token ID at a given index of all the tokens in this contract\r Reverts if the index is greater or equal to the total number of tokens\r",
          "params": {
            "index": "uint256 representing the index to be accessed of the tokens list\r"
          },
          "return": "uint256 token ID at the given index of the tokens list\r"
        },
        "tokenOfOwnerByIndex(address,uint256)": {
          "details": "Gets the token ID at a given index of the tokens list of the requested owner\r",
          "params": {
            "index": "uint256 representing the index to be accessed of the requested tokens list\r",
            "owner": "address owning the tokens list to be accessed\r"
          },
          "return": "uint256 token ID at the given index of the tokens list owned by the requested address\r"
        },
        "totalSupply()": {
          "details": "Gets the total amount of tokens stored by the contract\r",
          "return": "uint256 representing the total amount of tokens\r"
        }
      }
    },
    "userdoc": {
      "methods": {}
    }
  };
const NFT_ABI = CONTRACT_FILE.abi;

if (!MNEMONIC || !INFURA_KEY || !OWNER_ADDRESS || !NETWORK) {
    console.error("Please set a mnemonic, infura key, owner, network, and contract address.")
    return
}

async function main() {
    
    const provider = new HDWalletProvider(MNEMONIC, `https://rinkeby.infura.io/${INFURA_KEY}`);
    const web3Instance = new web3(
        provider
    )
    //console.log(provider);
    //if (NFT_CONTRACT_ADDRESS) {
        
        const nftContract =new web3Instance.eth.Contract(NFT_ABI, NFT_CONTRACT_ADDRESS, { gasLimit: "100000000" });

        // Tokens minted directly to the owner.
        let tokenId = 0;
        //for (var i = 0; i < NUM_TOKENS; i++) {
            proof.forEach(async(proof) =>  {
               tokenId ++;
               console.log(tokenId);
            const tee = await nftContract.methods
             .mintNFT(
                proof.proof.a, 
                proof.proof.b,  
                proof.proof.c, 
                proof.inputs, NFT_CONTRACT_ADDRESS, tokenId).send({from: OWNER_ADDRESS});
                console.log(tee);
            let count = await nftContract.methods.getTokensMinted({from: OWNER_ADDRESS});
            console.log(count);
            console.log('end');
            
        //}
    //} 
});
}

main();