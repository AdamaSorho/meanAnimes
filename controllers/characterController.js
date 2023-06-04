const mongoose = require("mongoose");
const setResponseAndReturn = require("../utils/response");

const Anime = mongoose.model("Anime");

const findAll = (req, res) => {
  Anime.findById(req.params.animeId).select("characters").exec(function (err, anime) {
    let response = null;
    if (err) {
      response = setResponseAndReturn(true, err, 500, []);
    } else if (null === anime) {
      response = setResponseAndReturn(true, "Anime cannot be found", 404, []);
    } else {
      response = setResponseAndReturn(false, "Character list", 200, anime.characters);
    }

    res.status(response.statusCode).json(response);
  });
};

const findById = (req, res) => {
  Anime.findById(req.params.animeId).select("characters").exec(function (err, anime) {
    let response = null;
    if (err) {
      response = setResponseAndReturn(true, err, 500, null);
    } else if (null === anime) {
      response = setResponseAndReturn(true, "Anime cannot be found", 404, null);
    } else {
      const character = anime.characters.id(req.params.characterId);

      if (null === character) {
        response = setResponseAndReturn(true, "Character cannot be found", 404, null);
      } else {
        response = setResponseAndReturn(false, "", 200, character);
      }
    }

    res.status(response.statusCode).json(response);
  });
};

const add = (req, res) => {
  Anime.findById(req.params.animeId).select("characters").exec(function (err, anime) {
    let response = null;
    if (err) {
      response = setResponseAndReturn(true, err, 500, null);
    } else if (null === anime) {
      response = setResponseAndReturn(true, "Anime cannot be found", 404, null);
    } else {
      anime.characters.push(req.body);
      __addOrDelete(req, res, anime, "created");
      return;
    }

    res.status(response.statusCode).json(response);
  });
};

const update = (req, res) => {
  Anime.findById(req.params.animeId).select("characters").exec(function (err, anime) {
    let response = null;
    if (err) {
      response = setResponseAndReturn(true, err, 500, null);
    } else if (anime) {
      const character = anime.characters.id(req.params.characterId);
      if (null === character) {
        response = setResponseAndReturn(true, "Character cannot be found", 404, null);
      } else {
        anime.characters.id(req.params.characterId).name = req.body.name;
        anime.characters.id(req.params.characterId).gender = req.body.gender;
        anime.characters.id(req.params.characterId).skills = req.body.skills;
        _update(req, res, anime);
        return;
      }
    } else {
      response = setResponseAndReturn(true, "Anime cannot be found", 404, null);
    }

    res.status(response.statusCode).json(response);
  });
};

const partialUpdate = (req, res) => {
  Anime.findById(req.params.animeId).select("characters").exec(function (err, anime) {
    let response = null;

    if (err) {
      response = setResponseAndReturn(true, err, 500, null);
    } else if (null === anime) {
      response = setResponseAndReturn(true, "Anime cannot be found", 404, null);
    } else {
      const character = anime.characters.id(req.params.characterId);
      if (null === character) {
        response = setResponseAndReturn(true, "Character cannot be found", 404, null);
      } else {
        // update only the difference values
        for (let key in req.body) {
          if (character[key] !== req.body[key]) {
            anime.characters.id(req.params.characterId)[key] = req.body[key];
          }

          _update(req, res, anime);
          return;
        }
      }

    }
  })
}

const destroy = (req, res) => {
  Anime.findById(req.params.animeId).select("characters").exec(function (err, anime) {
    let response = null;
    if (err) {
      response = setResponseAndReturn(true, err, 500, null);
    } else if (null === anime) {
      response = setResponseAndReturn(true, "Character cannot be found", null);
    } else {
      const character = anime.characters.id(req.params.characterId);
      if (null === character) {
        response = setResponseAndReturn(true, "Character cannot be found", 404, null);
      } else {
        anime.characters.id(req.params.characterId).remove();
        __addOrDelete(req, res, anime, "deleted");
        return;
      }
    }

    res.status(response.statusCode).json(response);
  });
};


// private function to add or delete a character
__addOrDelete = (req, res, anime, action = "created") => {
  anime.save(function (err, anime) {
    let response = null;
    if (err) {
      response = setResponseAndReturn(true, err, 500, []);
    } else {
      response = setResponseAndReturn(false, `Characted ${action} successfully`, 201, anime.characters);
    }

    res.status(response.statusCode).json(response);
  });
}

// private function to update a character
_update = (req, res, anime) => {
  anime.save(function (err, updatedAnime) {
    let response = null;
    if (err) {
      response = setResponseAndReturn(true, err, 500, []);
    } else {
      response = setResponseAndReturn(false, "Character updated successfully", 200, updatedAnime.characters);
    }

    res.status(response.statusCode).json(response);
  });
}

module.exports = {
  findAll,
  findById,
  add,
  update,
  partialUpdate,
  destroy,
};
