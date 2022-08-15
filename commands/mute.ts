import 'dotenv/config';
import type {Client, Guild, GuildMember} from 'discord.js';
import type {DefaultCommandOptions} from './base';
import {Command} from './base';

const {DISCORD_CHANNEL_ID} = process.env;

interface Options {
  mute: boolean | null;
}

export class MuteCommand extends Command<Options> {
  private muteAll = false;

  constructor(client: Client, guild: Guild) {
    super(guild);

    client.on('voiceStateUpdate', async (oldState, newState) => {
      // We only care about channel ID changes.
      if (oldState.channelId === newState.channelId) {
        return;
      }

      if (newState.channelId === null) {
        return;
      }

      if (newState.channel?.id !== DISCORD_CHANNEL_ID) {
        await newState.setMute(false);
        return;
      }

      await newState.setMute(this.muteAll);
    });
  }

  async executeAsync(options: DefaultCommandOptions & Options) {
    if (!options.isAdmin) {
      return "You're not allowed to run this command.";
    }

    const mute = (this.muteAll = options.mute ?? !this.muteAll);

    await this.setMuteAllStatusAsync(mute);
    return `Players are ${mute ? 'muted' : 'un-muted'}`;
  }

  async setMuteAllStatusAsync(muteAll: boolean) {
    const members = await this.guild.members.fetch();

    for (const [, member] of members) {
      await this.setMuteMemberAsync(member, muteAll);
    }
  }

  async setMuteMemberAsync(member: GuildMember, mute: boolean) {
    if (member.user.bot) {
      return;
    }

    if (member.voice.channelId === null) {
      return;
    }

    if (!mute) {
      await member.voice.setMute(false);
      return;
    }

    if (member.voice.channel?.id !== DISCORD_CHANNEL_ID) {
      return;
    }

    await member.voice.setMute(true, 'Council started.');
  }
}
