const express = require("express");

const animeRoutes = require("./animeRoutes");
const userRoutes = require("./userRoutes");

const router = express.Router();

router.use("/animes", animeRoutes);
router.use("/users", userRoutes);

module.exports = router;