const { Command } = require('command-framework');
const { Embed } = require("veld-chat-api");

class HelpCommand extends Command {
  constructor(...args) {
    super({
      name: 'help',
      aliases: ['elp', '\'elp', 'h', 'halp'],
      requiredPermissions: null,
      botPermissions: 0,
      description: 'You need some help.',
      disabled: false,
    }, ...args);
  }

  run(message, args) {
    if (args.length > 0) {
      const command = this.client.commandHandler.aliases.get(args[0]) || this.client.commandHandler.commands.get(args[0])
      if (command) {
        this.client.sendEmbed(message, 'Help', [ { name: 'Name', value: command.name }, { name: 'Aliases', value: command.aliases.join(', ') }, { name: 'Description', value: command.description }])
        return;
      } else {
        const embed = new Embed()
          .setAuthor(message.author.name + ' | Help', message.author.avatarURL)
          .setDescription('Command ' + args[0] + ' not found')
          .setFooter('Developed by MILLION')
        message.channel.send(embed)
        return;
      }
    } else {
      const embed = new Embed()
        .setAuthor(message.author.name + ' | Help', message.author.avatarURL)
        .setDescription(Array.from(this.client.commandHandler.commands.keys()).join(', '))
        .setFooter('Developed By MILLION')
      message.channel.send(embed);
    }
    return;
  }
}

module.exports = HelpCommand;
