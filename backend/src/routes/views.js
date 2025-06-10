var express = require("express");
var router = express.Router();
var views = require("@controllers/views/views.controllers");

router.post("/", views.addView);
router.get("/:userId", views.getViewsByUserId);