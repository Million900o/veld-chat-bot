module.exports = {
  name: 'chav',
  aliases: [],
  description: 'Change the bot\'s avatar',
  run: (client, message, args) => {
    return;
    if(!client.DB.collection('settings').get('owners').includes(message.author.id)) return;
    client.socket.emit("message:create", { content: "/avatar", channelId: message.channel.id });
    client.sendEmbed(message, 'Changed Avatar',[ { name: 'New Avatar', value: 'placholder' }])
  }
}