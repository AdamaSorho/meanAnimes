const mongoose = require("mongoose");
const { ObjectId } = require("bson");

const Anime = mongoose.model("Anime");

const getAll = function (offset, count) {
  return Anime.find().skip(offset).limit(count).exec();
}

const getById = function (animeId) {
  return Anime.findById(animeId).exec();
}

const exists = function (anime) {
  return new Promise((resolve, reject) => {
    if (null === anime) {
      const error = {
        statusCode: 404,
        message: "Anime cannot be found"
      };
      reject(error);
    } else {
      resolve(anime);
    }
  });
};

const getByIdAndDelete = function (animeId) {
  return Anime.findByIdAndDelete(animeId).exec();
}

const save = function (newAnime) {
  return Anime.create(newAnime);
}

const validation = function (newAnime) {
  return new Promise((resolve, reject) => {
    Anime.validate(newAnime)
      .then(() => resolve(newAnime))
      .catch((err) => reject(err));
  });
}

const updateOne = function (animeId, anime) {
  return Anime.updateOne({ _id: new ObjectId(animeId) }, anime).exec();
};

const isUpdated = function (acknowledgementResponse) {
  return new Promise((resolve, reject) => {
    if (acknowledgementResponse.matchedCount === 0) {
      const error = {
        statusCode: 404,
        message: "Anime cannot be found"
      };
      reject(error);
    }

    resolve(acknowledgementResponse);
  });
};

const setAnimeFields = function (anime, body) {
  for (let key in body) {
    if (anime[key] !== body[key]) {
      anime[key] = body[key];
    }
  }

  return new Promise((resolve, reject) => {
    resolve(anime);
  });
};

module.exports = {
  getAll,
  getById,
  exists,
  getByIdAndDelete,
  save,
  validation,
  updateOne,
  isUpdated,
  setAnimeFields,
}