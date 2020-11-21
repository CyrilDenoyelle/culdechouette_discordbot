const { v4: uuid } = require('uuid');
const { quickOrder, orderGen } = require('./order.js');

const oneDice6 = () => Math.floor(Math.random() * 6) + 1;
const nDice = n => Array.from({ length: n }, () => oneDice6());

class Game {
  constructor({ creator, channelId }) {
    this.id = uuid();
    this.players = []; // prepares players list
    this.started = false; // the game hasn't started
    this.creator = creator;
    this.channelId = channelId;

    console.log('game crée');
    this.players.push(creator); // registers the game creator
  }

  register(player) { // registers the given player
    if (!this.started) {

      if (this.creator.id === player.id) {
        return { error: `${player.name} est creator donc n'as pas besoin de s'inscrire` };
      }
      if (this.players.find(p => p.id === player.id)) {
        return { error: `${player.name} est deja inscrit` };
      }

      this.players.push(player);
      console.log('inscription', player);
      return { msg: `${player.name} s'est inscrit` };
    }
    return { error: `${player.name}, les inscriptions sont fermées` };
  }

  start({ player, fast }) { // starts the game: player.id needs to be the creator id
    if (this.started) return { error: 'game already started' };

    if (player.id === this.creator.id) { // if the player starting the game is the creator
      this.started = true;

      if (fast) { // if option fast is true
        this.players = quickOrder([...this.players]);
        this.ordered = true;
        return { msg: `l'ordre des joueurs sera: ${this.players.map(p => p.name).join(', ')}. GLHF` };
      }

      // if fast is false or undefined
      this.ordering = orderGen([...this.players]); // starts ordering process
      this.ordering.next();

      return { msg: 'Les joueurs font tous un roll' };
    }

    return { error: `${player.name} n'est pas le createur (uniquement ${this.creator.name} peut commencer la game)` };
  }

  roll({ player: pl }) { // rolls the dice.s

    if (!this.started) return { error: 'la game n\'as pas start (si tout les joueurs sont inscrits le createur de la game doit ecrire "start")' };

    const { players } = this;
    const player = players.find(p => p.id === pl.id);

    if (player) {

      // ordering round
      if (!this.ordered) {
        const roll = oneDice6();
        const { done, value } = this.ordering.next({ player, roll });
        this.ordered = done;

        if (!done) {
          return { msg: `${player.name} a fait ${roll}` };
        }

        this.players = value; // set the new order of players
        return {
          msg: `${player.name} a fait ${roll}... Et la game demare! l'ordre de jeu sera: ${value.map(p => p.name).join(', ')}. GLHF`
        };

      }

      // game's normal round code goes here

      const roll = nDice(3);
      return { msg: `${player.name} a fait ${roll.join(', ')}` };
    }

    return { error: `${pl.name} n'est pas dans la game` };
  }
}

module.exports = Game;
