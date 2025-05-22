const cookie = require("cookie");
const jwt = require("jsonwebtoken");

/**
 * Socket auth middleware
 * @description Verifies the JWT token stored in socket's handshake headers
 * @param {Object} socket - Socket.io socket object
 * @param {Function} next - Callback function to invoke if the token is valid
 * @throws {Error} If the token is missing, invalid or expired
 */
module.exports = (socket, next) => {
  try {
    const rawCookies = socket.handshake.headers.cookie;
    console.log("🔍 Raw Cookies from Socket:", socket.handshake.headers.cookie);

    if (!rawCookies) {
      return next(new Error("Access denied, no cookies sent"));
    }

    const cookies = cookie.parse(rawCookies);
    const token = cookies.jwt;
    console.log(`token=${token}`);

    if (!token) {
      return next(new Error("Access denied, token missing in cookies"));
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log(verified);
    socket.user = verified;
    next();
  } catch (err) {
    next(new Error("Access denied, token invalid or expired"));
  }
};
