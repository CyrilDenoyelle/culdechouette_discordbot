
// Regle Cul de chouette Rule: if all the dices are equals
const culDeChouette = dices => dices[0] === dices[1] && dices[1] === dices[2];

// Chouette Rule: if 2 dices are equals
const chouette = dices => dices[0] === dices[1] || dices[1] === dices[2] || dices[0] === dices[2];

// Velute Rule: if 2 dices are de sum of the third
const velute = (dices) => {
  dices.sort((a, b) => a - b);
  return dices[0] + dices[1] === dices[2];
};

// Suite Rule: if there are 3 consecutive numbers
const suite = (dices) => {
  dices.sort((a, b) => a - b);
  return dices[0] === dices[1] - 1 && dices[1] === dices[2] - 1;
};

// Neant Rule: None of the precedent rules are triggered
const neant = dices => !(culDeChouette(dices) || chouette(dices) || velute(dices) || suite(dices));

const chouetteVelute = dices => chouette(dices) && velute(dices);

module.exports = {
  culDeChouette,
  chouette,
  velute,
  suite,
  neant,
  chouetteVelute
};
