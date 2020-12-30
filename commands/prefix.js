const { Embed } = require("veldchat.js");

module.exports = {
  name: 'prefix',
  aliases: [],
  run: (client, message, args) => {
    if(!args[0]) return message.channel.send(new Embed().setTitle('Prefix').addField('Current Prefix', client.DB.collection('settings').get('prefix')))
    const prefix = String(args[0]);
    client.commandHandler.prefix = prefix;
    client.DB.collection('settings').set('prefix', prefix);
    message.channel.send(new Embed().setTitle('Prefix').addField('New Prefix', prefix))
  }
}