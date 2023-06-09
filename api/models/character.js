const mongoose = require("mongoose");

const characterSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name field is required"],
  },
  gender: {
    type: String,
    required: [true, "gender field is required"],
  },
  skills: [String],
});

mongoose.model("Character", characterSchema, "characters");
module.exports = characterSchema;