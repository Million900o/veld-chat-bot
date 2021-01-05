const { Command } = require('command-framework');
const shiro = require('shiro-ts');
const { Embed } = require('veld-chat-api');

class AvatarCommand extends Command {
  constructor(...args) {
    super({
      name: 'pat',
      aliases: [],
      requiredPermissions: null,
      botPermissions: 0,
      description: 'Pat someone',
      disabled: false,
    }, ...args);
  }

  async run(message, args) {
    const user = this.client.cache.users.values().find(u => u.name == args.join(' ')) || message.author;
    const response = await shiro.sfw('pat');
    const embed = new Embed()
      .setAuthor(message.author.name + ' patted ' + user.name, message.author.avatarURL)
      .setThumbnail(response.url);
    message.channel.send(embed);
    return;
  }
}

module.exports = AvatarCommand;
