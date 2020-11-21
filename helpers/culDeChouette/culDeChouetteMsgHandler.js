
const Game = require('./Game.js');

const gameHandler = (res, channel) => {
  const { msg, error } = res;

  if (error) { // if there is an error
    channel.send(`Ousp: ${error}`);
  } else if (msg) { // if there is no error and a message
    channel.send(msg);
  }
  // in case there is nothing, do nothing
};

const games = [];

const msgHandler = (msg) => {

  const player = {
    id: msg.author.id,
    name: msg.author
  };

  if (msg.content.startsWith('!cdc')) {
    const args = msg.content.split(' ');
    args.shift();

    if (args[0] === 'create') { // if first arg is "create"

      if (games.find(g => g.channelId === msg.channel.id)) {
        msg.channel.send('une game existe deja dans ce channel');

      } else {
        const game = new Game({
          creator: player,
          channelId: msg.channel.id
        }); // creates a new game with author as creator and specify the channel id
        games.push(game);

        msg.channel.send('Inscription a reaction')
          .then(async (m) => {
            await m.react('✅'); // https://emojipedia.org/thumbs-up/
            return m;
          }).then(m => m.awaitReactions((reaction, user) => {
            console.log('reaction', user.username);

            if (user.id !== process.env.SELFT_ID && reaction.emoji.name === '✅') {
              gameHandler(game.register({ id: user.id, name: user.username }), msg.channel);
            }

          }, { max: 100, time: 600000, errors: ['time'] }));

      }
    }
  }

  const game = games.find(g => g.channelId === msg.channel.id);

  if (game) {

    if (msg.content === 'start') {
      gameHandler(game.start({ player }), msg.channel);
    }

    if (msg.content === 'r') {
      gameHandler(game.roll({ player }), msg.channel);
    }

  }

};

module.exports = {
  msgHandler
};
