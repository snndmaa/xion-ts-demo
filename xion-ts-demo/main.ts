const readline = require('readline')
import { coins } from '@cosmjs/stargate';
import Transaction from './src/transaction';

// const bob_recipient = 'xion1j0se0le8vftzmvqmfddf9qcamz3445r98p52th060jdhjyrl3v2qn4scdq';
// const amount = coins('1', 'uxion');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const send = async (transaction: Transaction) => {
    await transaction.connectSignerClient();

    
    const recipientPrompt = (req: string) => {
        return new Promise((resolve) => {
            rl.question(req, (res: string) => {
                resolve(res)
            })
        })
    };
    
    const amountPrompt = async (req: string) => {
        const rawAmount: string = await new Promise((resolve) => {
            rl.question(req, (res: string) => {
                resolve(res);
            })
        })
    
        return coins(parseInt(rawAmount), 'uxion');
    }

    const recipient = await recipientPrompt('Enter Recipient Address: ') as string;
    const amount    = await amountPrompt('Enter Uxion Amount: ');

    await transaction.sendUXion(amount, recipient);

    rl.close()
}

const balance = async (transaction: Transaction) => {
    await transaction.connectClient();

    const addressPrompt = (req: string) => {
        return new Promise((resolve) => {
            rl.question(req, (res: string) => {
                resolve(res)
            })
        })
    };

    await transaction.checkBalance(await addressPrompt('Enter Address: ') as string);
    
    rl.close()
} 

async function main() {
    try {
        const operationPrompt = (req: string) => {
            return new Promise((resolve) => {
                rl.question(req, (res: string) => {
                    resolve(res)
                })
            })
        };

        const operation = await operationPrompt("Enter desired operation: ") as string;

        const transaction = new Transaction();
        
        switch (operation) {
            case "send":
                send(transaction);
                break;

            case "balance":
                balance(transaction);
                break;
            default:
                throw "Invalid Operation"
        }

    } catch (error) {
        console.error("An error occurred:", error);
    }
}

main().catch(console.error);