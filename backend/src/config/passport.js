// src/config/passport.js
const passport = require("passport");
const localStrategy = require("../strategies/localStrategy");
const facebookStrategy = require("../strategies/facebookStrategy");
const googleStrategy = require("../strategies/googleStrategy");
const fortyTwoStrategy = require("../strategies/fortyTwoStrategy");

passport.use(localStrategy);
passport.use(facebookStrategy);
passport.use(googleStrategy);
passport.use(fortyTwoStrategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await authService.findUserById(id); // Adapt to your authService function
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
