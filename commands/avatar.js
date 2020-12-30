module.exports = {
  name: 'avatar',
  aliases: ['av'],
  description: 'Get your cached avatar',
  run: (client, message, args) => {
    if(message.mentions.length > 0) {
      const user = client.users.get(message.mentions[0]);
      message.channel.send(user.avatarUrl);
      return;
    }
    message.channel.send(message.user.avatarUrl);
    return;
  }
}