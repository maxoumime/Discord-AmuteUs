import {Commands, isValidCommand} from "../commands";
import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

export function listenTty(commands: Commands) {
    rl.on('line', async (line) => {
        const [command, ...args] = line.trim().replace(/ {2,+}/, ' ').split(' ');
        if (!isValidCommand(command)) {
            return;
        }

        const result = await commands[command].executeAsync({
            isFlagamax: true,
            mute: args[0] ? args[0].toLowerCase() === 'true' : null
        });
        console.log('[TTY]', result);
    });

    console.log('TTY Ready!');
}