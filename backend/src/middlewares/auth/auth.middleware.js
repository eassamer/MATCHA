const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey";

/**
 * Middleware to authenticate a user by verifying their JWT token from cookies.
 * If the token is missing or invalid, it responds with an appropriate error message.
 * On successful verification, it attaches the user information to the request object.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 */
module.exports = (req, res, next) => {
  const authPaths = [
    "/auth/login",
    "/auth/register",
    "/auth/facebook",
    "/auth/facebook/callback",
    "/auth/google",
    "/auth/google/callback",
    "/auth/42",
    "/auth/42/callback",
  ];
  if (authPaths.includes(req.path)) {
    return next();
  }
  const token = req.cookies.jwt
    ? req.cookies.jwt
    : req.headers.authorization.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({ error: "Access denied, token missing!" });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    console.log(verified);
    if (!verified || (!verified.id && !verified.email)) {
      return res.status(401).json({ error: "Access denied, invalid token!" });
    }
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Token is not valid" });
  }
};
