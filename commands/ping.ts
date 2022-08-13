import {Command} from "./base";

export class PingCommand extends Command {
    async executeAsync() {
        return 'Pong';
    }
}