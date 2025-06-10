var express = require("express");
var messages = require("@controllers/messages/message.controller");
var router = express.Router();

router.post("/create", messages.createMessage);
router.get("/between", messages.getMessagesBetweenUsers);
router.post("/delete", messages.deleteMessage);

module.exports = router;