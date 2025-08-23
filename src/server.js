const express = require("express");
const { config } = require("dotenv");
config();

const app = express();
const port = process.env.LETWATCH_BE_PORT || 4000;
const hostname = process.env.LETWATCH_BE_HOSTNAME;

// config body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Example app listening on http://${hostname}:${port}`);
});
