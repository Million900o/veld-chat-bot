const { Embed } = require('veldchat.js');
const util = require('util')

module.exports = {
  name: 'avatar',
  aliases: ['av'],
  run: (client, message, args) => {
    message.channel.send(message.user.avatarUrl);
  }
}