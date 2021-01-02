const { Command } = require('command-framework');

class AvatarCommand extends Command {
  constructor(...args) {
    super({
      name: 'avatar',
      aliases: ['av'],
      requiredPermissions: null,
      botPermissions: 0,
      description: 'Get your avatar.',
      disabled: false,
    }, ...args);
  }

  run(message, args) {
    message.channel.send(message.author.avatarURL);
    return;
  }
}

module.exports = AvatarCommand;
