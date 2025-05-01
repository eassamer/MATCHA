var express = require("express");
var images = require("@controllers/images/images.controllers");
var router = express.Router();

/**
======POST Requests======
*/

router.post("/create", images.create);
router.post("/delete", images.deleteImage);
router.post("/swap", images.swapImages);

/**
======GET Requests======
*/
router.get("/get/:userId", images.getImagesByUser);

module.exports = router;