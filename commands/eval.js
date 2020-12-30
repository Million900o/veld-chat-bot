const { Embed } = require("veldchat.js");
const util = require('util')

module.exports = {
  name: 'eval',
  aliases: ['ev'],
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