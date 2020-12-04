
module.export = {
  // Regle Cul de chouette Rule: if all the dices are equals
  culDeChouette: dices => dices[0] === dices[1] && dices[1] === dices[2],

  // Chouette Rule: if 2 dices are equals
  chouette: dices => dices[0] === dices[1] || dices[1] === dices[2] || dices[0] === dices[2];
}