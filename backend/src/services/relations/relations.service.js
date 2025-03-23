var UserService = require("@services/users/users.service");
var relationDao = require("@dao/relations/relations");

const errMessagePrefix = "RelationService: ";
/**
 * @description Finds potential matches for a given user based on geographical proximity.
 * @param {string} userEmail - The email of the user to find matches for.
 * @returns {Promise<Array>} A promise that resolves to an array of match objects.
 * @throws Will throw an error if the user does not exist or if the database query fails.
 */
async function getNearbyUsers(userEmail) {
  try {
    const user = await UserService.findByEmail(userEmail);

    const nearby = await relationDao.getNearbyUsers(
      user.userId,
      user.latitude,
      user.longitude,
      user.radiusInKm
    );
    return nearby;
  } catch (error) {
    throw new Error(`${errMessagePrefix}.getNearbyUsers: ${error.message}`);
  }
}

async function getLikes(userId) {
  try {
    const likes = await relationDao.getLikes(userId);
    return likes;
  } catch (error) {
    throw new Error(`${errMessagePrefix}.getLikes: ${error.message}`);
  }
}

async function checkLike(senderId) {
  try {
    const result = await relationDao.getLikesBySenderId(senderId);
    if (result.length === 0) {
      return false;
    }
    return true;
  } catch (error) {
    throw new Error(`${errMessagePrefix}.checkLike: ${error.message}`);
  }
}

async function addLike(senderEmail, receiverId) {
  try {
    const user = await UserService.findByEmail(senderEmail);
    if (!user) {
      throw new Error(`User with Id: ${senderEmail} not found`);
    }
    const senderId = user.userId;
    if (senderId === receiverId) {
      throw new Error("You cannot like yourself");
    }
    if (await checkLike(senderId)) {
      throw new Error("You have already liked this user");
    }
    const result = await relationDao.addLike(senderId, receiverId);
    const match = await relationDao.checkMatch(senderId, receiverId);
    if (match.length > 1) {
      try {
        await relationDao.addMatch(senderId, receiverId);
        await relationDao.deleteLike(senderId, receiverId);
        await relationDao.deleteLike(receiverId, senderId);
      } catch (error) {
        await relationDao.deleteLike(senderId, receiverId);
        throw new Error(`${errMessagePrefix}.addMatch: ${error.message}`);
      }
    }

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

/**
 * @description Deletes a match between the authenticated user and another user.
 * @param {string} senderEmail - The email of the user who is deleting the match.
 * @param {number} receiverId - The id of the user to be un-matched.
 * @returns A promise that resolves to the result of the database query.
 * @throws Responds with a 400 status code and an error message if deleting the match fails.
 */
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

/**
 * @description Adds a dislike from the authenticated user to another user.
 * @param {string} senderEmail - The email of the user who is giving the dislike.
 * @param {number} receiverId - The id of the user who is receiving the dislike.
 * @returns A promise that resolves to the result of the database query.
 * @throws Responds with a 400 status code and an error message if adding the dislike fails.
 */
async function addDislike(senderEmail, receiverId) {
  try {
    const user = await UserService.findByEmail(senderEmail);
    if (!user) {
      throw new Error(`User with Id: ${senderEmail} not found`);
    }
    const senderId = user.userId;
    if (await checkLike(senderId)) {
      await relationDao.deleteLike(senderId, receiverId);
    }
    const result = await relationDao.addDislike(senderId, receiverId);
    return result;
  } catch (error) {
    throw new Error(`${errMessagePrefix}.add_dislike: ${error.message}`);
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
