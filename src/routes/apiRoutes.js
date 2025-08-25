const express = require("express");
const { getCoins, getCoinDetail, getCoinPrice, getCoinPriceHistory, searchCoins } = require("../controllers/coinsController");

const apiRoutes = express.Router();

// Get Coins Info
apiRoutes.get("/coins", getCoins);
apiRoutes.get("/coin/:uuid", getCoinDetail)
apiRoutes.get("/coin/price/:uuid", getCoinPrice)
apiRoutes.get("/coin/price/history/:uuid/:time", getCoinPriceHistory)

// Search coin 
apiRoutes.post('/coin/search/:keyword', searchCoins)

module.exports = {
  apiRoutes,
};
