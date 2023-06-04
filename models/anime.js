const mongoose = require("mongoose");
const characterSchema = require("./character");

const animeSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  releaseYear: {
    type: Number,
    required: true,
  },
  releaseCountry: String,
  characters: [characterSchema],
});

mongoose.model("Anime", animeSchema, "animes");