import 'dotenv/config';
import {PingCommand} from "./ping";
import {MuteCommand} from "./mute";
import type {Client} from "discord.js";

const {DISCORD_GUILD_ID} = process.env;

export interface Commands {
    ping: PingCommand;
    mute: MuteCommand;
}

const commandNames = ['ping', 'mute'];

export function isValidCommand(commandName: string): commandName is keyof Commands {
    return commandNames.includes(commandName);
}

export async function makeCommandsAsync(client: Client): Promise<Commands> {
    const guild = await client.guilds.fetch(DISCORD_GUILD_ID!);
    return {
        ping: new PingCommand(guild),
        mute: new MuteCommand(client, guild)
    };
}
