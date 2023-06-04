require("dotenv").config();
require("./data/db");
const express = require("express");
const animeRoutes = require("./routes/animeRoutes");

const app = express();

app.use(express.json());
app.use(function (req, res, next) {
  console.log(req.method, req.url);
  next();
});
app.use(`${process.env.API}/animes`, animeRoutes);

const server = app.listen(process.env.PORT, function () {
  console.log("Server is listening on", server.address().port);
});