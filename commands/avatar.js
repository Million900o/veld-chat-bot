const { Embed } = require('veld-chat-api');
const util = require('util')

module.exports = {
  name: 'avatar',
  aliases: ['av'],
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