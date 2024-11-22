const express = require("express");
const passport = require("../middleware/auth/passport.middleware");
const authController = require("@controllers/auth/auth.controllers");
const router = express.Router();

/**
======GET Requests======
*/

router.get("/facebook", passport.authenticate("facebook"));
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  authController.oauthCallback
);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  authController.oauthCallback
);
router.get("/42", passport.authenticate("42"));
router.get(
  "/42/callback",
  passport.authenticate("42", { session: false, failureRedirect: '/' }),
  authController.oauthCallback
);

/**
======POST Requests======
*/
router.post("/register", authController.register);
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  authController.login
);

module.exports = router;
