const mongoose = require("mongoose");

const characterSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  skills: [String],
});

module.exports = characterSchema;