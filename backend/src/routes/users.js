var express = require("express");
var users = require("@controllers/users/users.controllers");
var router = express.Router();

/**
======GET Requests======
*/

router.get("/user", users.getUser);

router.get("/users", users.getUsersByName);


/**
======POST Requests======
*/

router.post("/create", users.create);

router.post("/delete", users.deleteUser);

router.post("/update/firstname", users.updateFirstName);

router.post("/update/lastname", users.updateLastName);

router.post("/update/email", users.updateEmail);

router.post("/update/password", users.updatePassword);



module.exports = router;
