const { Embed } = require("veld-chat-api");

module.exports = {
  name: 'help',
  aliases: ['h', 'halp', 'elp', '\'elp'],
  description: 'Help menu smh',
  run: (client, message, args) => {
    if (args.length > 0) {
      const command = client.commandHandler.aliases.get(args[0]) || client.commandHandler.commands.get(args[0])
      if (command) {
        client.sendEmbed(message, 'Help', [ { name: 'Name', value: command.name }, { name: 'Aliases', value: command.aliases.join(', ') }, { name: 'Description', value: command.description }])
        return;
      } else {
        const embed = new Embed()
          .setAuthor(message.user.name + ' | Help', message.user.avatarUrl)
          .setDescription('Command ' + args[0] + ' not found')
          .setFooter('Developed by MILLION')
        message.channel.send(embed)
        return;
      }
    } else {
      const embed = new Embed()
        .setAuthor(message.user.name + ' | Help', message.user.avatarUrl)
        .setDescription(Array.from(client.commandHandler.commands.keys()).join(', '))
        .setFooter('Developed By MILLION')
      message.channel.send(embed);
    }
    return;
  }
}