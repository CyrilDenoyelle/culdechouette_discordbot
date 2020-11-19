
const includesOneOf = (text, arr) => {
  let output = false;
  arr.forEach((str) => {
    text.toLowerCase().includes(str) ? output = true : null;
  });
  return output;
};

const startsWithOneOf = (text, arr) => {
  let output = false;
  arr.forEach((str) => {
    text.toLowerCase().startsWith(str) ? output = true : null;
  });
  return output;
};

module.exports = {
  includesOneOf,
  startsWithOneOf
};
