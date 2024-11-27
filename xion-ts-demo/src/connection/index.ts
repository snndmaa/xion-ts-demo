import { GasPrice, SigningStargateClient, StargateClient, coins } from '@cosmjs/stargate';
import { DirectSecp256k1Wallet } from '@cosmjs/proto-signing';
import * as dotenv from 'dotenv';


dotenv.config();

const DEFAULT_RPC_ENDPOINT = 'https://rpc.xion-testnet-1.burnt.com:443';

class Connection {
    private gasPrice: GasPrice;
    private key: string;
    private rpcEndpoint: string = DEFAULT_RPC_ENDPOINT;
    wallet: DirectSecp256k1Wallet;
    client: SigningStargateClient | StargateClient;

    constructor(privateKey?: string, rpcEndpoint?: string) {
        this.gasPrice = GasPrice.fromString("0uxion");
        this.key = privateKey || process.env.PRIVATE_KEY || '';
        this.rpcEndpoint = rpcEndpoint || DEFAULT_RPC_ENDPOINT;

        if (!this.key) {
            throw new Error("Private key is not set. Provide it in the constructor or set the PRIVATE_KEY environment variable.");
        }
    }

    async initializeWallet() {
        this.wallet = await DirectSecp256k1Wallet.fromKey(
            Buffer.from(this.key, 'hex'),
            'xion'
        );
    }


    async connectSignerClient() {
        try {
            await this.initializeWallet()

            this.client = await SigningStargateClient.connectWithSigner(
                this.rpcEndpoint,
                this.wallet,
                { gasPrice: this.gasPrice }
            );

            const accounts = await this.wallet.getAccounts();
            if (accounts.length === 0) throw new Error("No accounts found in the wallet.");
            
            console.log(
                "Connected to the network with address:", 
                accounts[0].address
            );
        } catch (error) {
            console.error(
                "Failed to connect:", 
                error
            );
        }
    }

    async connectClient() {
        try{
            this.client = await StargateClient.connect(
                this.rpcEndpoint
            );
            console.log(
                "Client Connected: ", 
                this.client
            );
        } catch (error) {
            console.error(
                "Failed to connect:", 
                error
            );
        }
    }
}
export default Connection;
