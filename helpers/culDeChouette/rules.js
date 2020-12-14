
// Regle Cul de chouette Rule: if all the dices are equals
const culDeChouette = (dices) => {
  if (dices[0] === dices[1] && dices[1] === dices[2]) {
    return dices[0];
  }
  return false;
};

// Chouette Rule: if 2 dices are equals
const chouette = (dices) => {
  if (dices[0] === dices[1]) return dices[0];
  if (dices[1] === dices[2]) return dices[1];
  if (dices[2] === dices[0]) return dices[2];
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

// Chouette Velute Rule: if 2 equal dices are the sum of the third
const chouetteVelute = (dices) => {
  const isChouette = chouette(dices);
  const isVelute = velute(dices);
  if (isChouette && isVelute) return isVelute;
  return false;
};

// Suite Velute Rule: If the dices are equal to 1, 2 and 3
const suiteVelute = (dices) => {
  const isSuite = suite(dices);
  const isVelute = velute(dices);
  if (isSuite && isVelute) return isVelute;
  return false;
};

// Contains a function and associated template for each rules
const rules = [
  {
    function: chouetteVelute,
    template: dice => `Chouette velute de ${dice}`
  },
  {
    function: culDeChouette,
    template: dice => `Cul de chouette de ${dice}`
  },
  {
    function: chouette,
    template: dice => `Chouette de ${dice}`
  },
  {
    function: suiteVelute,
    template: dice => `Suite velute de ${dice}`
  },
  {
    function: suite,
    template: () => 'Suite'
  },
  {
    function: velute,
    template: dice => `Velute de ${dice}`
  }
];

// Takes input:dices (ex: [6, 6, 6]), output: 'Cul de chouette de 6'
const rulesHandler = (dices) => {

  let result = 'neant';
  for (let i = 0; i < rules.length; i += 1) {
    const rule = rules[i];
    const ruleResult = rule.function(dices);
    if (ruleResult) {
      result = rule.template(ruleResult);
      break;
    }
  }
  return result;

};

module.exports = rulesHandler;
