import { SigningCosmWasmClient, Secp256k1HdWallet } from "cosmwasm";
import Wallet from "./wallet";
import { toBech32 } from '@cosmjs/encoding';
import { rawSecp256k1PubkeyToRawAddress } from '@cosmjs/amino'
import { coins } from '@cosmjs/stargate';
;import { GasPrice } from "cosmwasm";


async function main() {
    const walletInstance = new Wallet();
    const wallet: Secp256k1HdWallet = await walletInstance.fromMnemonic()
    
    const gasPrice = GasPrice.fromString("0.001uxion");
    const txOptions = { 
        gasPrice
    };

    const client = await SigningCosmWasmClient.connectWithSigner(
        Wallet.rpcEndpoint,
        wallet,
        txOptions,
    );

    const [senderAccount] = await wallet.getAccounts()
    const sender = toBech32("xion",rawSecp256k1PubkeyToRawAddress(senderAccount.pubkey))
    const amount = coins('1', 'uxion');
    const recipient = 'xion1j0se0le8vftzmvqmfddf9qcamz3445r98p52th060jdhjyrl3v2qn4scdq';

    const result = await client.sendTokens(
        sender,
        recipient,
        amount,
        "auto",
    )
    console.log(result)
}
main();
