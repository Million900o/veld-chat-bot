const { Command } = require('command-framework');
const shiro = require('shiro-ts');
const { Embed } = require('veld-chat-api');

class AvatarCommand extends Command {
  constructor(...args) {
    super({
      name: 'kiss',
      aliases: [],
      requiredPermissions: null,
      botPermissions: 0,
      description: 'Kiss someone',
      disabled: false,
    }, ...args);
  }

  async run(message, args) {
    const user = this.client.cache.users.values().find(u => u.name == args.join(' ')) || message.author;
    const response = await shiro.sfw('kiss');
    const code = response.code
    if(code === 200) {
      const embed = new Embed()
        .setAuthor(message.author.name + ' kissed ' + user.name, message.author.avatarURL)
        .setThumbnail(response.url);
      message.channel.send(embed);
      return;
    } else {
      const embed = new Embed()
        .setAuthor(message.author.name + ' | Kiss', message.author.avatarURL)
        .setDescription('An unknown error has occured, try again later.')
        .setFooter('Developed By MILLION');
      message.channel.send(embed);
      return;
    }
  }
}

module.exports = AvatarCommand;
