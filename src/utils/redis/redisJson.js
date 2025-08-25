const { client } = require("../../db/redis_db");

const setRedisJson = async (key, value, ttl) => {
  try {
    await client.json.set(key, "$", value);
    if (ttl) {
      client.expire(key, ttl);
    }
  } catch (error) {
    console.log(error);
    return {
      error: "An error occured while using SET in RedisJson Utils",
    };
  }
};

const getRedisJson = async (key) => {
  try {
    return await client.json.get(key);
  } catch (error) {
    console.log(error);
    return {
      error: "An error occured while using GET in RedisJson Utils",
    };
  }
};

module.exports = {
  setRedisJson,
  getRedisJson,
};
