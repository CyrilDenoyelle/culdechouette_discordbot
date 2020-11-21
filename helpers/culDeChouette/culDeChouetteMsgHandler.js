
const Game = require('./Game.js');

const gameHandler = (res, channel) => { // takes game response object and channel where it need to send message
  if (res) {
    const { msg, error } = res;

    if (error) { // if there is an error
      channel.send(`Ousp: ${error}`);
    } else if (msg) { // if there is no error and a message
      channel.send(msg);
    }

    // in case there is neither msg nor the error
  } else {
    // in case there is no response
    console.log(`gameHandler => "res is ${res}"`);
  }
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
            // await m.react('✅'); // https://emojipedia.org/thumbs-up/
            game.inscriptionMessageId = m.id;
            return m;
          });

        // if discord.js fixes onReactions or we found WTF happens
        // .then(() => {

        //   const filter = (reaction, user) => {
        //     console.log({ reaction, user });
        //     console.log(user.id !== process.env.SELFT_ID);
        //     console.log(reaction.emoji.name === '✅');
        //     return user.id !== process.env.SELFT_ID && reaction.emoji.name === '✅';
        //   };
        //   m.awaitReactions(filter, { max: 100, time: 20000, errors: ['time'] })
        //     .then((r) => {
        //       console.log('r', r);
        //       // gameHandler(game.register({ id: user.id, name: user }), msg.channel);
        //     }).catch((err) => {
        //       console.log('err', err);
        //     });
        // });

      }
    }
  }

  const game = games.find(g => g.channelId === msg.channel.id);

  if (game) {

    if (msg.content === 'inscription') {
      gameHandler(game.register(player), msg.channel);
    }

    if (msg.content === 'start') {

      // console.log(game.inscriptionMessageId);
      // msg.channel.messages.fetch(game.inscriptionMessageId)
      //   .then((inscriptionMessage) => {
      //     const reactions = inscriptionMessage.reactions.cache.get('✅');
      //     console.log('reactions', reactions);
      //   });

      // gameHandler(game.register({ id: user.id, name: user }), msg.channel);
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
