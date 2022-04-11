const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Market Flow Test", function () {

  it("Create Account", async function () {
    const accounts = await ethers.getSigners();
    const owner = accounts[0];
    const bataa = accounts[1];

    const Market = await ethers.getContractFactory("Market");
    const marketContract = await Market.deploy();
    await marketContract.deployed();

    let bataaAccountCreationResult = await ((await marketContract.connect(bataa).createAccount()).wait())
    let data = bataaAccountCreationResult.events.find((e) => e.event == "NewAccount").args

    expect(data._owner).to.equal(bataa.address);
    expect(await marketContract.getAccountLength()).to.equal(1);
  });

  it("Create Orders", async function () {
    const accounts = await ethers.getSigners()
    const owner = accounts[0]
    const bataa = accounts[1]

    const Market = await ethers.getContractFactory("Market")
    const marketContract = await Market.deploy()
    await marketContract.deployed()

    let bataaAccountAddress = (await (
      ( await marketContract.connect(bataa).createAccount()).wait()
    )).events.find((e) => e.event == "NewAccount").args._address

    const bataaAccountContract = await ethers.getContractAt('Account',bataaAccountAddress)
    let orderAddress1 = (await ((await bataaAccountContract.connect(bataa).createOrder(
      ['https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=022'],
      'bitcoin',
      'cryptocurrency',
      1
    )).wait())).events.find((e) => e.event == "NewOrder").args._address

    let orderAddress2 = (await ((await bataaAccountContract.connect(bataa).createOrder(
      ['https://cryptologos.cc/logos/ethereum-eth-logo.png?v=022'],
      'ethereum',
      'cryptocurrency',
      1
    )).wait())).events.find((e) => e.event == "NewOrder").args._address

    const order1Contract = await ethers.getContractAt('Order',orderAddress1)
    const order2Contract = await ethers.getContractAt('Order',orderAddress2)

    expect(await bataaAccountContract.getOrderLength()).to.equal(2);
    expect(await order1Contract.name()).to.equal('bitcoin');
    expect(await order2Contract.name()).to.equal('ethereum');

  });

  it("Create OrderTransaction", async function () {
    const accounts = await ethers.getSigners()
    const owner = accounts[0]
    const bataa = accounts[1]
    const amaraa = accounts[2]

    const Market = await ethers.getContractFactory("Market")
    const marketContract = await Market.deploy()
    await marketContract.deployed()

    let bataaAccountAddress = (await (
      ( await marketContract.connect(bataa).createAccount()).wait()
    )).events.find((e) => e.event == "NewAccount").args._address

    const bataaAccountContract = await ethers.getContractAt('Account',bataaAccountAddress)
    let orderAddress = (await ((await bataaAccountContract.connect(bataa).createOrder(
      ['https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=022'],
      'bitcoin',
      'cryptocurrency',
      1
    )).wait())).events.find((e) => e.event == "NewOrder").args._address

    const orderContract = await ethers.getContractAt('Order',orderAddress)
    
    const orderTransactionAddress = (await (
      (await orderContract.connect(amaraa).buyOrder(1649694253,{ value: 1 })).wait()
    )).events.find((e) => e.event == "NewOrderTransaction").args._address

    const orderTransactionContract = await ethers.getContractAt('OrderTransaction',orderTransactionAddress)

    expect(await orderTransactionContract.orderAddress()).to.equal(orderAddress);
    expect(await orderTransactionContract.buyerAddress()).to.equal(amaraa.address);
    expect(await orderTransactionContract.ownerAddress()).to.equal(bataa.address);
    expect(await orderTransactionContract.getBalance()).to.equal(1);

    await ((await orderTransactionContract.connect(amaraa).fulfillOrder()).wait())

    expect(await orderContract.fulfilled()).to.equal(true);
  });

});
