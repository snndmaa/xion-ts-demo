import { GasPrice, SigningStargateClient, coins } from '@cosmjs/stargate';
import { DirectSecp256k1Wallet } from '@cosmjs/proto-signing';
import { toBech32 } from '@cosmjs/encoding';
import { rawSecp256k1PubkeyToRawAddress } from '@cosmjs/amino'
import Connection from '../connection'


class Transaction extends Connection {
    amount: [string:1]
    recipient: string

    constructor() {
        super();
    }
    
    public async send (amount: [string:1], recipient: string) {
        this.amount    = amount
        this.recipient = recipient

        const connection = new Connection().connect()

        
        
        await sendTokens(alice_sender, recipient, amount, "auto", "sending a msg!");
    }
}