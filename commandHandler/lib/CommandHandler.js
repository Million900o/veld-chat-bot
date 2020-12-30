const path = require('path');
const fs = require('fs')
const loggers = require('loggers');

module.exports = class CommandHandler {
  constructor(client, prefix = 'ra', dir = 'commands', options = { debug: true }) {
    this.logger = new loggers.Logger({ debug: options.debug, catch: false, colors: true, newLine: false, method: console.log })
    this.dir = path.resolve(dir);
    this.prefix = prefix;
    this.commands = new Map();
    this.aliases = new Map();
    this.client = client;
    this.options = options;
    fs.readdir(this.dir, (err, files) => {
      files.forEach(file => {
        const command = require(`${this.dir}/${file}`)
        this.commands.set(command.name, command);
        command.aliases.forEach(alias => {
          this.aliases.set(alias, command);
        });
        this.logger.debug('Loaded command', command.name);
      });
    });
    client.on('message', (m) => {
      this.handleCommand(m);
    })
  }

  handleCommand (message) {
    const content = message.content;
    if(content.startsWith(this.prefix)) {
      const contentArray = message.content.slice(this.prefix.length).split(' ')
      const commandName = contentArray[0];
      const args = contentArray.slice(1);
      const command = this.aliases.get(commandName) || this.commands.get(commandName);
      if(command) {
        this.logger.debug('Ran command', command.name)
        command.run(this.client, message, args)
      } else return;
    } else return;
  };

};