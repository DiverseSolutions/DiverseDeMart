const fs = require('fs');
const path = require('path');
const hre = require("hardhat");

async function main() {
  const accounts = await ethers.getSigners()
  const owner = accounts[0]
  const bataa = accounts[1]

  const Market = await hre.ethers.getContractFactory("Market");
  const marketContract = await Market.deploy();
  await marketContract.deployed();

  let bataaAccountAddress = (await (
    ( await marketContract.connect(bataa).createAccount()).wait()
  )).events.find((e) => e.event == "NewAccount").args._address

  const bataaAccountContract = await ethers.getContractAt('Account',bataaAccountAddress)

  await ((await bataaAccountContract.connect(bataa).createOrder(
    ['https://cdn.shopify.com/s/files/1/0616/7376/7164/products/shop-01_600x.jpg?v=1640060341'],
    'Sneaker',
    'Brand : Fort Nick',
    405
  )).wait())

  await ((await bataaAccountContract.connect(bataa).createOrder(
    ['https://cdn.shopify.com/s/files/1/0616/7376/7164/products/shop-02_600x.jpg?v=1640060243'],
    'Casual Shoe',
    'Brand : Blackfoot',
    130
  )).wait())

  await ((await bataaAccountContract.connect(bataa).createOrder(
    ['http://dasinfomedia.co.uk/mojoomla/shopina/images/virtuemart/product/resized/category_item_2_370x330.jpg?timestamp=1649701022168'],
    'Lucky Chair',
    'Chair is very pink',
    220
  )).wait())

  await ((await bataaAccountContract.connect(bataa).createOrder(
    ['http://dasinfomedia.co.uk/mojoomla/shopina/images/virtuemart/product/resized/category_item_3_370x330.jpg?timestamp=1649701022168'],
    'Yellow Chair',
    'Chair is really yellow',
    42
  )).wait())

  await ((await bataaAccountContract.connect(bataa).createOrder(
    ['https://lefala.jollyany.co/images/com_hikashop/upload/thumbnails/472x370f/p33-4.jpg'],
    'Tote Bag Cord',
    'Light Yellow Bag',
    37
  )).wait())



  const content = {
    'marketContract' : marketContract.address,
  }
  createAddressJson(path.join(__dirname, '/../src/address.json'),JSON.stringify(content))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

function createAddressJson(path,content){
  try{
    fs.writeFileSync(path,content)
    console.log("Created Contract Address JSON")
  } catch (err) {
    console.error(err)
    return
  }
}
