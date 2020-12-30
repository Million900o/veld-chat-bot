module.exports = {
  name: 'stats',
  aliases: ['ce'],
  run: (client, message, args) => {
    const cachedUsers = client.users.size
    const cachedChannels = client.channels.size
    const mem = {};
    Object.entries(process.memoryUsage()).map(e => mem[e[0]] = Math.round(e[1] / 1024 / 1024 * 10) / 10 + "MB");
    client.sendEmbed(message, 'Ping',[ 
      { name: 'Memory', value: mem.rss },
      { name: 'Cached Users', value: cachedUsers },
      { name: 'Cached Channels', value: cachedChannels }
    ])
  }
}