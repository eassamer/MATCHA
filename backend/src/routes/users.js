var express = require("express");
var users = require("@controllers/users/users.controllers");
var router = express.Router();

/**
======GET Requests======
*/

router.get("/user", users.getUser);

router.get("/user/me", users.getCurrentUser);

router.get("/all", users.getAllUsers);

router.get("/", users.getUsersByName);

/**
 ======POST Requests======
 */

router.post("/update", users.update);

router.post("/update/password", users.updatePassword);

router.post("/update/location", users.updateLocation);

router.post("/delete", users.deleteUser);

module.exports = router;
