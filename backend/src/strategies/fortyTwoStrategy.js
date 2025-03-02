const FortyTwoStrategy = require("passport-42").Strategy;
const userService = require("@services/users/users.service");

/**
 * @param {string} accessToken - The access token provided by 42.
 * @param {string} refreshToken - The refresh token provided by 42.
 * @param {object} profile - The profile information provided by 42.
 * @returns {object} The user object.
 * @throws if the user object is invalid
 */
module.exports = new FortyTwoStrategy(
  {
    clientID: process.env.FORTY_TWO_CLIENT_ID,
    clientSecret: process.env.FORTY_TWO_CLIENT_SECRET,
    callbackURL: "/auth/42/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      console.log(profile);
      let user = await userService.findOrCreate({
        providerId: profile.id,
        provider: '42',
        email: profile.emails[0]?.value,
      });
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);
