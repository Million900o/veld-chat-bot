const { Command } = require('command-framework');

class StatsCommand extends Command {
  constructor(...args) {
    super({
      name: 'stats',
      aliases: ['ce'],
      requiredPermissions: null,
      botPermissions: 100,
      description: 'Get the bot stats.',
      disabled: false,
    }, ...args);
  }

  run(message, args) {
    const cachedUsers = Object.keys(this.client.cache.users).length;
    const cachedChannels = Object.keys(this.client.cache.channels).length;
    const mem = {};
    Object.entries(process.memoryUsage()).map(e => mem[e[0]] = Math.round(e[1] / 1024 / 1024 * 10) / 10 + "MB");
    this.client.sendEmbed(message, 'Stats', [
      { name: 'Memory', value: mem.rss },
      { name: 'Cached Users', value: cachedUsers },
      { name: 'Cached Channels', value: cachedChannels }
    ]);
  }
}

module.exports = StatsCommand;
