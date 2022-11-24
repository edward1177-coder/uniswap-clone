// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const main = async() =>{
  const transactionFactory = await hre.ethers.getContractFactory('Transactions')
  const transactionContract = await transactionFactory.deploy()

  await transactionContract.deployed()

  console.log('Transaction deployed to:', transactionContract.address)
}

;(async()=>{
  try{
    await main()
    process.exit(0)
  }catch(error){
    console.error(error)
    process.exit(1)
  }
})()

