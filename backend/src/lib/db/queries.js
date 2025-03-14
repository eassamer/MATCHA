const queries = {
  USE_DB: "USE ?",
  // user queries
  ADD_NEW_USER:
    "INSERT INTO users (userId, firstName, lastName, displayName, birthDate, email, password, sex, interests, createdAt) VALUES (uuid(), ?, ?, ?, ?, ?, ?, ?, ?, ?)",
  FIND_USERS_BY_FIRSTNAME: "SELECT * FROM users WHERE firstName = ?",
  FIND_USERS_BY_LASTNAME: "SELECT * FROM users WHERE lastName = ?",
  FIND_USER_BY_ID: "SELECT * FROM users WHERE userId = ?",
  FIND_USER_BY_EMAIL: "SELECT * FROM users WHERE email = ?",
  FIND_ALL_USERS: "SELECT * FROM users",
  FIND_USERS_BY_NAME:
    "SELECT * FROM users WHERE LOWER(firstName) = LOWER(?) OR LOWER(lastName) = LOWER(?) ORDER BY firstName, lastName LIMIT ? OFFSET ?",
  UPDATE_USER_FIRSTNAME: "UPDATE users SET firstName = ? WHERE userId = ?",
  UPDATE_USER_LASTNAME: "UPDATE users SET lastName = ? WHERE userId = ?",
  UPDATE_USER_EMAIL: "UPDATE users SET email = ? WHERE userId = ?",
  UPDATE_USER_LASTLOCATION:
    "UPDATE users SET latitude = ?, longitude = ? WHERE userId = ?",
  UPDATE_USER_PASSWORD: "UPDATE users SET password = ? WHERE userId = ?",
  DELETE_USER_QUERY: `DELETE FROM users WHERE userId = ?`,
  SET_USER_INTERESTS: `UPDATE users SET interests = ? WHERE userId = ?`,
  FIND_USERS_BY_INTERESTS: `SELECT * FROM users WHERE interests = ?`,
  FIND_USERS_BY_ONE_INTEREST: `SELECT * FROM users WHERE MOD(interests >> ?, 2) = 1`,
  FIND_USERS_BY_TWO_INTERESTS: `SELECT * FROM users WHERE MOD(interests >> ?, 2) = 1 AND MOD(interests >> ?, 2) = 1`,
  FIND_USERS_BY_THREE_INTERESTS: `SELECT * FROM users WHERE MOD(interests >> ?, 2) = 1 AND MOD(interests >> ?, 2) = 1 AND MOD(interests >> ?, 2) = 1`,
  FIND_USERS_BY_FOUR_INTERESTS: `SELECT * FROM users WHERE MOD(interests >> ?, 2) = 1 AND MOD(interests >> ?, 2) = 1 AND MOD(interests >> ?, 2) = 1 AND MOD(interests >> ?, 2) = 1`,
  FIND_USERS_BY_FIVE_INTERESTS: `SELECT * FROM users WHERE
  MOD(interests >> ?, 2) = 1 AND
  MOD(interests >> ?, 2) = 1 AND
  MOD(interests >> ?, 2) = 1 AND
  MOD(interests >> ?, 2) = 1 AND
  MOD(interests >> ?, 2) = 1`,

  UPDATE_USER: `UPDATE users SET firstName = ?, lastName = ?, email = ?,password = ?, latitude = ?, longitude = ? WHERE userId = ?`,
  // oauth user queries
  ADD_OAUTH_USER: `INSERT INTO oauthUsers (userId, providerId, provider, email, createdAt) VALUES (uuid(), ?, ?, ?, ?)`,
  FIND_OAUTH_USER_BY_EMAIL: `SELECT * FROM oauthUsers WHERE email = ?`,
  DELETE_OAUTH_USER: `DELETE FROM oauthUsers WHERE email = ?`,
  // image queries
  ADD_IMAGE: `INSERT INTO images (locationUrl, ownerId, idx) VALUES (?, ?, ?)`,
  DELETE_IMAGE: `DELETE FROM images WHERE imageId = ?`,
  FIND_IMAGE_BY_OWNER_AND_IDX: `SELECT * FROM images WHERE ownerId = ? AND idx = ?`,
  FIND_IMAGES_BY_USER: `SELECT * FROM images WHERE ownerId = ? ORDER BY idx`,
  // like queries
  ADD_LIKE: `INSERT INTO likes (id, senderId, receiverId) VALUES (uuid(), ?, ?)`,
  DELETE_LIKE: `DELETE FROM likes WHERE senderId = ? AND receiverId = ?`,
  FIND_LIKES_BY_USER: `SELECT * FROM likes WHERE senderId = ?`,
  CHECK_MATCH: `SELECT * FROM likes WHERE (senderId = ? AND receiverId = ?) OR (senderId = ? AND receiverId = ?)`,
  // match queries
  ADD_MATCH: `INSERT INTO matches (id, user1Id, user2Id) VALUES (uuid(), ?, ?)`,
  DELETE_MATCH: `DELETE FROM matches WHERE user1Id = ? AND user2Id = ?`,
  FIND_MATCHES_BY_USER: `SELECT * FROM matches WHERE user1Id = ? OR user2Id = ?`,
  // message queries
  ADD_MESSAGE: `INSERT INTO messages (id, senderId, receiverId, content1) VALUES (?, ?, ?, ?)`,
  DELETE_MESSAGE: `DELETE FROM messages WHERE id = ?`,
  FIND_MESSAGES_BETWEEN_USERS: `SELECT * FROM messages WHERE (senderId = ? AND receiverId = ?) OR (senderId = ? AND receiverId = ?)`,
  // relations
  GET_NEARBY_USERS: `
  SELECT u.userId, u.firstName, u.lastName, u.displayName, u.email, u.latitude, u.longitude, u.radiusInKm,
      (6371 * ACOS(
        COS(RADIANS(?)) * COS(RADIANS(u.latitude)) *
        COS(RADIANS(u.longitude) - RADIANS(?)) +
        SIN(RADIANS(?)) * SIN(RADIANS(u.latitude))
      )) AS distance
    FROM users u
    LEFT JOIN dislikes d ON d.receiverId = u.userId AND d.senderId = ?
    LEFT JOIN likes l ON l.receiverId = u.userId AND l.senderId = ?
    LEFT JOIN matches m ON (m.user1Id = u.userId OR m.user2Id = u.userId) AND (m.user1Id = ? OR m.user2Id = ?)
    WHERE u.userId != ?
    AND u.latitude IS NOT NULL 
    AND u.longitude IS NOT NULL
    AND d.receiverId IS NULL  -- Exclude disliked users
    HAVING distance <= ?
    ORDER BY distance ASC;
`,
  GET_LIKES: `SELECT * FROM likes WHERE receiverId = ?`,
  GET_MATCHES: `SELECT * FROM matches WHERE user1Id = ? OR user2Id = ?`,
  ADD_DISLIKE: `INSERT INTO dislikes (id, senderId, receiverId) VALUES (uuid(), ?, ?)`,
};

module.exports = queries;
