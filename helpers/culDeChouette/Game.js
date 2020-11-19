const { v4: uuid } = require('uuid');
const { quickOrder, orderGen } = require('./order.js');

const oneDice6 = () => Math.floor(Math.random() * 6) + 1;

class Game {
  constructor(creator) {
    this.id = uuid();
    this.players = []; // prepares players list
    this.started = false; // the game hasn't started
    this.creator = creator;

    console.log('game crée');
    this.register(creator); // registers the game creator
  }

  register(playerId) { // registers the given player
    if (!this.started) {
      this.players.push({ id: playerId });
      console.log('inscription', { id: playerId });
      return { msg: `inscription id: ${playerId}` };
    }
    return { error: `Déso ${playerId}, les inscriptions sont fermées` };
  }

  start({ id, fast }) { // starts the game: id need to be the creator id
    if (this.started) return { msg: 'already started' };

    if (id === this.creator) { // if the player starting the game is the creator
      this.started = true;

      if (fast) { // if option fast is true
        this.players = quickOrder([...this.players]);
        this.ordered = true;
        return { msg: `l'ordre des joueurs sera: ${this.players.map(p => p.id).join(', ')}` };
      }

      // if fast is false or undefined
      this.ordering = orderGen([...this.players]); // starts ordering process
      this.ordering.next();

      return { msg: 'Les joueurs font tous un roll' };
    }

    return { error: `${id} n'est pas le createur (uniquement ${this.creator} peut commencer la game)` };
  }

  roll(pl) { // starts a roll the dice.s

    if (!this.started) return { error: 'la game n\'as pas start' };

    const { players } = this;
    const player = players.find(p => p.id === pl.id);

    if (player) {

      // ordering turn
      if (!this.ordered) {
        const { done, value } = this.ordering.next({ player, roll: oneDice6() });
        this.ordered = done;

        return done ? { msg: 'la game demare lul' } : { msg: value };
      }

      // game turn code goes here

      return { msg: 'normal round' };
    }

    return { error: `Déso ${pl.id}, inscriptions fermées` };
  }
}

// test game
const game = new Game('1');
game.register('2');
game.register('3');
game.register('4');
game.register('5');
game.register('6');
const players = [
  { id: '1' },
  { id: '2' },
  { id: '3' },
  { id: '4' },
  { id: '5' },
  { id: '6' }
];

// game.roll('2');

// game.start('1');
const { msg: msgStart, error: errorStart } = game.start({ id: '1' });
msgStart ? console.log('msgStart', msgStart) : null;
errorStart ? console.log('errorStart', errorStart) : null;

// // game.start('4');

// // game.register('5');
// // game.roll('5');


let playerIndex = 0;
while (!game.ordered) {
  // tant que les joueurs ne sont pas mis dans l'ordre croissant
  // par rapport a leurs rolls, sans egalitee

  const { msg, error } = game.roll(players[playerIndex]);
  msg ? console.log('msg', msg) : null;
  error ? console.log('error', error) : null;

  // playerIndex = playerIndex <= 0 ? players.length - 1 : playerIndex - 1;
  playerIndex = playerIndex >= players.length - 1 ? 0 : playerIndex + 1;
}

console.log('game.ordered', game.ordered);

module.exports = Game;
