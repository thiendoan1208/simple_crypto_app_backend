const { client } = require("../../db/redis_db");

const createTimeSeries = async (key, options) => {
  try {
    await client.ts.create(key, options);
  } catch (error) {
    console.log(error);
    return {
      error: "An error occured while using TS.CREATE in RedisTimeSeries Utils",
    };
  }
};

const addTimeSeriesValue = async (key, timestamp, value) => {
  try {
    await client.ts.add(key, timestamp, value);
  } catch (error) {
    console.log(error);
    return {
      error: "An error occured while using TS.ADD in RedisTimeSeries Utils",
    };
  }
};

const getTimeSeriesRange = async (key, fromTimeStamp, toTimeStamp) => {
  try {
    await client.ts.range(key, fromTimeStamp, toTimeStamp);
  } catch (error) {
    console.log(error);
    return {
      error: "An error occured while using TS.RANGE in RedisTimeSeries Utils",
    };
  }
};

module.exports = {
  createTimeSeries,
  addTimeSeriesValue,
  getTimeSeriesRange,
};
