const fs = require('fs');
const path = require('path');
const hre = require("hardhat");

async function main() {
  const Market = await hre.ethers.getContractFactory("Market");
  const marketContract = await Market.deploy();

  await marketContract.deployed();

  console.log("marketContract deployed to:", marketContract.address);

  const content = {
    'marketContract' : marketContract.address
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
