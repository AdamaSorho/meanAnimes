require("dotenv").config();
require("./api/data/db");
const express = require("express");
const animeRoutes = require("./api/routes/animeRoutes");

const app = express();

app.use(express.json());
app.use(function (req, res, next) {
  console.log(req.method, req.url);
  next();
});
app.use(process.env.API, function (req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.FRONTENT_URL);
  res.header("Access-Control-Allow-Methods", "DELETE, PUT, PATCH");
  res.header("Access-Control-Allow-Headers", "content-type")
  next();
});
app.use(`${process.env.API}/animes`, animeRoutes);

const server = app.listen(process.env.PORT, function () {
  console.log("Server is listening on", server.address().port);
});