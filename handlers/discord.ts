import 'dotenv/config';
import {Commands, isValidCommand} from "../commands";
import {Client} from "discord.js";

const {DISCORD_FLAGAMAX_ID} = process.env;

export function listenDiscord(client: Client, commands: Commands) {
    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isChatInputCommand()) {
            return;
        }

        console.log('[DISCORD]', interaction.toString());
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

    console.log('Discord Ready!');
}