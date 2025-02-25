var express = require("express");
var router = express.Router();
var relations = require("@controllers/relations/relations.controllers");

/**
======GET Requests======
*/

router.get("/", relations.getNearbyUsers);

router.get("/likes", relations.getLikes);

router.get("/matches", relations.getMatches);

/**
======POST Requests======
*/

router.post("/like", relations.addLike);

router.post("/match", relations.addMatch);

/**
======DELETE Requests======
*/

router.delete("/match", relations.deleteMatch);

module.exports = router;
