const queries = require("@lib/db/queries");
const client = require("@lib/db/dbconnect");
const errMessagePrefix = "RelationDao: "; //for better debugging

/**
 * @description Retrieves a list of users within the given radius from the user's location
 * @param {number} userId - The id of the user whose nearby users are being retrieved
 * @param {number} userLat - The latitude of the user's current location
 * @param {number} userLon - The longitude of the user's current location
 * @param {number} radiusInKm - The radius in kilometers
 * @returns {Promise<Array>} A promise that resolves to an array of user objects
 * @throws Will throw an error if the database query fails or if the user location is not found
 */
async function getNearbyUsers(userId, userLat, userLon, radiusInKm) {
  try {
    if (!userLat || !userLon) {
      throw new Error("User location not found");
    }

    const queryInput = [
      userLat,
      userLon,
      userLat,
      userId,
      userId,
      userId,
      userId,
      userId,
      radiusInKm,
    ];
    return new Promise(async (resolve, reject) => {
      const db = await client;
      db.execute(queries.GET_NEARBY_USERS, queryInput, (err, result) => {
        if (err) {
          err.message = `Error in getNearbyUsers DAO: ${err.message}`;
          return reject(err);
        }
        resolve(result);
      });
    });
  } catch (err) {
    err.message = `Error in getNearbyUsers DAO: ${err.message}`;
    throw err;
  }
}

/**
 * @description Retrieves a list of users who have liked the user with the given userId
 * @param {number} userId The id of the user whose likes are being retrieved
 * @returns A list of users who have liked the user
 * @throws If there is an error querying the database
 */
async function getLikes(userId) {
  try {
    const queryInput = [userId];
    return new Promise(async (resolve, reject) => {
      (await client).execute(queries.GET_LIKES, queryInput, (err, result) => {
        if (err) {
          err.message = `${errMessagePrefix}.getLikes: ${err.message}`;
          return reject(err);
        }
        resolve(result);
      });
    });
  } catch (err) {
    err.message = `Error in getLikes DAO: ${err.message}`;
    throw err;
  }
}

/**
 * @description Records a like from the user with the given senderId to the user with the given receiverId
 * @param {number} senderId The id of the user who is giving the like
 * @param {number} receiverId The id of the user who is receiving the like
 * @returns The result of the database query
 * @throws If there is an error querying the database
 */
async function addLike(senderId, receiverId) {
  try {
    const queryInput = [senderId, receiverId];
    return new Promise(async (resolve, reject) => {
      (await client).execute(queries.ADD_LIKE, queryInput, (err, result) => {
        if (err) {
          err.message = `${errMessagePrefix}.addLike: ${err.message}`;
          return reject(err);
        }
        resolve(result);
      });
    });
  } catch (err) {
    err.message = `Error in addLike DAO: ${err.message}`;
    throw err;
  }
}


async function deleteLike(senderId, receiverId) {
  try {
    const queryInput = [senderId, receiverId];
    return new Promise(async (resolve, reject) => {
      (await client).execute(queries.DELETE_LIKE, queryInput, (err, result) => {
        if (err) {
          err.message = `${errMessagePrefix}.removeLike: ${err.message}`;
          return reject(err);
        }
        resolve(result);
      });
    });
  } catch (err) {
    err.message = `Error in removeLike DAO: ${err.message}`;
    throw err;
  }
}

/**
 * @description Retrieves all matches for a given user
 * @param {number} userId The id of the user whose matches are being retrieved
 * @returns {Promise<Array>} A promise that resolves to an array of match objects
 * @throws If there is an error querying the database
 */
async function getMatches(userId) {
  try {
    const queryInput = [userId];
    return new Promise(async (resolve, reject) => {
      (await client).execute(queries.GET_MATCHES, queryInput, (err, result) => {
        if (err) {
          err.message = `${errMessagePrefix}.getMatches: ${err.message}`;
          return reject(err);
        }
        resolve(result);
      });
    });
  } catch (err) {
    err.message = `Error in getMatches DAO: ${err.message}`;
    throw err;
  }
}

/**
 * @description Deletes a match between two users.
 * @param {number} senderId The id of one of the users in the match.
 * @param {number} receiverId The id of the other user in the match.
 * @returns A promise that resolves with the result of the database query.
 * @throws If there is an error executing the query
 */
async function deleteMatch(senderId, receiverId) {
  try {
    const queryInput = [senderId, receiverId];
    return new Promise(async (resolve, reject) => {
      (await client).execute(
        queries.DELETE_MATCH,
        queryInput,
        (err, result) => {
          if (err) {
            err.message = `${errMessagePrefix}.deleteMatch: ${err.message}`;
            return reject(err);
          }
          resolve(result);
        }
      );
    });
  } catch (err) {
    err.message = `Error in deleteMatch DAO: ${err.message}`;
    throw err;
  }
}

/**
 * @description Checks if there is a match between two users.
 * @param {number} senderId - The id of one of the users.
 * @param {number} receiverId - The id of the other user.
 * @returns {Promise<Array>} A promise that resolves to the result of the match check query.
 * @throws If there is an error executing the query.
 */

async function checkMatch(senderId, receiverId) {
  try {
    const queryInput = [senderId, receiverId, receiverId, senderId];
    return new Promise(async (resolve, reject) => {
      (await client).execute(queries.CHECK_MATCH, queryInput, (err, result) => {
        if (err) {
          err.message = `${errMessagePrefix}.checkMatch: ${err.message}`;
          return reject(err);
        }
        resolve(result);
      });
    });
  } catch (err) {
    err.message = `Error in checkMatch DAO: ${err.message}`;
    throw err;
  }
}

/**
 * @description Adds a match between two users.
 * @param {number} senderId - The id of one of the users in the match.
 * @param {number} receiverId - The id of the other user in the match.
 * @returns {Promise<Object>} A promise that resolves with the result of the database query.
 * @throws If there is an error executing the query.
 */

async function addMatch(senderId, receiverId) {
  try {
    const queryInput = [senderId, receiverId];
    return new Promise(async (resolve, reject) => {
      (await client).execute(queries.ADD_MATCH, queryInput, (err, result) => {
        if (err) {
          err.message = `${errMessagePrefix}.addMatch: ${err.message}`;
          return reject(err);
        }
        resolve(result);
      });
    });
  } catch (err) {
    err.message = `Error in addMatch DAO: ${err.message}`;
    throw err;
  }
}

/**
 * @description Records a dislike from the user with the given senderId to the user with the given receiverId
 * @param {number} senderId The id of the user who is giving the dislike
 * @param {number} receiverId The id of the user who is receiving the dislike
 * @returns The result of the database query
 * @throws If there is an error querying the database
 */
async function addDislike(senderId, receiverId) {
  try {
    const queryInput = [senderId, receiverId];
    return new Promise(async (resolve, reject) => {
      (await client).execute(queries.ADD_DISLIKE, queryInput, (err, result) => {
        if (err) {
          err.message = `${errMessagePrefix}.add_dislike: ${err.message}`;
          return reject(err);
        }
        resolve(result);
      });
    });
  } catch (err) {
    err.message = `Error in add_dislike DAO: ${err.message}`;
    throw err;
  }
}

async function getLikesBySenderId(senderId) {
  try {
    const queryInput = [senderId];
    return new Promise(async (resolve, reject) => {
      (await client).execute(
        queries.GET_LIKES_BY_SENDER_ID,
        queryInput,
        (err, result) => {
          if (err) {
            err.message = `${errMessagePrefix}.getLikesBySenderId: ${err.message}`;
            return reject(err);
          }
          resolve(result);
        }
      );
    });
  } catch (err) {
    err.message = `Error in getLikesBySenderId DAO: ${err.message}`;
    throw err;
  }
}

module.exports = {
  getNearbyUsers,
  getLikes,
  addLike,
  deleteLike,
  getMatches,
  deleteMatch,
  addMatch,
  checkMatch,
  addDislike,
  getLikesBySenderId,
};
