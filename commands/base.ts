import type {Guild} from 'discord.js';

export interface DefaultCommandOptions {
  isAdmin: boolean;
}

export abstract class Command<Options extends object = {}> {
  protected guild: Guild;
  constructor(guild: Guild) {
    this.guild = guild;
  }

  // eslint-disable-next-line no-unused-vars
  abstract executeAsync(options: Options & DefaultCommandOptions): Promise<string>;
}
