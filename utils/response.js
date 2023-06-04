const _response = {
  error: false,
  message: "",
  statusCode: 200,
  data: [],
};

const setResponseAndReturn = (error = false, message = "", statusCode = 200, data = []) => {
  _response.error = error;
  _response.message = message;
  _response.statusCode = statusCode;
  _response.data = data;

  return _response;
};

module.exports = setResponseAndReturn;
