const config = require('./config.json')
const jasondb = require('jason.db')
const DB = new jasondb.DB('data.jason', { writeFile: true, renameFile: true })
DB.collection('settings', { caching: true })
DB.collection('levels', { caching: true })

if(!DB.collection('settings').has('prefix')) {
  DB.collection('settings').set('prefix', 'ra');
}

if(!DB.collection('settings').has('owners')) {
  DB.collection('settings').set('owners', []);
}

const veldchat = require('veldchat.js')
const client = new veldchat.Client(config.token, { debug: true, name: config.name })
client.commandHandler = new (require('./commandHandler'))(client, DB.collection('settings').get('prefix'), 'commands', { debug: true })

client.DB = DB

client.sendEmbed = (m, title, fields) => {
  let description;
  fields.forEach(field => {
    description = description ? description + '\n' + `**${field.name}**: ${field.value}` : `**${field.name}**: ${field.value}`
  })
  const embed = new veldchat.Embed()
    .setAuthor(m.user.name + ' | ' + title, m.user.avatarUrl)
    .setDescription(description)
    .setFooter('Developed By MILLION')
    .setColor(0)
    .parse()
  return m.channel.send(embed);
}

client.on('message', (m) => {
  if(DB.collection('levels').has(m.user.id)) {
    const data = DB.collection('levels').get(m.user.id);
    data.xp = data.xp + Math.floor(Math.random() * 8) + 8;
    if (data.xp > Math.floor(100 + 5 / 6 * data.level * (2 * data.level * data.level + 27 * data.level + 91))) {
      data.xp = 0
      data.level++
    };
    DB.collection('levels').set(m.user.id, data);
  } else {
    DB.collection('levels').set(m.user.id, {
      xp: 0,
      level: 0
    })
  }
})