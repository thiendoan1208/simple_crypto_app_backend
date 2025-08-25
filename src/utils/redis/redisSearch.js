const { client } = require("../../db/redis_db");

const createSearchCoinIndex = async (index) => {
  try {
    const allIndex = await client.ft._list();

    if (allIndex.includes(index)) {
      return;
    }

    await client.ft.create(
      index,
      {
        "$.uuid": {
          type: "TEXT",
          AS: "uuid",
        },
        "$.name": {
          type: "TEXT",
          AS: "name",
        },
        "$.symbol": {
          type: "TEXT",
          AS: "symbol",
        },
        "$.rank": {
          type: "NUMERIC",
          AS: "rank",
        },
        "$.marketCap": {
          type: "TEXT",
          AS: "marketCap",
        },
        "$.price": {
          type: "TEXT",
          AS: "price",
        },
      },
      {
        ON: "JSON",
        PREFIX: "coins:search:",
      }
    );
  } catch (error) {
    if (error.message.includes("Index already exists")) {
      console.log("⚠️ Index already exists, skipping creation.");
    } else {
      console.error("❌ Error creating index:", error);
    }
  }
};

module.exports = {
  createSearchCoinIndex,
};
