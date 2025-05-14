// Description: User controller for handling user requests

// TODO: add a better error handling mechanism to send the error code and message
const { BadRequestException, NotFoundException } = require("@lib/utils/exceptions");
const userService = require("@services/users/users.service");
const { blockService } = require("@services/blocks/blocks.service");

/**
 * @description deletes a user
 * @param {*} req the request object
 * @param {*} res the response object
 */
async function deleteUser(req, res) {
  try {
    const user = await userService.remove(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(error.status || 400).json({ error: error.message });
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
    if (await blockService.checkIfBlocked(req.user.id, req.query.id)) { //check in the controller level cause the findById method is used in other places
      throw new NotFoundException("User not found");
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(error.status || 400).json({ error: error.message });
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
    res.status(error.status || 400).json({ error: error.message });
  }
}

/**
 * @description finds a users by their name
 * @param {*} req the request object
 * @param {*} res the response object
 */
async function getUsersByName(req, res) {
  try {
    const users = await userService.findUsersByName(req.query);
    res.status(200).json(users);
  } catch (error) {
    res.status(error.status || 400).json({ error: error.message });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await userService.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(error.status || 400).json({ error: error.message });
  }
}

async function update(req, res) {
  try {
    const user = await userService.update(req.user.id, req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(error.status || 400).json({ error: error.message });
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
      req.user.id,
      req.body.password
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(error.status || 400).json({ error: error.message });
  }
}

async function updateLocation(req, res) {
  try {
    if (
      !req.body.longitude ||
      !req.body.latitude ||
      req.body.longitude === "" ||
      req.body.latitude === "" ||
      typeof req.body.longitude !== "number" ||
      typeof req.body.latitude !== "number"
    ) {
      throw new BadRequestException(
        "Longitude and latitude are required and should be numbers"
      );
    }
    const user = await userService.updateLocation(
      req.user.id,
      req.body.longitude,
      req.body.latitude
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(error.status || 400).json({ error: error.message });
  }
}

async function reportUser(req, res) {
  try {
    const user = await userService.reportUser(
      req.user.id,
      req.body.id,
      req.body.reason
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(error.status || 400).json({ error: error.message });
  }
}

module.exports = {
  deleteUser,
  getUser,
  getCurrentUser,
  getUsersByName,
  getAllUsers,
  update,
  updatePassword,
  updateLocation,
  reportUser,
};
