var userService = require("@services/users/users.service");
var relationDao = require("@dao/relations/relations");
const { getIO } = require("@lib/socketManager");

const {
  ServiceUnavailableException,
  NotFoundException,
  ForbiddenException,
} = require("@lib/utils/exceptions");

const errMessagePrefix = "RelationService: ";
/**
 * @description Finds potential matches for a given user based on geographical proximity.
 * @param {string} userEmail - The email of the user to find matches for.
 * @returns {Promise<Array>} A promise that resolves to an array of match objects.
 * @throws Will throw an error if the user does not exist or if the database query fails.
 */
async function getNearbyUsers(userId) {
  try {
    const user = await userService.findById(userId);

    const nearby = await relationDao.getNearbyUsers(
      user.userId,
      user.latitude,
      user.longitude,
      user.radiusInKm || 100,
      user.sex,
      user.orientation
    );
    return nearby;
  } catch (error) {
    console.error(`${errMessagePrefix}.getNearbyUsers: ${error.message}`);
    throw new ServiceUnavailableException(error.message);
  }
}

async function getLikes(userId) {
  try {
    const likes = await relationDao.getLikes(userId);
    return likes;
  } catch (error) {
    console.error(`${errMessagePrefix}.getLikes: ${error.message}`);
    throw new ServiceUnavailableException(error.message);
  }
}

async function checkLike(senderId, receiverId) {
  try {
    const result = await relationDao.checkLike(senderId, receiverId);
    if (result.length > 0) return true;
    return false;
  } catch (error) {
    console.error(`${errMessagePrefix}.checkLike: ${error.message}`);
    throw new ServiceUnavailableException(`${error.message}`);
  }
}

async function checkDislike(senderId, receiverId) {
  try {
    const result = await relationDao.checkDislike(senderId, receiverId);
    if (result.length > 0) return true;
    return false;
  } catch (error) {
    console.error(`${errMessagePrefix}.checkDislike: ${error.message}`);
    throw new ServiceUnavailableException(`${error.message}`);
  }
}

/**
 * @description Checks if a user has liked another user.
 * @param {number} senderId The id of the user who gave the like.
 * @param {number} receiverId The id of the user who received the like.
 * @returns {Promise<Object>} A promise that resolves to the result of the database query.
 * @throws If there is an error querying the database.
 */
async function getLikeBySenderIdAndReceiverId(senderId, receiverId) {
  try {
    const result = await relationDao.getLikeBySenderIdAndReceiverId(
      senderId,
      receiverId
    );
    return result[0];
  } catch (error) {
    console.error(`${errMessagePrefix}.checkLike: ${error.message}`);
    throw new ServiceUnavailableException(`${error.message}`);
  }
}

async function checkMatch(senderId, receiverId) {
  try {
    const result = await relationDao.checkMatch(senderId, receiverId);
    if (result.length > 0) return true;
    return false;
  } catch (error) {
    console.error(`${errMessagePrefix}.checkLike: ${error.message}`);
    throw new ServiceUnavailableException(`${error.message}`);
  }
}

/**
 * @description Adds a like from the authenticated user to another user.
 * @param {string} userId - The id of the user who is giving the like.
 * @param {number} receiverId - The id of the user who is receiving the like.
 * @returns {Promise<Object>} A promise that resolves to the result of the database query.
 * @throws Responds with a 400 status code and an error message if adding the like fails.
 */
async function addLike(userId, receiverId) {
  try {
    const io = getIO();

    const senderId = userId;
    if (senderId === receiverId) {
      throw new ForbiddenException("You cannot like yourself");
    }
    const receiver = await userService.findById(receiverId);
    const sender = await userService.findById(senderId);
    if (!receiver) {
      throw new NotFoundException(`User with Id: ${receiverId} not found`);
    }
    if (await checkLike(senderId, receiverId)) {
      console.log("You have already liked this user");
      throw new ForbiddenException("You have already liked this user");
    }
    if (await checkDislike(senderId, receiverId)) {
      await deleteDislike(senderId, receiverId);
    }
    if (await checkMatch(senderId, receiverId)) {
      throw new ForbiddenException("You have already matched with this user");
    }
    if (await checkLike(receiverId, senderId)) {
      await relationDao.addMatch(senderId, receiverId);
      await relationDao.deleteLike(receiverId, senderId);
      await userService.updateFameRating(receiverId);
      io.to(senderId).emit("match", receiverId);
      io.to(receiverId).emit("match", senderId);
      return await relationDao.getMatch(senderId, receiverId);
    } else {
      await relationDao.addLike(senderId, receiverId);
      await userService.updateFameRating(receiverId);
      io.to(receiverId).emit(
        "like",
        await getLikeBySenderIdAndReceiverId(senderId, receiverId)
      );
      return receiver;
    }
  } catch (error) {
    console.error(`${errMessagePrefix}.addLike: ${error.message}`);
    throw error;
  }
}

async function addSuperLike(userId, receiverId) {
  try {
    const senderId = userId;
    const io = getIO();
    if (senderId === receiverId) {
      throw new ForbiddenException("You cannot super like yourself");
    }
    const receiver = await userService.findById(receiverId);
    const sender = await userService.findById(senderId);
    if (!receiver) {
      throw new NotFoundException(`User with Id: ${receiverId} not found`);
    }
    if (await checkLike(senderId, receiverId)) {
      console.log("You have already liked this user");
      throw new ForbiddenException("You have already liked this user");
    }
    if (await checkDislike(senderId, receiverId)) {
      await deleteDislike(senderId, receiverId);
    }
    if (await checkMatch(senderId, receiverId)) {
      throw new ForbiddenException("You have already matched with this user");
    }
    if (await checkLike(receiverId, senderId)) {
      await relationDao.addMatch(senderId, receiverId);
      await relationDao.deleteLike(receiverId, senderId);
      io.to(senderId).emit("match", receiverId);
      io.to(receiverId).emit("match", senderId);
      return await relationDao.getMatch(senderId, receiverId);
    }
    await relationDao.addSuperLike(senderId, receiverId);
    io.to(receiverId).emit(
      "like",
      await getLikeBySenderIdAndReceiverId(senderId, receiverId)
    );

    return receiver;
  } catch (error) {
    console.error(`${errMessagePrefix}.addSuperLike: ${error.message}`);
    throw error;
  }
}

async function getMatches(userId) {
  try {
    const matches = await relationDao.getMatches(userId);
    return matches;
  } catch (error) {
    console.error(`${errMessagePrefix}.getMatches: ${error.message}`);
    throw new ServiceUnavailableException(error.message);
  }
}

/**
 * @description Deletes a match between the authenticated user and another user.
 * @param {string} senderEmail - The email of the user who is deleting the match.
 * @param {number} receiverId - The id of the user to be un-matched.
 * @returns A promise that resolves to the result of the database query.
 * @throws Responds with a 400 status code and an error message if deleting the match fails.
 */
async function deleteMatch(senderId, receiverId) {
  try {
    if (senderId === receiverId) {
      throw new ForbiddenException("You cannot delete a match with yourself");
    }
    const receiver = await userService.findById(receiverId);
    if (!receiver) {
      throw new NotFoundException(`User with Id: ${receiverId} not found`);
    }
    const match = await relationDao.getMatch(senderId, receiverId);
    if (!match || match.length === 0) {
      throw new NotFoundException("Match not found");
    }
    const result = await relationDao.deleteMatch(senderId, receiverId);
    if (result.affectedRows === 0) {
      throw new ServiceUnavailableException("could not delete match");
    }
    await userService.updateFameRating(receiverId);
    await userService.updateFameRating(senderId);
    return receiver;
  } catch (error) {
    console.error(`${errMessagePrefix}.deleteMatch: ${error.message}`);
    throw error;
  }
}

/**
 * @description Adds a dislike from the authenticated user to another user.
 * @param {string} senderEmail - The email of the user who is giving the dislike.
 * @param {number} receiverId - The id of the user who is receiving the dislike.
 * @returns A promise that resolves to the result of the database query.
 * @throws Responds with a 400 status code and an error message if adding the dislike fails.
 */
async function addDislike(senderId, receiverId) {
  try {
    if (senderId === receiverId) {
      throw new ForbiddenException("You cannot dislike yourself");
    }
    const receiver = await userService.findById(receiverId);
    if (!receiver) {
      throw new NotFoundException(`User with Id: ${receiverId} not found`);
    }
    if (await checkLike(senderId, receiverId)) {
      await relationDao.deleteLike(senderId, receiverId);
    }
    if (await checkDislike(senderId, receiverId)) {
      console.log("You have already disliked this user");
      throw new ForbiddenException("You have already disliked this user");
    }
    if (await checkMatch(senderId, receiverId)) {
      await relationDao.deleteMatch(senderId, receiverId);
    }
    const result = await relationDao.addDislike(senderId, receiverId);
    if (result.affectedRows === 0) {
      throw new ServiceUnavailableException("could not add dislike");
    }
    await userService.updateFameRating(receiverId);
    return receiver;
  } catch (error) {
    console.error(`${errMessagePrefix}.add_dislike: ${error.message}`);
    throw error;
  }
}

async function deleteDislike(senderId, receiverId) {
  try {
    const result = await relationDao.deleteDislike(senderId, receiverId);
    if (result.affectedRows === 0) {
      throw new ServiceUnavailableException("could not delete dislike");
    }
    await userService.updateFameRating(receiverId);
    return result;
  } catch (error) {
    console.error(`${errMessagePrefix}.deleteDislike: ${error.message}`);
    throw error;
  }
}

module.exports = {
  getNearbyUsers,
  getLikes,
  addLike,
  addSuperLike,
  getMatches,
  deleteMatch,
  addDislike,
};
