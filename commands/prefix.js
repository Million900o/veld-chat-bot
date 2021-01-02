const { Command } = require('command-framework');
const { Embed } = require("veld-chat-api");

class PrefixCommand extends Command {
  constructor(...args) {
    super({
      name: 'prefix',
      aliases: [],
      requiredPermissions: null,
      botPermissions: 100,
      description: 'Change the bot\'s prefix.',
      disabled: false,
    }, ...args);
  }

  run(message, args) {
    if(!args[0]) return message.channel.send(new Embed().setTitle('Prefix').addField('Current Prefix', this.client.DB.collection('settings').get('prefix')))
    const prefix = String(args.join(' '));
    this.client.commandHandler.options.defaultPrefix = prefix;
    this.client.DB.collection('settings').set('prefix', prefix);
    message.channel.send(new Embed().setTitle('Prefix').addField('New Prefix', prefix))
  }
}

module.exports = PrefixCommand;
