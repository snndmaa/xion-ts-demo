import { DEFAULT_RPC_ENDPOINT } from "../connection";
import * as bip39 from 'bip39';

class Wallet {
    private key: string;
    mnemonic: string;
    private rpcEndpoint: string = DEFAULT_RPC_ENDPOINT;

    constructor() {
        // Generate a new mnemonic (24 words by default)
        this.mnemonic = bip39.generateMnemonic(256); // 256 bits = 24 words
        // or for 12 words use: bip39.generateMnemonic(128); // 128 bits = 12 words
    }

    public getMnemonic(): string {
        return this.mnemonic;
    }

    // Recover wallet from mnemonic
    public static fromMnemonic(mnemonic: string): Wallet {
        const wallet = new Wallet();
        if (!bip39.validateMnemonic(mnemonic)) {
            throw new Error('Invalid mnemonic phrase');
        }
        wallet.mnemonic = mnemonic;
        // Generate seed from mnemonic
        const seed = bip39.mnemonicToSeedSync(mnemonic);
        // You can then use this seed to derive your private key
        console.log(seed);
        console.log(wallet);
        return wallet;
    }
}

const wallet = new Wallet()
wallet.getMnemonic()
Wallet.fromMnemonic(wallet.mnemonic)