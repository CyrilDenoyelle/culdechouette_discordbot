
const whiteList = process.env.GUILDS_WHITE_LIST;

const isWhiteListGuild = id => whiteList.split(', ').includes(id);

module.exports = {
  isWhiteListGuild
};
