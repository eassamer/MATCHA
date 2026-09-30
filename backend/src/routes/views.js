var express = require("express");
var views = require("@controllers/views/views.controller");
var router = express.Router();

router.post("/", views.addView);
router.get("/me", views.getMyViews);
router.get("/:userId", views.getViewsByUserId);

module.exports = router;
