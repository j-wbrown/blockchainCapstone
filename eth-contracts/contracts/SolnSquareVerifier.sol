pragma solidity >=0.4.21 <0.6.0;

import "./ERC721Mintable.sol";
import "./Verifier.sol";


// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>

contract SoInSquareVerifier is customERC721Token {
    struct solution {  
        uint256  solutionIndex;  
        address solutionAddress; 
    }

    Verifier zokratesVerifier;

    uint256 noOfSolutions;

    uint256 noTokensMinted;

    mapping(bytes32 => solution) private solutions;

    event addSolution(address newSolution);

    function addNewSolution(address newAddress, uint256 solutionId, uint[2] memory a,uint[2][2] memory b,
                     uint[2] memory c, uint[2] memory input) public {
        bytes32 solutionHash = getHash(a,b,c,input);
        solutions[solutionHash] = solution({
            solutionIndex: solutionId,
            solutionAddress: newAddress
        });
        noOfSolutions += 1;
        emit addSolution(newAddress);
    }

    function getSolutionsAdded() public view returns(uint256) {
        return noOfSolutions;
    }

    function getTokensMinted() public view returns(uint256) {
        return noTokensMinted;
    }

    function getHash(uint[2] memory a,uint[2][2] memory b, uint[2] memory c, uint[2] memory input) internal returns(bytes32) {
        return keccak256(abi.encodePacked(a,b,c,input));
    }

    constructor (address theAddress) public {
        zokratesVerifier = Verifier(theAddress);
        noOfSolutions = 0;
        noTokensMinted = 0;
    }

    function mintNFT(uint[2] memory a,uint[2][2] memory b,
                     uint[2] memory c, uint[2] memory input, address newAddress, uint256 newId) public {

                         //require(zokratesVerifier.verifyTx(a,b,c,input), "solution verification failed");
                         bytes32 solHash = keccak256(abi.encodePacked(a,b,c,input));
                         require(solutions[solHash].solutionAddress == address(0), "solution already exists");
                         addNewSolution(newAddress, newId, a, b, c, input);
                         mint(newAddress, newId);
                         noTokensMinted += 1;
    }
}

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class



// TODO define a solutions struct that can hold an index & an address


// TODO define an array of the above struct


// TODO define a mapping to store unique solutions submitted



// TODO Create an event to emit when a solution is added



// TODO Create a function to add the solutions to the array and emit the event



// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly

  


























