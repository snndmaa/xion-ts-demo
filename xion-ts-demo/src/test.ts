import { SigningCosmWasmClient, Secp256k1HdWallet } from "cosmwasm";
import { DEFAULT_RPC_ENDPOINT } from "./connection";

// This is your rpc endpoint
// const rpcEndpoint = "https://rpc.cliffnet.cosmwasm.com:443/";

// Using a random generated mnemonic
const mnemonic =
  "rifle same bitter control garage duck grab spare mountain doctor rubber cook";

async function main() {
  // Create a wallet
  const wallet = await Secp256k1HdWallet.fromMnemonic(mnemonic);

  // Using
  const client = await SigningCosmWasmClient.connectWithSigner(
    DEFAULT_RPC_ENDPOINT,
    wallet,
  );
  console.log(client);
}

main();