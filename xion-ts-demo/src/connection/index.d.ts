import { GasPrice, SigningStargateClient, StargateClient, coins } from '@cosmjs/stargate';
import { DirectSecp256k1Wallet } from '@cosmjs/proto-signing';


export interface Connectable {
    gasPrice: GasPrice;
    key: string;
    rpcEndpoint: string;
    wallet: DirectSecp256k1Wallet;
    client: SigningStargateClient | StargateClient;
}