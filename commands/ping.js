module.exports = {
  name: 'ping',
  aliases: ['p', 'pping'],
  description: 'Get the bot\'s ping',
  run: (client, message, args) => {
    client.sendEmbed(message, 'Ping',[ { name: 'Socket Ping', value: 'PLACEHOLDER'}])
  }
}