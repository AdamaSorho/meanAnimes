const _response = {
  error: false,
  message: "",
  statusCode: process.env.REST_API_RESOURCE_SUCCESS_CODE,
  data: [],
};

const setResponse = (error = true, message = "", statusCode = process.env.REST_API_RESOURCE_INTERNAL_ERROR_CODE, data = []) => {
  _response.error = error;
  _response.message = message;
  _response.statusCode = parseInt(statusCode);
  _response.data = data;
};

const getResponse = () => {
  return _response;
}

module.exports = {
  setResponse,
  getResponse,
};
