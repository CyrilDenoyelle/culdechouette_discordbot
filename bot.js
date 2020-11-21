const express = require('express');
const { Client } = require('discord.js');

process.env.NODE_ENV = process.env.NODE_ENV || 'local';
const config = require('config').get(process.env.NODE_ENV);

Object.keys(config).forEach((k) => {
  process.env[k] = config[k];
});

const port = process.env.PORT || 8080;

express() // turn server on for Heroku
  .get('/', (req, res) => { JSON.parse(res); })
  .listen(port, () => {
    console.log(`Our app is running on http://localhost: ${port}`);
  });

// requires
const { msgHandler } = require('./helpers/messages.js');

// set discord BOT client
const client = new Client();

client.on('ready', () => {
  // porcess.env (get bot id for self messages detection)
  process.env.SELF_ID = client.user.id;

  console.log(`Logged in as ${client.user.tag}! id: ${process.env.SELF_ID}`);

  // to stop spam durring dev: comment from here -------------
  const defaultGuild = client.guilds.cache.find(guild => guild.id === process.env.DEFAULT_GUILD);
  defaultGuild.members.fetch(process.env.ADMIN)
    .then(user => user.createDM()) // create direct message channel with the user
    .then(dmChannel => dmChannel.send('Bonjour je suis UP et prèt a développer...')) // then send a message to the user
    .catch(console.error);

  client.channels.cache.get(process.env.UP_CHANNEL) // get channel with id = process.env.UP_CHANNEL
    .send('UP UP UP !') // post a message on founded channel
    .then(e => e.delete({ timeout: 5000 })); // delete message after 5 secs
  // to here -------------

});

client.on('message', (msg) => { // on message received in any channel where the bot is
  msgHandler(msg); // we pass the message to msgHandler
});

client.on('error', console.error);

client.login(process.env.TDPASS).catch(console.error); // log the bot to discord servers with the env var process.env.TDPASS = token of the bot
