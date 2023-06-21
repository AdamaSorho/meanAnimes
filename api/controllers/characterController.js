const { setResponse, getResponse } = require("../utils/response");
const { getAnimeWithCharacters, isCharacterFound, addCharacter, save, getCharacterById, setCharacterFields, characterValidation, remove } = require("../services/characterService");
const { exists } = require("../services/animeServices");


const findAll = (req, res) => {
  getAnimeWithCharacters(req.params.animeId)
    .then((anime) => exists(anime))
    .then((anime) => setResponse(false, process.env.REST_API_CHARACTER_FIND_MESSAGE, process.env.REST_API_RESOURCE_SUCCESS_CODE, anime.characters))
    .catch((err) => setResponse(true, err.message, err.statusCode, []))
    .finally(() => res.status(getResponse().statusCode).json(getResponse()));
};



const findById = (req, res) => {
  getAnimeWithCharacters(req.params.animeId)
    .then((anime) => exists(anime))
    .then((anime) => isCharacterFound(req.params.characterId, anime))
    .then((anime) => getCharacterById(req.params.characterId, anime.characters))
    .then((character) => setResponse(false, "", process.env.REST_API_RESOURCE_SUCCESS_CODE, character))
    .catch((err) => setResponse(true, err.message, err.statusCode, null))
    .finally(() => res.status(getResponse().statusCode).json(getResponse()));
};

const create = (req, res) => {
  getAnimeWithCharacters(req.params.animeId)
    .then((anime) => exists(anime))
    .then((anime) => characterValidation(anime, req.body))
    .then((anime) => addCharacter(anime, req.body))
    .then((anime) => save(anime))
    .then((anime) => setResponse(false, process.env.REST_API_CHARACTER_CREATE_MESSAGE, process.env.REST_API_RESOURCE_SUCCESS_CODE, anime.characters))
    .catch((err) => setResponse(true, err.message, err.statusCode, []))
    .finally(() => res.status(getResponse().statusCode).json(getResponse()));
};

const fullUpdate = (req, res) => {
  const isFullUpdate = true;

  getAnimeWithCharacters(req.params.animeId)
    .then((anime) => exists(anime))
    .then((anime) => characterValidation(anime, req.body))
    .then((anime) => isCharacterFound(req.params.characterId, anime))
    .then((anime) => setCharacterFields(anime, req.params.characterId, req.body, isFullUpdate))
    .then((anime) => save(anime))
    .then((anime) => setResponse(false, process.env.REST_API_CHARACTER_UPDATE_MESSAGE, process.env.REST_API_RESOURCE_SUCCESS_CODE, anime.characters))
    .catch((err) => setResponse(true, err.message, err.statusCode, []))
    .finally(() => res.status(getResponse().statusCode).json(getResponse()));
};

const partialUpdate = (req, res) => {
  const isFullUpdate = false;

  getAnimeWithCharacters(req.params.animeId)
    .then((anime) => exists(anime))
    .then((anime) => isCharacterFound(req.params.characterId, anime))
    .then((anime) => setCharacterFields(anime, req.params.characterId, req.body, isFullUpdate))
    .then((anime) => save(anime))
    .then((anime) => setResponse(false, process.env.REST_API_CHARACTER_UPDATE_MESSAGE, process.env.REST_API_RESOURCE_SUCCESS_CODE, anime.characters))
    .catch((err) => setResponse(true, err.message, err.statusCode, []))
    .finally(() => res.status(getResponse().statusCode).json(getResponse()));
};

const destroy = (req, res) => {
  getAnimeWithCharacters(req.params.animeId)
    .then((anime) => exists(anime))
    .then((anime) => isCharacterFound(req.params.characterId, anime))
    .then((anime) => remove(anime._id, req.params.characterId))
    .then((anime) => setResponse(false, process.env.REST_API_CHARACTER_DELETE_MESSAGE, process.env.REST_API_RESOURCE_SUCCESS_CODE, anime.characters))
    .catch((err) => setResponse(true, err.message, err.statusCode, []))
    .finally(() => res.status(getResponse().statusCode).json(getResponse()));
};

module.exports = {
  findAll,
  findById,
  create,
  fullUpdate,
  partialUpdate,
  destroy,
};
