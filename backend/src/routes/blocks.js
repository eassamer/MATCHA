var express = require('express');
var router = express.Router();
var blocks = require('@controllers/blocks/blocks.controller');

router.get('/', blocks.getBlockedUsers);
router.post('/block', blocks.blockUser);
router.post('/unblock', blocks.unblockUser);

module.exports = router;