var ERC721MintableComplete = artifacts.require('customERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];



    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
            this.contract.mint(account_one, 2);
            this.contract.mint(account_two, 3);
            // TODO: mint multiple tokens
        })

        it('should return total supply', async function () {
            var totalSupply = await this.contract.totalSupply(); 
            assert.equal(totalSupply, 2, "Total supply does not match");
        })

        it('should get token balance', async function () {
            var getBalanceValue = await this.contract.balanceOf(accounts[0]); 
            assert.equal(getBalanceValue, 1, "Total balance is inconsistent");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            var tokenId = await this.contract.tokenURI("2");
            assert.equal(tokenId,"https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/2", "URI does not match as expected");
        })

        it('should transfer token from one owner to another', async function () { 
            await this.contract.transferFrom(account_one,accounts[1],2, {from: account_one});
            var ownerOfAccount2Token = await this.contract.ownerOf(2);
            assert.equal(ownerOfAccount2Token, accounts[1],"owner should be different");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            var isRestricted = false;
            try {
                await this.contract.mint(account_two,3,{from: account_two});
            } catch {
                isRestricted = true;
            }
            assert.equal(isRestricted, true, "Contract should be mintable due to not being the owner");
        })

        it('should return contract owner', async function () { 
            var getOwner = await this.contract.getOwner();
            assert.equal(getOwner, account_one, "Account is not the contract owner");
        })

    });
})