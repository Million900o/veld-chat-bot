const util = require('util')
const { Command } = require('command-framework');
const { Embed } = require('veld-chat-api');

class EvalCommand extends Command {
  constructor(...args) {
    super({
      name: 'eval',
      aliases: ['ev'],
      requiredPermissions: null,
      botPermissions: 100,
      description: 'Eval some code.',
      disabled: false,
    }, ...args);
  }

  async run(message, args) {
    // if (!this.client.DB.collection('settings').get('owners').includes(message.author.id)) return;
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
    return message.channel.send(new Embed().setTitle(state).setDescription('```js\n' + output + '\n```'));
  }
}

module.exports = EvalCommand;
