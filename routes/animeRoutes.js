const express = require("express");
const animeController = require("../controllers/animeController");
const characterController = require("../controllers/characterController");

const router = express.Router();

router.route("/")
  .get(animeController.findAll)
  .post(animeController.add);

router.route("/:animeId")
  .get(animeController.findById)
  .put(animeController.update)
  .patch(animeController.partialUpdate)
  .delete(animeController.destroy);

router.route("/:animeId/characters")
  .get(characterController.findAll)
  .post(characterController.add);

router.route("/:animeId/characters/:characterId")
  .get(characterController.findById)
  .put(characterController.update)
  .patch(characterController.partialUpdate)
  .delete(characterController.destroy);

module.exports = router;
