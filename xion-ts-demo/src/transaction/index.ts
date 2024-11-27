import { coins, GasPrice } from '@cosmjs/stargate';
import { toBech32 } from '@cosmjs/encoding';
import { Coin, rawSecp256k1PubkeyToRawAddress } from '@cosmjs/amino';
import Connection from '../connection';

class Transaction extends Connection {
    constructor() {
        super();
    }

    public async balance() {
        
    }

    public async send(amount: Coin[], recipient: string) {
        if (!this.wallet) throw new Error("Wallet not connected");
        const [account] = await this.wallet.getAccounts();
        if (!account) throw new Error("Account not found");
        const senderAddress = toBech32("xion", rawSecp256k1PubkeyToRawAddress(account.pubkey));

        const tx = await this.client.sendTokens(
            senderAddress,
            recipient,
            amount,
            "auto", // Example Gas
            "Sending tokens"
        );
        console.log("Transaction hash:", tx.transactionHash);
    }
}

export default Transaction;