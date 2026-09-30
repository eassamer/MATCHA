const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../../app");

function tokenFor(user) {
  return jwt.sign({ id: user.userId, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
}

/**
 * Returns a tiny client bound to `app`. When `user` is given every request
 * carries that user's JWT as a Bearer token.
 */
function api(user) {
  const withAuth = (req) => (user ? req.set("Authorization", `Bearer ${tokenFor(user)}`) : req);
  return {
    get: (url) => withAuth(request(app).get(url)),
    post: (url) => withAuth(request(app).post(url)),
    put: (url) => withAuth(request(app).put(url)),
    delete: (url) => withAuth(request(app).delete(url)),
  };
}

module.exports = { api, tokenFor, app };
