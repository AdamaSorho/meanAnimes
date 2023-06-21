const express = require("express");
const animeController = require("../controllers/animeController");
const characterController = require("../controllers/characterController");
const { authorization } = require("../middlewares/authorizationMiddleware");

const router = express.Router();

router.route("/")
  .get(animeController.findAll)
  .post(authorization, animeController.add);

router.route("/count")
  .get(animeController.findNumber);

router.route("/:animeId")
  .get(animeController.findById)
  .put(authorization, animeController.fullUpdate)
  .patch(authorization, animeController.partialUpdate)
  .delete(authorization, animeController.destroy);

router.route("/:animeId/characters")
  .get(characterController.findAll)
  .post(authorization, characterController.create);

router.route("/:animeId/characters/:characterId")
  .get(characterController.findById)
  .put(authorization, characterController.fullUpdate)
  .patch(authorization, characterController.partialUpdate)
  .delete(authorization, characterController.destroy);


module.exports = router;
