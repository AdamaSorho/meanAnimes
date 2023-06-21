const mongoose = require("mongoose");

const characterSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, process.env.CHARACTER_MODEL_NAME_REQUIRE_MESSAGE],
  },
  gender: {
    type: String,
    required: [true, process.env.CHARACTER_MODEL_GENDER_REQUIRE_MESSAGE],
  },
  skills: [String],
});

mongoose.model(process.env.CHARACTER_MODEL, characterSchema, process.env.CHARACTER_COLLECTION);
module.exports = characterSchema;