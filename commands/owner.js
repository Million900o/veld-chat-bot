const { Embed } = require("veld-chat-api");

module.exports = {
  name: 'owner',
  aliases: ['owo'],
  description: 'Add or remove someone as owner',
  run: (client, message, args) => {
    if(!client.DB.collection('settings').get('owners').includes(message.user.id)) return;
    if(message.mentions) {
      const user = client.users.get(message.mentions[0]);
      if(user) {
        const owners = client.DB.collection('settings').get('owners');
        if(owners.includes(user.id)) {
          owners.splice(owners.indexOf(user.id, 1));
          message.channel.send(new Embed().setAuthor(message.user.name, message.user.avatarUrl).setDescription(`${user.name} is no longer bot owner.`).setFooter('Developed By MILLION'))
          return;
        } else {
          client.DB.collection('settings').push('owners', user.id);
          message.channel.send(new Embed().setAuthor(message.user.name, message.user.avatarUrl).setDescription(`${user.name} is now bot owner!`).setFooter('Developed By MILLION'))
          return;
        }
      } else return message.channel.send(new Embed().setAuthor(message.user.name, message.user.avatarUrl).setDescription('User is not cached.').setFooter('Developed By MILLION'))
    } else return message.channel.send(new Embed().setAuthor(message.user.name, message.user.avatarUrl).setDescription('You must include a user\'s name.').setFooter('Developed By MILLION'))
  }
}