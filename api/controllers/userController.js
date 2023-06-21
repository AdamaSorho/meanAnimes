const { generateSalt, generateHashPassword, create, findByUsername, exists, checkPassword, generateToken } = require("../services/userService")
const { setResponse, getResponse } = require("../utils/response")

const register = function (req, res) {
  // console.log("req.body", req.body);
  generateSalt()
    .then((salt) => generateHashPassword(req.body.password, salt))
    .then((hashPassword) => create({ name: req.body.name, username: req.body.username, password: hashPassword }))
    .then((createdUser) => setResponse(false, process.env.REST_API_USER_CREATE_MESSAGE, 201, createdUser))
    .catch((err) => setResponse(true, err.message, err.statusCode, null))
    .finally(() => res.status(getResponse().statusCode).json(getResponse()));
}

const login = function (req, res) {
  console.log("body", req.body);
  findByUsername(req.body.username)
    .then((user) => exists(user))
    .then((user) => checkPassword(user, req.body.password))
    .then((user) => generateToken(user.name))
    .then((token) => setResponse(false, process.env.REST_API_USER_LOGIN_MESSAGE, 200, { token: token }))
    .catch((err) => setResponse(true, err.message, err.statusCode, null))
    .finally(() => res.status(getResponse().statusCode).json(getResponse()));
}

module.exports = {
  register,
  login,
};