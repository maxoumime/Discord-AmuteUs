import 'dotenv/config';
import {Client, GatewayIntentBits} from 'discord.js';
import type {Commands} from './commands';
import {makeCommandsAsync} from './commands';
import {listenHttp} from './handlers/http';
import {listenTty} from './handlers/tty';
import {listenDiscord} from './handlers/discord';

const {DISCORD_TOKEN} = process.env;

let client: Client | undefined;
let globalCommands: Commands | undefined;

const main = async () => {
  client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildVoiceStates,
    ],
  });

  await client.login(DISCORD_TOKEN);

  const commands = (globalCommands = await makeCommandsAsync(client));

  listenDiscord(client, commands);
  listenTty(commands);
  listenHttp(commands);

  await new Promise<void>((resolve) => {
    return process.once('SIGINT', resolve);
  });
};

let exitCode = 0;
main()
  .catch(async (err) => {
    console.log(err);
    exitCode = 1;
  })
  .finally(async () => {
    console.log('Un-muting everyone.');
    await globalCommands?.mute?.executeAsync({
      isFlagamax: true,
      mute: false,
    });
    console.log('Disconnecting...');
    client?.destroy();
    process.exit(exitCode);
  });
