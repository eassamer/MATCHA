var relationService = require("@services/relations/relations.service");

/**
 * @description Retrieves the matches for the authenticated user based on their email.
 * @param {Object} req - The request object containing the user's email.
 * @param {Object} res - The response object to send back the matches.
 * @throws Responds with a 400 status code and an error message if fetching matches fails.
 */
async function getNearbyUsers(req, res) {
  try {
    const matches = await relationService.getNearbyUsers(req.user.id);
    res.status(200).json(matches);
  } catch (error) {
    res.status(error.status || 400).json({ error: error.message });
  }
}

/**
 * @description Retrieves the likes for the authenticated user based on their email.
 * @param {Object} req - The request object containing the user's email.
 * @param {Object} res - The response object to send back the likes.
 * @throws Responds with a 400 status code and an error message if fetching likes fails.
 */
async function getLikes(req, res) {
  try {
    const likes = await relationService.getLikes(req.user.id);
    res.status(200).json(likes);
  } catch (error) {
    res.status(error.status || 400).json({ error: error.message });
  }
}

/**
 * @description Adds a like from the authenticated user to another user.
 * @param {Object} req - The request object containing the user's email and the ID of the user to be liked.
 * @param {Object} res - The response object to send back the result of the like operation.
 * @throws Responds with a 400 status code and an error message if adding the like fails.
 */

async function addLike(req, res) {
  try {
    const like = await relationService.addLike(req.user.id, req.body.id);
    res.status(200).json(like);
  } catch (error) {
    res.status(error.status || 400).json({ error: error.message });
  }
}

async function getMatches(req, res) {
  try {
    const matches = await relationService.getMatches(req.user.id);
    res.status(200).json(matches);
  } catch (error) {
    res.status(error.status || 400).json({ error: error.message });
  }
}

/**
 * @description Deletes a match between the authenticated user and another user.
 * @param {Object} req - The request object containing the user's email and the ID of the user to be un-matched.
 * @param {Object} res - The response object to send back the result of the delete operation.
 * @throws Responds with a 400 status code and an error message if deleting the match fails.
 */
async function deleteMatch(req, res) {
  try {
    const match = await relationService.deleteMatch(req.user.id, req.body.id);
    res.status(200).json(match);
  } catch (error) {
    res.status(error.status || 400).json({ error: error.message });
  }
}

/**
 * @description Adds a dislike from the authenticated user to another user.
 * @param {Object} req - The request object containing the user's email and the ID of the user to be disliked.
 * @param {Object} res - The response object to send back the result of the dislike operation.
 * @throws Responds with a 400 status code and an error message if adding the dislike fails.
 */
async function addDislike(req, res) {
  try {
    const dislike = await relationService.addDislike(req.user.id, req.body.id);
    res.status(200).json(dislike);
  } catch (error) {
    res.status(error.status || 400).json({ error: error.message });
  }
}

module.exports = {
  getNearbyUsers,
  getLikes,
  addLike,
  getMatches,
  deleteMatch,
  addDislike,
};
