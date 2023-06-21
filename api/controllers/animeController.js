const paginationValidation = require("../utils/pagination");
const { setResponse, getResponse } = require("../utils/response");
const { getAll, getById, exists, getByIdAndDelete, save, validation, updateOne, isUpdated, setAnimeFields, getNumber } = require("../services/animeServices");
const { setSearch } = require("../utils/search");


const findAll = (req, res) => {
  paginationValidation(req)
    .then((query) => setSearch(req, query))
    .then((query) => getAll(query.offset, query.count, query.search))
    .then((animes) => setResponse(false, process.env.REST_API_ANIME_FIND_MESSAGE, 200, animes))
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
    .then((animeDeleted) => setResponse(false, process.env.REST_API_ANIME_DELETE_MESSAGE, 200, animeDeleted))
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
    .then((savedAnime) => setResponse(false, process.env.REST_API_ANIME_CREATE_MESSAGE, 201, savedAnime))
    .catch((err) => setResponse(true, err.message, err.statusCode, null))
    .finally(() => res.status(getResponse().statusCode).json(getResponse()));
};

const fullUpdate = (req, res) => {
  validation(req.body)
    .then((validatedAnime) => updateOne(req.params.animeId, validatedAnime))
    .then((acknowledgementResponse) => isUpdated(acknowledgementResponse))
    .then((acknowledgementResponse) => setResponse(false, process.env.REST_API_ANIME_UPDATE_MESSAGE, 200, acknowledgementResponse))
    .catch((err) => setResponse(true, err.message, err.statusCode, null))
    .finally(() => res.status(getResponse().statusCode).json(getResponse()));
};

const partialUpdate = (req, res) => {
  getById(req.params.animeId)
    .then((anime) => exists(anime))
    .then((anime) => setAnimeFields(anime, req.body))
    .then((anime) => updateOne(req.params.animeId, anime))
    .then((acknowledgementResponse) => setResponse(false, process.env.REST_API_ANIME_UPDATE_MESSAGE, 200, acknowledgementResponse))
    .catch((err) => setResponse(true, err.message, err.statusCode, null))
    .finally(() => res.status(getResponse().statusCode).json(getResponse()));
};

const findNumber = (req, res) => {
  setSearch(req)
    .then((query) => getNumber(query.search))
    .then((number) => setResponse(false, process.env.REST_API_ANIME_COUNT_MESSAGE, 200, number))
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
