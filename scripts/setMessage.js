const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/utils");

const sendShieldedTransaction = async (signer, destination, data, value) => {
  const rpclink = hre.network.config.url;
  const [encryptedData] = await encryptDataField(rpclink, data);
  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {
  const contractAddress = "0xF1aD5D8EFCF9fd6d69E847c4da5539cA3639551e";
  const [signer] = await hre.ethers.getSigners();
  const contractFactory = await hre.ethers.getContractFactory("TestToken");
  const contract = contractFactory.attach(contractAddress);
  const functionName = "publicMintToken";
  const mintTokenTx = await sendShieldedTransaction(signer, contractAddress, contract.interface.encodeFunctionData(functionName, []), 0);
  await mintTokenTx.wait();
  console.log("Transaction Receipt: ", mintTokenTx);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

