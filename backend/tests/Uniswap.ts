const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token contract", function () {
  it("Deployment should create a pool", async function () {
    const [owner] = await ethers.getSigners();

    const EthSepoliaAddress = 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238;
    const AvalancheAddress = 0x5425890298aed601595a70ab815c96711a31bc65;

    const initialAmountEth = 100;
    const initialAmountAvalanche = 10000;

    const UniswapContract = await ethers.deployContract("Uniswap");

    const reserveA = UniswapContract.constructor(initialAmountEth, initialAmountAvalanche, EthSepoliaAddress, AvalancheAddress);
    const reserveB = UniswapContract.constructor(initialAmountEth, initialAmountAvalanche, EthSepoliaAddress, AvalancheAddress);
    expect(reserveA.to.equal(100));
    expect(reserveB.to.equal(10000));

  });

  it("add works properly", async function () {
    const [owner] = await ethers.getSigners();

    const EthSepoliaAddress = 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238;
    const AvalancheAddress = 0x5425890298aed601595a70ab815c96711a31bc65;

    const initialAmountEth = 100;
    const initialAmountAvalanche = 10000;

    const UniswapContract = await ethers.deployContract("Uniswap");

    const construct = UniswapContract.constructor(initialAmountEth, initialAmountAvalanche, EthSepoliaAddress, AvalancheAddress);

    const addA = UniswapContract.add(10, EthSepoliaAddress);

    expect(UniswapContract.reserveA.to.equal(110));
    expect(UniswapContract.reserveB.to.equal(11000));

  });

  it("read works properly", async function () {
    const [owner] = await ethers.getSigners();


    const UniswapContract = await ethers.deployContract("Uniswap");
    const Uniswap = UniswapContract.deployContract();

    // const construct = UniswapContract.constructor(initialAmountEth, initialAmountAvalanche, EthSepoliaAddress, AvalancheAddress);
    // const tuple = UniswapContract.read();
    // expect(tuple == (100, 10000));
  });

  it("getAmount works properly", async function () {
    const [owner] = await ethers.getSigners();

    const EthSepoliaAddress = 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238;
    const AvalancheAddress = 0x5425890298aed601595a70ab815c96711a31bc65;

    const initialAmountEth = 100;
    const initialAmountAvalanche = 10000;

    const UniswapContract = await ethers.deployContract("Uniswap");

    const reserveA = UniswapContract.getAmount(10, 10000, 100);
    expect(reserveA.to.equal(110));
  });

  it("swap", async function () {
    const [owner] = await ethers.getSigners();

    const EthSepoliaAddress = 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238;
    const AvalancheAddress = 0x5425890298aed601595a70ab815c96711a31bc65;

    const initialAmountEth = 100;
    const initialAmountAvalanche = 10000;

    const UniswapContract = await ethers.deployContract("Uniswap");

    const construct = UniswapContract.constructor(initialAmountEth, initialAmountAvalanche, EthSepoliaAddress, AvalancheAddress);

    const swapA = UniswapContract.swap(10, EthSepoliaAddress);

    expect(UniswapContract.reserveA.to.equal(110));


    expect(UniswapContract.reserveB.to.equal(11000));

    // 10000 of token A, 100 of token B
    // price  = 100 A for B
    // swap 10 of token B
    // k = 1000000 / 110 = 9090.90909091 of token A
    // give back 10,000 - 9090.9090909 = 909 of token A
    // implied price of 909 / 10 = 90.9 A for B
    // getAmount(10, 100, 10000)
  });
});