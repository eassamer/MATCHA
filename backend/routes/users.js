var express = require('express');
var router = express.Router();
var users = require('../src/repository/users/users');

/* GET users listing. */
router.get('/', users.getUsers);

router.post('/', users.addUser);

module.exports = router;
