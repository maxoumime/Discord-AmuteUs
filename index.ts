import 'dotenv/config';
import {Client, GatewayIntentBits} from "discord.js";
import type {Commands} from "./commands";
import {isValidCommand, makeCommands} from "./commands";
import readline from "readline";

const {DISCORD_GUILD_ID, DISCORD_TOKEN, DISCORD_FLAGAMAX_ID} = process.env;

let globalCommands: Commands | undefined;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

const main = async () => {
    const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildVoiceStates]});

    client.once('ready', () => {
        console.log('Ready!');
    });

    await client.login(DISCORD_TOKEN);

    const guild = await client.guilds.fetch(DISCORD_GUILD_ID!);

    const commands = makeCommands(client, guild);
    globalCommands = commands;

    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isChatInputCommand()) {
            return;
        }

        console.log(interaction.toString());
        const {commandName} = interaction;

        if (!isValidCommand(commandName)) {
            await interaction.reply(`Unknown command: ${commandName}`);
            return;
        }

        const command = commands[commandName];
        const reply = await command.executeAsync({
            isFlagamax: interaction.user.id === DISCORD_FLAGAMAX_ID,
            mute: interaction.options.getBoolean('status')
        });
        await interaction.reply(reply);
    });

    rl.on('line', async (line) => {
        const [command, ...args] = line.trim().replace(/ {2,+}/, ' ').split(' ');
        if (!isValidCommand(command)) {
            return;
        }

        const result = await commands[command].executeAsync({
            isFlagamax: true,
            mute: args[0] ? args[0].toLowerCase() === 'true' : null
        });
        console.log(result);
    });
};

main()
    .catch(async (err) => {
        console.log('Un-muting everyone.');
        await globalCommands?.mute?.executeAsync({
            isFlagamax: true,
            mute: false
        });
        console.log(err);
        process.exit(1);
    });
