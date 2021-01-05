const { Command } = require('command-framework');
const shiro = require('shiro-ts');
const { Embed } = require('veld-chat-api');

class AvatarCommand extends Command {
  constructor(...args) {
    super({
      name: 'hug',
      aliases: [],
      requiredPermissions: null,
      botPermissions: 0,
      description: 'Hug someone',
      disabled: false,
    }, ...args);
  }

  async run(message, args) {
    const user = this.client.cache.users.values().find(u => u.name == args.join(' ')) || message.author;
    const response = await shiro.sfw('hug');
    const embed = new Embed()
      .setAuthor(message.author.name + ' hugged ' + user.name, message.author.avatarURL)
      .setThumbnail(response.url);
    message.channel.send(embed);
    return;
  }
}

module.exports = AvatarCommand;
