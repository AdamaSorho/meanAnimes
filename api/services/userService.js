const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const util = require("util");

const User = mongoose.model(process.env.USER_MODEL);

const create = function (newUser) {
  return User.create(newUser);
}

const generateHashPassword = function (plainPassord, generatedSalt) {
  return bcrypt.hash(plainPassord, generatedSalt);
}

const generateSalt = function () {
  return bcrypt.genSalt(parseInt(process.env.JWT_PASSWORD_SALT));
}

const findByUsername = function (username) {
  return User.findOne({ username: username }).exec();
}

const exists = function (user) {
  return new Promise((resolve, reject) => {
    if (null === user) {
      const error = {
        statusCode: process.env.REST_API_RESOURCE_NOT_FOUND_CODE,
        message: process.env.REST_API_USER_FIND_ERROR_MESSAGE,
      };
      reject(error);
    } else {
      resolve(user);
    }
  });
}

const checkPassword = function (foundUser, requestPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(requestPassword, foundUser.password)
      .then((match) => {
        if (match) {
          resolve(foundUser);
        } else {
          const error = {
            statusCode: process.env.REST_API_RESOURCE_NOT_FOUND_CODE,
            message: process.env.REST_API_USER_FIND_ERROR_MESSAGE,
          }
          reject(error);
        }
      });
  });
}

const generateToken = function (name) {
  const sign = util.promisify(jwt.sign);

  return sign({ name: name }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_TOKEN_EXPIRE_TIME
  });
}

module.exports = {
  create,
  generateHashPassword,
  generateSalt,
  findByUsername,
  exists,
  checkPassword,
  generateToken,
};