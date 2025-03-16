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

router.post("/delete", users.deleteUser);

router.post("/location/ip", users.getLocationByIP);

module.exports = router;
