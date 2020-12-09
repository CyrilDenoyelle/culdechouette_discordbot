
// Regle Cul de chouette Rule: if all the dices are equals
const culDeChouette = (dices) => {
  if (dices[0] === dices[1] && dices[1] === dices[2]) {
    return dices[0];
  }
  return false;
};

// Chouette Rule: if 2 dices are equals
const chouette = (dices) => {
  if (dices[0] === dices[1]) {
    return dices[0];
  }
  if (dices[1] === dices[2]) {
    return dices[1];
  }
  if (dices[2] === dices[0]) {
    return dices[2];
  }
  return false;
};

// Velute Rule: if 2 dices are de sum of the third
const velute = (dices) => {
  dices.sort((a, b) => a - b);
  if (dices[0] + dices[1] === dices[2]) {
    return dices[2];
  }
  return false;
};

// Suite Rule: if there are 3 consecutive numbers
const suite = (dices) => {
  dices.sort((a, b) => a - b);
  return dices[0] === dices[1] - 1 && dices[1] === dices[2] - 1;
};

// Neant Rule: None of the precedent rules are triggered
const neant = dices => !(culDeChouette(dices) || chouette(dices) || velute(dices) || suite(dices));

const chouetteVelute = (dices) => {
  if (chouette(dices) && velute(dices)) {
    return velute(dices);
  }
  return false;
};

const suiteVelute = (dices) => {
  if (suite(dices) && velute(dices)) {
    return velute(dices);
  }
  return false;
};

const rules = [
  chouetteVelute,
  culDeChouette,
  chouette,
  suiteVelute,
  suite,
  velute
];

const rulesHandler = (dices) => {

  rules.forEach((rule) => {
    const ruleResult = rule(dices);
    if (ruleResult) {
      return `${rule} de ${ruleResult}`;
    }
    return false;
  });
  return 'neant';
};

module.exports = rulesHandler;
