module.exports = {
  name: 'stats',
  aliases: ['ce'],
  description: 'Get the bot\'s stats',
  run: (client, message, args) => {
    const cachedUsers = Object.keys(client.cache.users).length
    const cachedChannels = Object.keys(client.cache.channels).length
    const mem = {};
    Object.entries(process.memoryUsage()).map(e => mem[e[0]] = Math.round(e[1] / 1024 / 1024 * 10) / 10 + "MB");
    client.sendEmbed(message, 'Stats',[ 
      { name: 'Memory', value: mem.rss },
      { name: 'Cached Users', value: cachedUsers },
      { name: 'Cached Channels', value: cachedChannels }
    ])
  }
}