module.exports = {
  name: 'ping',
  aliases: ['p', 'pping'],
  run: (client, message, args) => {
    client.sendEmbed(message, 'Ping',[ { name: 'Socket Ping', value: 'undefined' }])
  }
}