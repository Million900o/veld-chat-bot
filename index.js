const config = require('./config.json')
const jasondb = require('jason.db')
const DB = new jasondb.PoggersDB('poggers.jason', { writeFile: true, renameFile: true })
DB.collection('settings')
DB.collection('levels')

if(!DB.collection('settings').has('prefix')) {
  DB.collection('settings').set('prefix', 'ra');
}

if(!DB.collection('settings').has('owners')) {
  DB.collection('settings').set('owners', []);
}

const veldchat = require('veld-chat-api')
const client = new veldchat.Client()
client.commandHandler = new (require('command-framework')).Handler({defaultPrefix: 'ra', commandDir: 'commands' }, client)

client.DB = DB

client.sendEmbed = (m, title, fields) => {
  let description;
  fields.forEach(field => {
    description = description ? description + '\n' + `**${field.name}**: ${field.value}` : `**${field.name}**: ${field.value}`
  })
  const embed = new veldchat.Embed()
  .setAuthor(m.author.name + ' | ' + title, m.author.avatarURL)
  .setDescription(description)
  .setFooter('Developed By MILLION')
  .setColor(0)
  .parse()
  return m.channel.send(embed);
}

client.on('message', (m) => {
  if(DB.collection('levels').has(m.author.id)) {
    const data = DB.collection('levels').get(m.author.id);
    data.xp = data.xp + Math.floor(Math.random() * 8) + 8;
    if (data.xp > Math.floor(100 + 5 / 6 * data.level * (2 * data.level * data.level + 27 * data.level + 91))) {
      data.xp = 0
      data.level++
    };
    DB.collection('levels').set(m.author.id, data);
  } else {
    DB.collection('levels').set(m.author.id, {
      xp: 0,
      level: 0
    })
  }
})

client.connect(config.token);