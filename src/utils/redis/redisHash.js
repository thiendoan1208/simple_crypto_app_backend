const { client } = require("../../db/redis_db");

const setRedisHash = async (key, value, ttl) => {
  try {
    await client.hSet(key, value);
    if (ttl) {
      client.expire(key, ttl);
    }
  } catch (error) {
    console.log(error);
    return {
      error: "An error occured while using HSET in RedisHash Utils",
    };
  }
};

const getAllRedisHash = async (key) => {
  try {
    return await client.hGetAll(key);
  } catch (error) {
    console.log(error);
    return {
      error: "An error occured while using HGETALL in RedisHash Utils",
    };
  }
};

module.exports = {
  setRedisHash,
  getAllRedisHash,
};
