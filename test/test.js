const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");

let token1, token2;
let mockFactory, mockRouter, mockWETH, mockPair;
let owner, alice, bob;

describe("Gas Refund", function() {
    beforeEach(async () => {
        [owner, alice, bob] = await ethers.getSigners();
        
        let Token1 = await ethers.getContractFactory("Token1");
        token1 = await Token1.deploy();
        await token1.deployed();

        let Token2 = await ethers.getContractFactory("Token2");
        token2 = await Token2.deploy();
        await token2.deployed();

        let MockWeth = await ethers.getContractFactory("mockWeth");
        mockWETH = await MockWeth.deploy();
        await mockWETH.deployed();

        let UniswapFactory = await ethers.getContractFactory("mockFactory");
        mockFactory = await UniswapFactory.deploy();
        await mockFactory.deployed();

        let UniswapRouter = await ethers.getContractFactory("mockRouter");
        mockRouter = await UniswapRouter.deploy(mockFactory.address, mockWETH.address);
        await mockRouter.deployed();

        let PairAddress = await mockFactory.callStatic.createPair(token1.address, token2.address);
        console.log(PairAddress);
        TX = await mockFactory.createPair(token1.address, token2.address);
        let MockPair = await ethers.getContractFactory("mockPair");
        mockPair = await MockPair.attach(PairAddress);
        // console.log(await mockPair.getReserves());

        TX = await token1.approve(mockRouter.address, 2000);
        TX.wait();
        TX = await token2.approve(mockRouter.address, 2000);
        TX.wait();
        let lastBlock = await ethers.provider.getBlock("latest");
        let lastBlockTime = lastBlock.timestamp;
        TX = await mockRouter.addLiquidity(token1.address, token2.address, 2000, 2000, 1500, 1500, owner.address, lastBlockTime + 10000);
        await TX.wait();
        
    });

    describe("Mock Tocken", function() {
        it("Total supply must be exact", async () => {
            expect(await token1.totalSupply()).to.equal(BigNumber.from("2000000000000000000000000"));
            expect(await token2.totalSupply()).to.equal(BigNumber.from("2000000000000000000000000"));
        });
        it("Transfer must proceed", async () => {
            let TX = await token1.transfer(alice.address, 1000);
            await TX.wait();
            expect(await token1.balanceOf(alice.address)).to.equal(1000);
        });
    });
});

