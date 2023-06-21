const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  username: {
    type: String,
    required: [true, process.env.USER_MODEL_USERNAME_REQUIRE_MESSAGE],
    unique: [true, process.env.USER_MODEL_USERNAME_UNIQUE_MESSAGE],
  },
  password: {
    type: String,
    required: [true, process.env.USER_MODEL_PASSWORD_REQUIRE_MESSAGE],
  },
});

mongoose.model(process.env.USER_MODEL, userSchema, process.env.USER_COLLECTION);