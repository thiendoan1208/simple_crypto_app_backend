const {
  handleGetCoins,
  handleGetCoinDetail,
  handleGetCoinPrice,
  handleGetCoinPriceHistory,
  handleSearchCoins,
} = require("../services/coinsService");

const getCoins = async (req, res) => {
  try {
    const data = await handleGetCoins();

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

const getCoinDetail = async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const data = await handleGetCoinDetail(uuid);

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

const getCoinPrice = async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const data = await handleGetCoinPrice(uuid);

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

const getCoinPriceHistory = async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const time = req.params.time;
    const data = await handleGetCoinPriceHistory(uuid, time);

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

const searchCoins = async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const data = await handleSearchCoins(keyword);

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getCoins,
  getCoinDetail,
  getCoinPrice,
  getCoinPriceHistory,
  searchCoins,
};
