const axios = require("../config/axios");
const { setRedisJson, getRedisJson } = require("../utils/redis/redisJson");
const { setRedisHash, getAllRedisHash } = require("../utils/redis/redisHash");
const {
  createTimeSeries,
  addTimeSeriesValue,
  getTimeSeriesRange,
} = require("../utils/redis/redisTimeSeries");
const { redisKey, redisIndex } = require("../utils/redis/redisSchemas");
const { client } = require("../db/redis_db");
const { createSearchCoinIndex } = require("../utils/redis/redisSearch");

const handleGetCoins = async () => {
  try {
    const allCoinStats = await getRedisJson(redisKey.allCoinStat);
    const allCoins = await getRedisJson(redisKey.allCoinList);

    if (allCoinStats !== null && allCoins !== null) {
      return {
        success: true,
        data: {
          stats: allCoinStats,
          coins: allCoins,
        },
      };
    } else {
      const { data } = await axios.get(
        "/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&orderBy=marketCap&orderDirection=desc&limit=50&offset=0"
      );

      await setRedisJson(redisKey.allCoinStat, data.stats, 60);
      await setRedisJson(redisKey.allCoinList, data.coins, 60);

      await createSearchCoinIndex(redisIndex.searchCoinIndex);

      data.coins.forEach(async (coin) => {
        await setRedisJson(redisKey.searchCoin(coin.name), coin, 60 * 60);
      });

      return data;
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: null,
    };
  }
};

const handleGetCoinDetail = async (uuid) => {
  try {
    const coinDetail = await getRedisJson(redisKey.coinDetail(uuid));
    if (coinDetail !== null) {
      return {
        success: true,
        coinDetail,
      };
    } else {
      const { data } = await axios.get(
        `/coin/${uuid}?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h`
      );

      await setRedisJson(redisKey.coinDetail(uuid), data, 5 * 60);

      return data;
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: null,
    };
  }
};

const handleGetCoinPrice = async (uuid) => {
  try {
    const coinPrice = await getAllRedisHash(redisKey.coinPrice(uuid));

    if (Object.keys(coinPrice).length > 0) {
      return {
        success: true,
        coinPrice,
      };
    } else {
      const { data } = await axios.get(
        `/coin/${uuid}/price?referenceCurrencyUuid=yhjMzLPhuIDl`
      );

      await setRedisHash(redisKey.coinPrice(uuid), data, 20);

      return data;
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: null,
    };
  }
};

const handleGetCoinPriceHistory = async (uuid, time) => {
  try {
    const exist = await client.exists(redisKey.coinPriceHistory(uuid, time));
    if (exist) {
      const data = await getTimeSeriesRange(
        redisKey.coinPriceHistory(uuid, time),
        "-",
        "+"
      );

      return {
        success: true,
        data,
      };
    } else {
      const { data } = await axios.get(
        `/coin/${uuid}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${time}`
      );

      await createTimeSeries(redisKey.coinPriceHistory(uuid, time), {
        RETENTION: 31536000000,
        LABELS: { coin: uuid, time },
      });
      await client.expire(redisKey.coinPriceHistory(uuid, time), 60);

      data.history.forEach(async (entry) => {
        if (entry.price !== null) {
          await addTimeSeriesValue(
            redisKey.coinPriceHistory(uuid, time),
            entry.timestamp * 1000,
            entry.price
          );
        }
      });
      return data;
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: null,
    };
  }
};

const handleSearchCoins = async (keyword) => {
  try {
    const results = await client.ft.search(
      redisIndex.searchCoinIndex,
      `@name:${keyword}* | @symbol:${keyword}*`
    );
    return {
      success: true,
      results,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: null,
    };
  }
};

module.exports = {
  handleGetCoins,
  handleGetCoinDetail,
  handleGetCoinPrice,
  handleGetCoinPriceHistory,
  handleSearchCoins,
};
