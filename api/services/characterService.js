const mongoose = require("mongoose");
const { ObjectId } = require("bson");

const Anime = mongoose.model(process.env.ANIME_MODEL);
const Character = mongoose.model(process.env.CHARACTER_MODEL);

const getAnimeWithCharacters = function (animeId) {
  return Anime.findById(animeId).select(process.env.CHARACTER_COLLECTION).exec();
};

const isCharacterFound = function (characterId, anime) {
  const character = anime.characters.id(characterId);

  return new Promise((resolve, reject) => {
    if (null === character) {
      const error = {
        statusCode: process.env.REST_API_RESOURCE_NOT_FOUND_CODE,
        message: process.env.REST_API_CHARACTER_FIND_ERROR_MESSAGE,
      };
      reject(error);
    } else {
      resolve(anime);
    }
  });
};

const getCharacterById = function (characterId, characters) {
  const character = characters.id(characterId);

  return new Promise((resolve, reject) => {
    resolve(character);
  });
}

const addCharacter = function (anime, character) {
  anime.characters.push(character);
  return new Promise((resolve, reject) => {
    resolve(anime);
  });
};

const save = function (anime) {
  return anime.save();
}

// check is a full update and add fields directly otherwise add only change values
const setCharacterFields = function (anime, characterId, body, isFullUpdate) {
  const character = anime.characters.id(characterId);
  for (let key in body) {
    if (isFullUpdate) {
      anime.characters.id(characterId)[key] = body[key];
    } else if (character[key] !== body[key]) {
      anime.characters.id(characterId)[key] = body[key];
    }
  }

  return new Promise((resolve, reject) => {
    resolve(anime);
  });
};

const removeCharacter = function (characterId, anime) {
  anime.characters.id(characterId).remove();

  return new Promise((resolve, reject) => {
    resolve(anime);
  });
};

const remove = function (animeId, characterId) {
  return Anime.findByIdAndUpdate({ _id: new ObjectId(animeId) }, {
    $pull: {
      characters: {
        _id: new ObjectId(characterId),
      }
    }
  }).exec();
}

const characterValidation = function (anime, character) {
  return new Promise((resolve, reject) => {
    Character.validate(character)
      .then(() => resolve(anime))
      .catch((err) => {
        const error = {
          statusCode: process.env.REST_API_RESOURCE_NOT_FOUND_CODE,
          message: err.message,
        };
        reject(error);
      });
  });
};

module.exports = {
  getAnimeWithCharacters,
  isCharacterFound,
  addCharacter,
  save,
  setCharacterFields,
  getCharacterById,
  removeCharacter,
  characterValidation,
  remove,
};
