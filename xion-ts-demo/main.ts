import { coins } from '@cosmjs/stargate';
import Transaction from './src/transaction';

const bob_recipient = 'xion1j0se0le8vftzmvqmfddf9qcamz3445r98p52th060jdhjyrl3v2qn4scdq';
const amount = coins('1', 'uxion');

async function main() {
    try {
        const transaction = new Transaction();
        transaction.connect();
        // await transaction.initialize(); // Ensure the wallet is connected before sending
        await transaction.send(amount, bob_recipient);
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

main().catch(console.error);