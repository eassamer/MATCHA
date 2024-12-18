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

FourtyTwoAuthenticate = (req, res) => {
  const authUrl = authService.FourtyTwoAuthenticate();
  res.status(200).json({authUrl});
}

oauthCallback = (req, res) => {
  // Set JWT token on successful OAuth authentication
  const token = authService.generateToken(req.user);
  res.cookie("jwt", token, { httpOnly: true });
  res.redirect(process.env.FRONTEND_PUBLIC_URL); // TODO: Redirect to the frontend URL
};

module.exports = {
  register,
  login,
  oauthCallback,
  FourtyTwoAuthenticate,
};
