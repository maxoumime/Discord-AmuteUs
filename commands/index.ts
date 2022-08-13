import {PingCommand} from "./ping";
import {MuteCommand} from "./mute";
import type {Client, Guild} from "discord.js";

export interface Commands {
    ping: PingCommand;
    mute: MuteCommand;
}

const commandNames = ['ping', 'mute'];

export function isValidCommand(commandName: string): commandName is keyof Commands {
    return commandNames.includes(commandName);
}

export function makeCommands(client: Client, guild: Guild): Commands {
    return {
        ping: new PingCommand(guild),
        mute: new MuteCommand(client, guild)
    };
}
