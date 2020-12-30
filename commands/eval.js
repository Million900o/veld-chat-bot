const { Embed } = require("veld-chat-api");
const util = require('util')

module.exports = {
  name: 'eval',
  aliases: ['ev'],
  description: 'Evaluate some js code',
  run: (client, message, args) => {
    if(!client.DB.collection('settings').get('owners').includes(message.user.id)) return;
    try {
      const code = util.inspect(eval(args.join(' ')));
      message.channel.send(new Embed().setTitle('Eval Successful').setDescription(code));
    } catch (err) {
      message.channel.send(new Embed().setTitle('Eval Unsuccessful').setDescription(err.toString()));
    }
  }
}