const setSearch = function (req, query = {}) {
  let search = {};

  if (req.query && req.query.search) {
    search = {
      title: new RegExp(req.query.search, "i"),
    }
  }
  query.search = search;
  return new Promise((resolve, reject) => {
    resolve(query);
  });
}

module.exports = {
  setSearch,
};