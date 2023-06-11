const paginationValidation = require("../utils/pagination");
const { setResponse, getResponse } = require("../utils/response");
const { getAll, getById, exists, getByIdAndDelete, save, validation, updateOne, isUpdated, setAnimeFields, getNumber } = require("../services/animeServices");


const findAll = (req, res) => {
  let offset = 0;
  let count = 5;
  if (req.query && req.query.offset && req.query.count) {
    offset = req.query.offset;
    count = req.query.count;
  }

  paginationValidation(offset, count)
    .then(() => getAll(offset, count))
    .then((animes) => setResponse(false, "List of animes", 200, animes))
    .catch((err) => setResponse(true, err.message, err.statusCode, []))
    .finally(() => res.status(getResponse().statusCode).json(getResponse()));
};

const findById = (req, res) => {
  getById(req.params.animeId)
    .then((anime) => exists(anime))
    .then((anime) => setResponse(false, "", 200, anime))
    .catch((err) => setResponse(true, err.message, err.statusCode, null))
    .finally(() => res.status(getResponse().statusCode).json(getResponse()));
};

const destroy = (req, res) => {
  getByIdAndDelete(req.params.animeId)
    .then((animeDeleted) => exists(animeDeleted))
    .then((animeDeleted) => setResponse(false, "Anime deleted successfully", 200, animeDeleted))
    .catch((err) => setResponse(true, err.message, err.statusCode, null))
    .finally(() => res.status(getResponse().statusCode).json(getResponse()));
};

const add = (req, res) => {
  const newAnime = {
    title: req.body.title,
    releaseYear: req.body.releaseYear,
    releaseCountry: req.body.releaseCountry,
    characters: req.body.characters,
  };
  validation(newAnime)
    .then((validatedAnime) => save(validatedAnime))
    .then((savedAnime) => setResponse(false, "Anime created successfully", 201, savedAnime))
    .catch((err) => setResponse(true, err.message, err.statusCode, null))
    .finally(() => res.status(getResponse().statusCode).json(getResponse()));
};

const fullUpdate = (req, res) => {
  validation(req.body)
    .then((validatedAnime) => updateOne(req.params.animeId, validatedAnime))
    .then((acknowledgementResponse) => isUpdated(acknowledgementResponse))
    .then((acknowledgementResponse) => setResponse(false, "Anime updated successfully", 200, acknowledgementResponse))
    .catch((err) => setResponse(true, err.message, err.statusCode, null))
    .finally(() => res.status(getResponse().statusCode).json(getResponse()));
};

const partialUpdate = (req, res) => {
  getById(req.params.animeId)
    .then((anime) => exists(anime))
    .then((anime) => setAnimeFields(anime, req.body))
    .then((anime) => updateOne(req.params.animeId, anime))
    .then((acknowledgementResponse) => setResponse(false, "Anime updated successfully", 200, acknowledgementResponse))
    .catch((err) => setResponse(true, err.message, err.statusCode, null))
    .finally(() => res.status(getResponse().statusCode).json(getResponse()));
};

const findNumber = (req, res) => {
  getNumber()
    .then((number) => setResponse(false, "Number of animes", 200, number))
    .catch((err) => setResponse(true, err.message, err.statusCode, null))
    .finally(() => res.status(getResponse().statusCode).json(getResponse()));
}


module.exports = {
  findAll,
  findById,
  destroy,
  add,
  fullUpdate,
  partialUpdate,
  findNumber,
};
