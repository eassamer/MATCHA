const FacebookStrategy = require("passport-facebook").Strategy;
const authService = require("@services/auth/auth.service");

/**
 * @param {string} accessToken - The access token provided by Facebook.
 * @param {string} refreshToken - The refresh token provided by Facebook.
 * @param {object} profile - The profile information provided by Facebook.
 * @returns {object} The user object.
 * @throws if the user object is invalid
 */
module.exports = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "/auth/facebook/callback",
    profileFields: ["id", "emails", "name"],
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await authService.findOrCreateUser({
        id: profile.id,
        email: profile.emails[0]?.value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
      });
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);
