const express = require("express");
const { apiRoutes } = require("../src/routes/apiRoutes");
const { config } = require("dotenv");
config();

const app = express();
const port = 4000;
const hostname = "localhost";

// config body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`Example app listening on http://${hostname}:${port}`);
});
