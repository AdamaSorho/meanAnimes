const mongoose = require("mongoose");
const { setResponse, getResponse } = require("../utils/response");
const { getAnimeWithCharacters, isCharacterFound, addCharacter, save, getCharacterById, setCharacterFields, removeCharacter, characterValidation, remove } = require("../services/characterService");
const { exists } = require("../services/animeServices");

const Anime = mongoose.model("Anime");

const findAll = (req, res) => {
  getAnimeWithCharacters(req.params.animeId)
    .then((anime) => exists(anime))
    .then((anime) => setResponse(false, "Character list", 200, anime.characters))
    .catch((err) => setResponse(true, err.message, err.statusCode, []))
    .finally(() => res.status(getResponse().statusCode).json(getResponse()));
};

const findById = (req, res) => {
  getAnimeWithCharacters(req.params.animeId)
    .then((anime) => exists(anime))
    .then((anime) => isCharacterFound(req.params.characterId, anime))
    .then((anime) => getCharacterById(req.params.characterId, anime.characters))
    .then((character) => setResponse(false, "", 200, character))
    .catch((err) => setResponse(true, err.message, err.statusCode, null))
    .finally(() => res.status(getResponse().statusCode).json(getResponse()));
};

const create = (req, res) => {
  getAnimeWithCharacters(req.params.animeId)
    .then((anime) => exists(anime))
    .then((anime) => characterValidation(anime, req.body))
    .then((anime) => addCharacter(anime, req.body))
    .then((anime) => save(anime))
    .then((anime) => setResponse(false, "Character created successfully", 200, anime.characters))
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
    .then((anime) => setResponse(false, "Character updated successfully", 200, anime.characters))
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
    .then((anime) => setResponse(false, "Character updated successfully", 200, anime.characters))
    .catch((err) => setResponse(true, err.message, err.statusCode, []))
    .finally(() => res.status(getResponse().statusCode).json(getResponse()));
};

const destroy = (req, res) => {
  getAnimeWithCharacters(req.params.animeId)
    .then((anime) => exists(anime))
    .then((anime) => isCharacterFound(req.params.characterId, anime))
    // .then((anime) => removeCharacter(req.params.characterId, anime))
    // .then((anime) => save(anime))
    .then((anime) => remove(anime._id, req.params.characterId))
    .then((anime) => setResponse(false, "Character deleted successfully", 200, anime.characters))
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
