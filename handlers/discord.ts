import 'dotenv/config';
import type {Commands} from '../commands';
import {isValidCommand} from '../commands';
import type {Client} from 'discord.js';

const {DISCORD_ADMIN_ID} = process.env;

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
            isAdmin: interaction.user.id === DISCORD_ADMIN_ID,
            mute: interaction.options.getBoolean('status')
        });
        await interaction.reply(reply);
    });

    console.log('Discord Ready!');
}
