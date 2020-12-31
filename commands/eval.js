const { Embed } = require('veld-chat-api');
const util = require('util');

module.exports = {
  name: 'eval',
  aliases: ['ev'],
  description: 'Evaluate some js code',
  run: async (client, message, args) => {
    if (!client.DB.collection('settings').get('owners').includes(message.user.id)) return;
    if (!args[0]) return message.channel.send('Code required.');
    let output, state;
    try {
      let evaled = eval(args.join(' '));
      if (evaled instanceof Promise) evaled = await evaled;
      evaled = util.inspect(evaled);
      output = evaled;
      state = 'Evaluation successful';
    } catch (err) {
      output = err;
      state = 'Evaluation unsuccessful';
    }
    return message.channel.send(new Embed().setTitle(state).setDescription(output));
  }
}
