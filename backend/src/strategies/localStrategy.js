const LocalStrategy = require("passport-local").Strategy;
const userService = require("../services/users/users.service"); // Service for user management
const authService = require("@services/authService");

/**
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {object} An object with the following fields: user, token.
 * @throws if the email or password is invalid
 * @throws if the user object is invalid
 */
module.exports = new LocalStrategy(
  { usernameField: "email", passwordField: "password" },
  async (email, password, done) => {
    try {
      const user = await userService.findByEmail(email);
      if (
        !user ||
        !(await authService.verifyPassword(password, user.password))
      ) {
        return done(null, false, { message: "Invalid email or password" });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);
