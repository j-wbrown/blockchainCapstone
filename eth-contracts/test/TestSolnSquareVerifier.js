var soInSquareVerifier = artifacts.require('SoInSquareVerifier');

const proofData = {
    "proof": {
      "a": [
        "0x00f59df5b373e6c051f37af1acad37efb8cb0b95f79a6317f762f013211c4642",
        "0x2a55fdc40078c8ef9c619c2a402f3c0339fc4d0c99055df4dfdfc7622d228180"
      ],
      "b": [
        [
          "0x20d4c55809a1c61dbdf8a8c212b15a13052101e7327e7f16f4e27e06d7aee3da",
          "0x124858cade6070d41c8a304537c6f048e9ab3166224818b4a9e775c07f445a83"
        ],
        [
          "0x2a3f2c09bceb8dfe4aab96e92f7b0a5c29f2d1767f1ff16dcb985818d5e9bd06",
          "0x165dcf6b4665605f78f7c8c56869d710bcec2f35dbbc4d10442317ee3fa862e7"
        ]
      ],
      "c": [
        "0x13fe29dd22aa68dec30ef3cf7ca20c691f820965da2eb0e5fcf21e780ef1a2f8",
        "0x159c59229a338f8db0c72ff58ff5ff67f26a895e75b5b5b71513776f56f07c95"
      ]
    },
    "inputs": [
      "0x0000000000000000000000000000000000000000000000000000000000000019",
      "0x0000000000000000000000000000000000000000000000000000000000000001"
    ],
    "raw": "80f59df5b373e6c051f37af1acad37efb8cb0b95f79a6317f762f013211c4642a0d4c55809a1c61dbdf8a8c212b15a13052101e7327e7f16f4e27e06d7aee3da124858cade6070d41c8a304537c6f048e9ab3166224818b4a9e775c07f445a8313fe29dd22aa68dec30ef3cf7ca20c691f820965da2eb0e5fcf21e780ef1a2f8"
  };

contract('test SoInSquareVerifier', accounts => {
    const account_one = accounts[0];

    describe("Test new solution added to contract", function() {
        beforeEach(async function() {
            this.contract = await soInSquareVerifier.new(account_one);
        })

        it('add solution to contract', async function() {
            await this.contract.addNewSolution(account_one,
                23,
                proofData.proof.a,
                proofData.proof.b,
                proofData.proof.c,
                proofData.inputs);
            let count = await this.contract.getSolutionsAdded();
            assert.equal(count, 1, "Solution was not added");
            
        })
    });

    describe("Test ERC712 token can be minted", function() {
        beforeEach(async function() {
            this.contract = await soInSquareVerifier.new({from: account_one});
        })

        it('mint contract', function() {
            
        })
    });
});

// Test if a new solution can be added for contract - SolnSquareVerifier

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier
