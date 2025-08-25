const redisKey = {
  // getCoins
  allCoinStat: "coins:stats",
  allCoinList: "coins:list:all",

  // searchCoinInfo
  searchCoin: (name) => `coins:search: ${name}`,

  // coinDetail
  coinDetail: (uuid) => `coin:detail:${uuid}`,

  // coinPrice
  coinPrice: (uuid) => `coin:price:${uuid}`,

  // coinPriceHistory
  coinPriceHistory: (uuid, time) => `coin:history:${uuid}:${time}`,
};

const redisIndex = {
  // searchCoinIndex
  searchCoinIndex: "idx:search_coins",
};

module.exports = {
  redisKey,
  redisIndex,
};
