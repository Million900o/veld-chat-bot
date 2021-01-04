const { Embed } = require("veld-chat-api");

module.exports = (m, title, fields) => {
  let description;
  fields.forEach(field => {
    description = description ? description + '\n' + `**${field.name}**: ${field.value}` : `**${field.name}**: ${field.value}`;
  });
  const embed = new Embed()
    .setAuthor(m.author.name + ' | ' + title, m.author.avatarURL)
    .setDescription(description)
    .setFooter('Developed By MILLION')
    .setColor(0)
    .parse();
  return m.channel.send(embed);
};
