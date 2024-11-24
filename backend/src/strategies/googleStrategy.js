const GoogleStrategy = require("passport-google-oauth20").Strategy;
const userService = require("@services/users/users.service");

/**
 * @param {string} accessToken - The access token provided by Google.
 * @param {string} refreshToken - The refresh token provided by Google.
 * @param {object} profile - The profile information provided by Google.
 * @returns {object} The user object.
 * @throws if the user object is invalid
 */
module.exports = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    scope: ["profile", "email"],
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await userService.findOrCreateUser({
        providerId: profile.id,
        provider: 'google',
        email: profile.emails[0]?.value,
      });
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);
