var UserService = require("@services/users/users.service");
var relationDao = require("@dao/relations/relations");
/**
 * @description Finds potential matches for a given user based on geographical proximity.
 * @param {string} userEmail - The email of the user to find matches for.
 * @returns {Promise<Array>} A promise that resolves to an array of match objects.
 * @throws Will throw an error if the user does not exist or if the database query fails.
 */
async function getNearbyUsers(userEmail) {
  try {
    const user = await UserService.findByEmail(userEmail);
    console.log(user);
    if (!user) {
      throw new Error(`User with Id: ${userEmail} not found`);
    }
    const matches = await relationDao.getNearbyUsers(
      user.userId,
      user.latitude,
      user.longitude
    );
    return matches;
  } catch (error) {
    throw new Error(`${errMessagePrefix}.getNearbyUsers: ${error.message}`);
  }
}

async function getLikes(userEmail) {
  try {
    const user = await UserService.findByEmail(userEmail);
    if (!user) {
      throw new Error(`User with Id: ${userEmail} not found`);
    }
    const likes = await relationDao.getLikes(user.userId);
    return likes;
  } catch (error) {
    throw new Error(`${errMessagePrefix}.getLikes: ${error.message}`);
  }
}

async function addLike(senderEmail, receiverId) {
  try {
    const user = await UserService.findByEmail(senderEmail);
    if (!user) {
      throw new Error(`User with Id: ${senderEmail} not found`);
    }
    const senderId = user.userId;
    const result = await relationDao.addLike(senderId, receiverId);
    return result;
  } catch (error) {
    throw new Error(`${errMessagePrefix}.addLike: ${error.message}`);
  }
}

async function getMatches(userEmail) {
  try {
    const user = await UserService.findByEmail(userEmail);
    if (!user) {
      throw new Error(`User with Id: ${userEmail} not found`);
    }
    const matches = await relationDao.getMatches(user.userId);
    return matches;
  } catch (error) {
    throw new Error(`${errMessagePrefix}.getMatches: ${error.message}`);
  }
}

async function deleteMatch(senderEmail, receiverId) {
  try {
    const user = await UserService.findByEmail(senderEmail);
    if (!user) {
      throw new Error(`User with Id: ${senderEmail} not found`);
    }
    const senderId = user.userId;
    const result = await relationDao.deleteMatch(senderId, receiverId);
    return result;
  } catch (error) {
    throw new Error(`${errMessagePrefix}.deleteMatch: ${error.message}`);
  }
}

async function addMatch(senderEmail, receiverId) {
  try {
    const user = await UserService.findByEmail(senderEmail);
    if (!user) {
      throw new Error(`User with Id: ${senderEmail} not found`);
    }
    const senderId = user.userId;
    const result = await relationDao.addMatch(senderId, receiverId);
    return result;
  } catch (error) {
    throw new Error(`${errMessagePrefix}.addMatch: ${error.message}`);
  }
}

module.exports = {
  getNearbyUsers,
  getLikes,
  addLike,
  getMatches,
  deleteMatch,
  addMatch,
};
