module.exports = {
  name: 'say',
  aliases: [],
  description: 'Say something as the bot',
  run: (client, message, args) => {
    if(!client.DB.collection('settings').get('owners').includes(message.author.id)) return;
    message.channel.send(args.join(' '));
  }
}