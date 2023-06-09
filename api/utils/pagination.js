const paginationValidation = function (offset, count) {
  console.log("paginationValidation called")
  return new Promise((resolve, reject) => {
    if (offset < 0 || count > 10 || count < 1) {
      const error = {
        statusCode: 400,
        message: "Please enter a valid query string for offset and count. offset (>0) and count (1-10)",
      };
      reject(error);
    }

    resolve();
  });
};

module.exports = paginationValidation;