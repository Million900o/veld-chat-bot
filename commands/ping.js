const { Command } = require('command-framework');

class AvatarCommand extends Command {
  constructor(...args) {
    super({
      name: 'ping',
      aliases: ['p', 'pping', 'pper'],
      requiredPermissions: null,
      botPermissions: 0,
      description: 'Pong!.',
      disabled: false,
    }, ...args);
  }

  run(message, args) {
    this.client.sendEmbed(message, 'Ping', [{ name: 'Ping', value: 'Pong!' }]);
    return;
  }
}

module.exports = AvatarCommand;
