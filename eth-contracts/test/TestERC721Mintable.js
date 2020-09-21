var ERC721MintableComplete = artifacts.require('customERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});

            this.contract.mint(accounts[2], "account_2", "TokenLand");
            this.contract.mint(accounts[3], "account_3", "TokenLand");
            this.contract.mint(accounts[4], "account_4", "TokenLand");
            // TODO: mint multiple tokens
        })

        it('should return total supply', async function () {
            var totalSupply = await this.contract.totalSupply(); 
            assert.equal(totalSupply, 3, "Total supply does not match");
        })

        it('should get token balance', async function () {
            var getBalanceValue = await this.contract.getBalance(accounts[1]); 
            assert.equal(getBalanceValue, 1, "Total balance is inconsistent");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            var tokenId = await this.contract.tokenURI("account_2");
            assert.equal(tokenId,"https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/account_2", "URI does not match as expected");
        })

        it('should transfer token from one owner to another', async function () { 
            await this.contract.transferFrom(accounts[2],accounts[3],"account_2", {from: accounts[2]});
            var ownerOfAccount2Token = await this.contract.ownerOf("account_2");
            assert.equal(ownerOfAccount2Token, accounts[3],"owner should be different");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            var isRestricted = false;
            try {
                this.contract.mint(account_two,"account_3",{from: account_two});
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