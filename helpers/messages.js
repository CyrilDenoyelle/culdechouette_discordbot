
const { isWhiteListGuild } = require('./middlewares/guilds.js');
const { includesOneOf } = require('./secondary/oneOf.js');

const msgHandler = (msg) => {
  // IN EVERY CASES
  if (includesOneOf(msg.content, ['bite', 'queue', 'zizi', 'prepu', 'organe genital', 'pine'])) {
    msg.react('🍆');
  }

  // IF NOT SELF MESSAGE
  if (msg.author.id !== process.env.SELF_ID) {
    // PING PONG
    if (msg.content.toLowerCase().includes('pong')) {
      msg.channel.send('Ping', {
        tts: true
      });
    }
    if (msg.content.toLowerCase().includes('ping')) {
      msg.channel.send('Pong!', {
        tts: true
      });
    }

    // GUILD MIDDLEWARES
    //  || msg.author.id == process.env.ADMIN
    if (msg.guild && isWhiteListGuild(msg.guild.id)) { }

  }
};

module.exports = {
  msgHandler
};
