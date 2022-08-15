# AmuteUs

![Among Us Shhh](https://www.gamereactor.fr/media/97/superdata_3339753.jpg)

This is a Discord bot that mutes everyone in the channel when the admin types `/mute`.

# Usage

On Discord

- `/mute` toggles the Mute status.
- `/mute True` mutes everyone.
- `/mute False` un-mutes everyone.

On TTY

- `mute`
- `mute true`
- `mute false`

On HTTP
```http request
POST localhost:3000/commands/mute
{
  "mute": true // or false, or undefined
}
```

# Installation

## Pre-requisites
- Create a Discord application through the developer page and a bot.
- Have a prepared Node.js developer environment.
- Enable Dev settings in Discord.

## Setup

Copy `.env.default` to `.env` and complete the missing data.

- `DISCORD_TOKEN` Bot private token.
- `DISCORD_CLIENT_ID` Application private token.
- `DISCORD_GUILD_ID` Server ID copied directly from Discord.
- `DISCORD_CHANNEL_ID` Your "Among Us" Voice Channel ID copied directly from Discord.
- `DISCORD_ADMIN_ID` ID of the user allowed to execute the command.

Run `yarn install`.

## Install on your server

Prepare and run the following link.

`https://discord.com/api/oauth2/authorize?client_id={DISCORD_CLIENT_ID}&permissions=8&scope=bot%20applications.commands`

## Run the app

Run `yarn start`.

Refer to [Usage](#usage) for commands.
