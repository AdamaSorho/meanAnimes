const mongoose = require("mongoose");
const characterSchema = require("./character");

const animeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title field is required"],
  },
  releaseYear: {
    type: Number,
    required: [true, "releaseYear field is required"],
  },
  releaseCountry: String,
  characters: [characterSchema],
});

mongoose.model("Anime", animeSchema, "animes");