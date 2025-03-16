// Description: User controller for handling user requests

// TODO: add a better error handling mechanism to send the error code and message
const userService = require("@services/users/users.service");

/**
 * @description deletes a user
 * @param {*} req the request object
 * @param {*} res the response object
 */
async function deleteUser(req, res) {
  try {
    const user = await userService.remove(req.query.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

/**
 * @description finds a user by their id
 * @param {*} req the request object
 * @param {*} res the response object
 */
async function getUser(req, res) {
  try {
    const user = await userService.findById(req.query.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

/**
 * Get the current user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the current user.
 */

async function getCurrentUser(req, res) {
  try {
    const user = await userService.findByEmail(req.user.email);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

/**
 * @description finds a users by their name
 * @param {*} req the request object
 * @param {*} res the response object
 */
async function getUsersByName(req, res) {
  try {
    const users = await userService.findUsersByName(req.body);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

/**
 * @description Retrieves the geographical location of a user based on their IP address and updates their last location in the database.
 * @param {Object} req - The request object containing the user's id and IP address.
 * @param {Object} res - The response object to send back the updated user.
 * @throws Responds with a 400 status code and an error message if retrieving the location fails.
 */
async function getLocationByIP(req, res) {
  try {
    const user = await userService.getLocationByIP(req.body.id, req.body.ip);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await userService.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function update(req, res) {
  try {
    const user = await userService.update(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

/**
 * @description updates a user's password
 * @param {*} req the request object
 * @param {*} res the response object
 */
async function updatePassword(req, res) {
  try {
    const user = await userService.updatePassword(
      req.body.id,
      req.body.password
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  deleteUser,
  getUser,
  getCurrentUser,
  getUsersByName,
  getLocationByIP,
  getAllUsers,
  update,
  updatePassword,
};
