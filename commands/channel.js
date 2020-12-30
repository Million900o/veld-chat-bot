module.exports = {
  name: 'botcommands',
  aliases: ['bc'],
  description: 'Get the bot-commands channel',
  run: (client, message, args) => {
    message.channel.send('{#6750094203461566464}')
  }
}