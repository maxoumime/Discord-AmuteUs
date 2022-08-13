import type {Guild} from "discord.js";

export interface DefaultCommandOptions {
    isFlagamax: boolean;
}

export abstract class Command<Options extends object = {}> {
    protected guild: Guild;
    constructor(guild: Guild) {
        this.guild = guild;
    }

    abstract executeAsync(options: Options & DefaultCommandOptions): Promise<string>;
}