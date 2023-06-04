const mongoose = require("mongoose");
const setResponseAndReturn = require("../utils/response");
const { ObjectId } = require("bson");

const Anime = mongoose.model("Anime");

const findAll = (req, res) => {
  let offset = 0;
  let count = 5;
  if (req.query && req.query.offset && req.query.count) {
    offset = req.query.offset;
    count = req.query.count;
  }
  if (offset < 0 || count > 10 || count < 1) {
    const response = setResponseAndReturn(true,
      "Please enter a valid query string for offset and count. offset (>0) and count (1-10)",
      400, []);

    res.status(statusCode).json(response);
    return;
  }
  Anime.find().skip(offset).limit(count).exec(function (err, animes) {
    let response = null;
    if (err) {
      response = setResponseAndReturn(true, err, 500, []);
    } else {
      response = setResponseAndReturn(false, "List of animes", 200, animes);
    }

    res.status(response.statusCode).json(response);
  });
};

const findById = (req, res) => {
  Anime.findById(req.params.animeId).exec(function (err, anime) {
    let response = null;
    if (err) {
      response = setResponseAndReturn(true, err, 500, []);
    } else if (null === anime) {
      response = setResponseAndReturn(true, "Anime cannot be found", 404, null);
    } else {
      response = setResponseAndReturn(false, "", 200, anime);
    }

    res.status(response.statusCode).json(response);
  });
};

const destroy = (req, res) => {
  Anime.findByIdAndDelete(req.params.animeId).exec(function (err, animeDeleted) {
    let response = null;
    if (err) {
      response = setResponseAndReturn(true, err, 500, null);
    }
    else if (null === animeDeleted) {
      response = setResponseAndReturn(true, "Anime cannot be found", 404, null);
    } else {
      response = setResponseAndReturn(false, "Anime deleted successfully", 200, animeDeleted);
    }

    res.status(response.statusCode).json(response);
  });
};

const add = (req, res) => {
  Anime.create(req.body, function (err, anime) {
    let response = null;
    if (err) {
      response = setResponseAndReturn(true, err, 500, null);
    } else {
      response = setResponseAndReturn(false, "Anime created successfully", 201, anime);
    }

    res.status(response.statusCode).json(response);
  });
};

const update = (req, res) => {
  Anime.updateOne({ _id: new ObjectId(req.params.animeId) }, req.body, function (err, acknowledgedResponse) {
    let response = null;
    if (err) {
      response = setResponseAndReturn(true, err, 500, null);
    } else if (acknowledgedResponse.matchedCount === 0) {
      response = setResponseAndReturn(true, "Anime cannot be found", 404, null);
    }
    else {
      response = setResponseAndReturn(false, "Anime updated successfully", 200, acknowledgedResponse);
    }

    res.status(response.statusCode).json(response);
  });
};

const partialUpdate = (req, res) => {
  Anime.findById(req.params.animeId).exec(function (err, anime) {
    let response = null;
    if (err) {
      response = setResponseAndReturn(true, err, 500, null);
    } else if (null === anime) {
      response = setResponseAndReturn(true, "Anime cannot be found", 404, null);
    } else {
      console.log("set differences");
      // set the difference values
      for (let key in req.body) {
        if (anime[key] !== req.body[key]) {
          anime[key] = req.body[key];
        }
      }

      _update(req, res, anime);
      return;
    }

    res.status(response.statusCode).json(response);
  });
};

const _update = (req, res, anime) => {
  anime.save(function (err, anime) {
    let response = null;
    if (err) {
      response = setResponseAndReturn(true, err, 500, null);
    } else {
      response = setResponseAndReturn(false, "Anime updated successfully", 200, anime);
    }

    res.status(response.statusCode).json(response);
  });
};

module.exports = {
  findAll,
  findById,
  destroy,
  add,
  update,
  partialUpdate,
};
