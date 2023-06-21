const mongoose = require("mongoose");
const characterSchema = require("./character");

const animeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, process.env.ANIME_MODEL_TITLE_REQUIRE_MESSAGE],
  },
  releaseYear: {
    type: Number,
    required: [true, process.env.ANIME_MODEL_RELEASE_YEAR_REQUIRE_MESSAGE],
  },
  releaseCountry: String,
  characters: [characterSchema],
});

mongoose.model(process.env.ANIME_MODEL, animeSchema, process.env.ANIME_COLLECTION);