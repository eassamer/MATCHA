var express = require("express");
var users = require("@controllers/users/users.controllers");
var router = express.Router();

/**
======GET Requests======
*/

router.get("/user", users.getUser);

router.get("/all", users.getAllUsers);

router.get("/", users.getUsersByName);

router.get("/matches", users.getMatches);
/**
 ======POST Requests======
 */

router.post("/delete", users.deleteUser);

router.post("/update/firstname", users.updateFirstName);

router.post("/update/lastname", users.updateLastName);

router.post("/update/email", users.updateEmail);

router.post("/update/password", users.updatePassword);

router.post("/update/lastlocation", users.updateLastLocation);

router.post("/location/ip", users.getLocationByIP);

module.exports = router;
