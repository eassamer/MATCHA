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
 * @description updates a user's first name
 * @param {*} req the request object
 * @param {*} res the response object
 */
async function updateFirstName(req, res) {
  try {
    const user = await userService.updateFirstName(
      req.body.id,
      req.body.firstName
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

/**
 * @description updates a user's last name
 * @param {*} req the request object
 * @param {*} res the response object
 */
async function updateLastName(req, res) {
  try {
    const user = await userService.updateLastName(
      req.body.id,
      req.body.lastName
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

/**
 * @description updates a user's email
 * @param {*} req the request object
 * @param {*} res the response object
 */
async function updateEmail(req, res) {
  try {
    const user = await userService.updateEmail(req.body.id, req.body.email);
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

async function updateLastLocation(req, res) {
  try {
    const user = await userService.updateLastLocation(
      req.body.id,
      req.body.longitude,
      req.body.latitude
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getLocationByIP(req, res) {
  try {
    const user = await userService.getLocationByIP(req.body.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
module.exports = {
  deleteUser,
  getUser,
  getUsersByName,
  updateFirstName,
  updateLastName,
  updateEmail,
  updatePassword,
  updateLastLocation,
  getLocationByIP,
};
