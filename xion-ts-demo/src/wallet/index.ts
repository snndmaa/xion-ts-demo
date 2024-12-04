import { DEFAULT_RPC_ENDPOINT } from "../connection";
import { SigningCosmWasmClient, Secp256k1HdWallet } from "cosmwasm";
import * as bip39 from 'bip39';

class Wallet {
    private mnemonic: string;
    static rpcEndpoint: string = DEFAULT_RPC_ENDPOINT;

    constructor() {
        // Generate a new mnemonic (24 words by default)
        this.mnemonic = bip39.generateMnemonic(256); // 256 bits = 24 words
        // or for 12 words use: bip39.generateMnemonic(128); // 128 bits = 12 words
    }

    public getMnemonic(): string {
        return this.mnemonic;
    }

    public async fromMnemonic(): Promise<Secp256k1HdWallet> {
        const wallet = await Secp256k1HdWallet.fromMnemonic(this.mnemonic, {prefix: 'xion'});
        return wallet
    }
}

export default Wallet;