
const oneDice6 = () => Math.floor(Math.random() * 6) + 1;

const quickOrder = (players) => {

  players.forEach((player) => { // all players make a roll
    player.roll = oneDice6();
  });

  players.sort((a, b) => a.roll - b.roll); // order the players by their rolls
  // console.log('order players', players);

  const result = [];
  while (players.length > 0) { // while there is players in the list
    const player = players[0];

    const sameRoll = players.filter(pl => pl.roll === player.roll);
    if (sameRoll.length >= 2) {
      const o = quickOrder(sameRoll);

      o.forEach((p) => {
        delete p.roll;
        players.shift();
      });

      result.push(...o); // pushs each ordered players

    } else {
      delete players[0].roll;
      result.push(players.shift());
    }
  }

  return result;
};

function* orderGen(players, result = []) {

  const playersTemp = [...players];

  while (playersTemp.length > 0) { // all players roll a dice
    const { player, roll } = yield;
    const playersTempIndex = playersTemp.findIndex(p => p.id === player.id);

    if (playersTemp[playersTempIndex]) { // player who rolls the dice
      playersTemp.splice(playersTempIndex, 1); // remove the player from the temporary list
      players[players.findIndex(p => p.id === player.id)].roll = roll; // assigning the roll to the player
    }
  }

  players.sort((a, b) => a.roll - b.roll);

  const text = players.map(p => `${p.id} rolled ${p.roll}`).join('\n');
  console.log(`---- ordered\n${text}\n----`);

  while (players.length > 0) { // while there are  players in the list
    const player = players[0]; // take the first player

    const sameRoll = players.filter(pl => pl.roll === player.roll);
    if (sameRoll.length >= 2) { // if more than 2 players have the same roll

      console.log(`les joueurs ${sameRoll.map(p => p.id).join(', ')} sont a egalite et rejouent`);
      const r = yield* orderGen(sameRoll); // regenerate the orderGen function

      r.forEach((p) => {
        delete p.roll; // cleans the player's object
        result.push(p); // adds the player to the result
        players.shift(); // removes the player from the list
      });

    } else {
      delete players[0].roll; // cleans the player's object
      result.push(players.shift()); // removes the player from the list and adds him to the result
    }
  }

  return result;
}


module.exports = {
  quickOrder,
  orderGen
};
