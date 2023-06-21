const jwt = require("jsonwebtoken");
const util = require("util");
const { setResponse, getResponse } = require("../utils/response");

const authorization = function (req, res, next) {
  _authorizationHeaderExists(req)
    .then(() => _bearerTokenExists(req.headers.authorization))
    .then((token) => _verifyToken(token, process.env.JWT_SECRET_KEY))
    .then(() => next())
    .catch((err) => {
      setResponse(true, err.message, err.statusCode, null);
      res.status(getResponse().statusCode).json(getResponse());
    });
}

const _authorizationHeaderExists = function (req) {
  return new Promise((resolve, reject) => {
    if (req.headers.authorization) {
      resolve();
    } else {
      const error = {
        statusCode: process.env.AUTHORIZATION_ERROR_STATUS_CODE,
        message: process.env.AUTHORIZATION_HEADER_NOT_FOUND,
      };
      reject(error);
    }
  });
}

const _bearerTokenExists = function (authorization) {
  const token = authorization.split(" ")[1];

  return new Promise((resolve, reject) => {
    if (token) {
      resolve(token);
    } else {
      const error = {
        statusCode: process.env.AUTHORIZATION_ERROR_STATUS_CODE,
        message: process.env.AUTHORIZATION_BEARER_TOKEN_NOT_FOUND,
      };
      reject(error);
    }
  });
}

const _verifyToken = util.promisify(jwt.verify);

module.exports = {
  authorization,
}
