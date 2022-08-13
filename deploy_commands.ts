import "dotenv/config";
import {Routes, SlashCommandBuilder} from "discord.js";
import {REST} from "@discordjs/rest";

const {DISCORD_TOKEN, DISCORD_CLIENT_ID, DISCORD_GUILD_ID} = process.env;

const commands = [
    new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with pong!"),

    new SlashCommandBuilder()
        .setName("mute")
        .addBooleanOption(builder =>
            builder.setName('status')
                .setDescription('On or off')
                .setRequired(false)
        )
        .setDescription("Toggles mute status."),

].map((command) => command.toJSON());

const rest = new REST({version: "10"}).setToken(DISCORD_TOKEN!);

rest
    .put(Routes.applicationGuildCommands(DISCORD_CLIENT_ID!, DISCORD_GUILD_ID!), {
        body: commands,
    })
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);
