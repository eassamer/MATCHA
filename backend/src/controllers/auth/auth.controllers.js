const authService = require("@services/auth/auth.service");

register = async (req, res) => {
  try {
    const { newUser, token } = await authService.registerUser(req.body);
    res.cookie("jwt", token, { httpOnly: true });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

login = async (req, res) => {
  try {
    const { user, token } = await authService.authenticateUser(
      req.body.email,
      req.body.password
    );
    res.cookie("jwt", token, { httpOnly: true });
    delete user.password;
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

oauthCallback = (req, res) => {
  // Set JWT token on successful OAuth authentication
  const token = authService.generateToken(req.user);
  res.cookie("jwt", token, { httpOnly: true });
  res.redirect("/"); // TODO: Redirect to the frontend URL
};

module.exports = {
  register,
  login,
  oauthCallback,
};
