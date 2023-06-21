const paginationValidation = function (req) {
  let offset = parseInt(process.env.DEFAULT_FIND_OFFSET);
  let count = parseInt(process.env.DEFAULT_FIND_COUNT);

  if (req.query && req.query.offset && req.query.count) {
    offset = req.query.offset;
    count = req.query.count;
  }

  return new Promise((resolve, reject) => {
    if (offset < 0 || count > parseInt(process.env.DEFAULT_MAX_FIND_LIMIT) || count < 1) {
      const error = {
        statusCode: 400,
        message: process.env.PAGINATION_ERROR_MESSAGE,
      };
      reject(error);
    }
    const query = {
      offset: offset,
      count: count,
    };
    resolve(query);
  });
};

module.exports = paginationValidation;