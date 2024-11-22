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
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ error: "Access denied, token missing!" });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Token is not valid" });
  }
};
