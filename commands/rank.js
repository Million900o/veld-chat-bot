const Canvas = require('canvas');
const FormData = require('form-data');
const fetch = require('node-fetch');
const config = require('../config.json');

const { Command } = require('command-framework');
const { Embed } = require("veld-chat-api");

class RankCommand extends Command {
  constructor(...args) {
    super({
      name: 'rank',
      aliases: ['ra'],
      requiredPermissions: null,
      botPermissions: 100,
      description: 'Get your rank.',
      disabled: false,
    }, ...args);
  }

  async run(message, args) {
    if (!this.client.DB.collection('levels').has(message.author.id)) setLevelData(message);
    const data = this.client.DB.collection('levels').get(message.author.id);
    const user = message.author;

    const currLevel = data.level;
    const currXp = data.xp;
    const nextXp = Math.floor(100 + 5 / 6 * currLevel * (2 * currLevel * currLevel + 27 * currLevel + 91));

    const tag = '─────────────────';
    const pfp = user.avatarURL;
    const color = '#07bb5b';

    const canvas = Canvas.createCanvas(750, 250);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#23272A';
    ctx.fillRect(0, 0, 1000, 250);

    ctx.lineWidth = 45;
    ctx.strokeStyle = '#2C2F33';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.font = '26px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`Level: ${currLevel}   XP: ${currXp} / ${nextXp}`, 275, canvas.height / 2);

    ctx.font = 'normal 32px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${user.name}`, 275, canvas.height / 3.5);

    ctx.font = 'bold 32px sans-serif';
    ctx.fillStyle = color;
    ctx.fillText(tag, 275, canvas.height / 1.35);

    const percentage = Math.floor(currXp / nextXp * 100) / 100;
    const twoPI = 2 * Math.PI;
    const pointFivePI = 0.5 * Math.PI;

    const arcLength = percentage * twoPI;
    const totalLength = arcLength - pointFivePI;

    ctx.strokeStyle = '#2C2F33';
    ctx.lineWidth = '35';
    ctx.beginPath();
    ctx.arc(125, 125, 85, 1.5 * Math.PI, 1.51 * Math.PI, true);
    ctx.stroke();

    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(125, 125, 86, 1.5 * Math.PI, totalLength, false);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(125, 125, 85, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(pfp);
    ctx.drawImage(avatar, 33, 32, 185, 185);

    const formData = new FormData();
    formData.append('file', canvas.toBuffer('image/png'));

    const fetchResponse = await fetch('https://is-a.computer/upload', {
      method: 'POST',
      headers: {
        token: config.api
      },
      body: formData
    });
    const jsonResponse = await fetchResponse.json();
    const embed = new Embed()
      .setThumbnail(jsonResponse.url);
    message.channel.send(embed);
  }
}

module.exports = RankCommand;
