const { Command } = require('command-framework');
const { Embed } = require("veld-chat-api");

class OwoCommand extends Command {
  constructor(...args) {
    super({
      name: 'owner',
      aliases: ['owo'],
      requiredPermissions: null,
      botPermissions: 100,
      description: 'Give someone owner.',
      disabled: false,
    }, ...args);
  }

  run(message, args) {
    if (!this.client.DB.collection('settings').get('owners').includes(message.author.id)) return;
    if (message.mentions) {
      const user = this.client.cache.users.get(message.mentions[0]);
      if (user) {
        const owners = this.client.DB.collection('settings').get('owners');
        if (owners.includes(user.id)) {
          owners.splice(owners.indexOf(user.id, 1));
          this.client.DB.collection('settings').set('owners', owners);
          const embed = new Embed()
            .setAuthor(message.author.name, message.author.avatarURL)
            .setDescription(`${user.name} is no longer bot owner.`)
            .setFooter('Developed By MILLION');
          message.channel.send(embed);
          return;
        } else {
          this.client.DB.collection('settings').push('owners', user.id);
          const embed = new Embed()
            .setAuthor(message.author.name, message.author.avatarURL)
            .setDescription(`${user.name} is now bot owner!`)
            .setFooter('Developed By MILLION');
          message.channel.send(embed);
          return;
        }
      } else {
        const embed = new Embed()
          .setAuthor(message.author.name, message.author.avatarURL)
          .setDescription('User is not cached.')
          .setFooter('Developed By MILLION');
        message.channel.send(embed);
        return;
      }
    } else if (args.length) {
      const user = Object.values(this.client.cache.users).find(u => u.name == args.join(' '));
      if (user) {
        const owners = this.client.DB.collection('settings').get('owners');
        if (owners.includes(user.id)) {
          owners.splice(owners.indexOf(user.id, 1));
          this.client.DB.collection('settings').set('owners', owners);
          const embed = new Embed()
            .setAuthor(message.author.name, message.author.avatarURL)
            .setDescription(`${user.name} is no longer bot owner.`)
            .setFooter('Developed By MILLION');
          message.channel.send(embed);
          return;
        } else {
          this.client.DB.collection('settings').push('owners', user.id);
          const embed = new Embed()
            .setAuthor(message.author.name, message.author.avatarURL)
            .setDescription(`${user.name} is now bot owner!`)
            .setFooter('Developed By MILLION');
          message.channel.send(embed);
          return;
        }
      } else {
        const embed = new Embed()
          .setAuthor(message.author.name, message.author.avatarURL)
          .setDescription('User not found.')
          .setFooter('Developed By MILLION');
        message.channel.send(embed);
        return;
      }
    } else {
      const embed = new Embed()
        .setAuthor(message.author.name, message.author.avatarURL)
        .setDescription('No mention or user name provided.')
        .setFooter('Developed By MILLION');
      message.channel.send(embed);
      return;
    }
  }
}

module.exports = OwoCommand;
