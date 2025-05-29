const userFields =
  "users.userId, users.firstName, users.lastName, users.displayName,\
users.birthDate, users.email, users.createdAt, users.longitude, users.latitude, users.radiusInKm,\
users.interests, users.sex, users.orientation, users.bio, users.emailVerified, users.fameRating";

const userFieldsWithImages = `${userFields}, (
  SELECT JSON_ARRAYAGG(locationUrl)
  FROM images i 
  WHERE i.ownerId = users.userId 
  ORDER BY i.idx
) AS userImages`;

const joinLikes = `(
  SELECT JSON_ARRAYAGG(
    JSON_OBJECT(
      'userId', lu.userId,
      'firstName', lu.firstName,
      'lastName', lu.lastName,
      'displayName', lu.displayName,
      'bio', lu.bio,
      'interests', lu.interests,
      'birthdate', lu.birthDate,
      'longitude', lu.longitude,
      'latitude', lu.latitude,
      'sex', lu.sex,
      'orientation', lu.orientation,
      'likeId', l.id,
      'userImages', (
        SELECT JSON_ARRAYAGG(locationUrl)
        FROM images lui
        WHERE lui.ownerId = lu.userId
        ORDER BY lui.idx
      )
    )
  )
  FROM likes l
  JOIN users lu ON (lu.userId = CASE WHEN l.senderId = users.userId THEN l.receiverId ELSE l.senderId END)
  WHERE l.senderId = users.userId
) AS likes`;

const joinLikedBy = `(
  SELECT JSON_ARRAYAGG(
    JSON_OBJECT(
      'userId', lu.userId,
      'firstName', lu.firstName,
      'lastName', lu.lastName,
      'displayName', lu.displayName,
      'bio', lu.bio,
      'interests', lu.interests,
      'birthdate', lu.birthDate,
      'longitude', lu.longitude,
      'latitude', lu.latitude,
      'sex', lu.sex,
      'orientation', lu.orientation,
      'likeId', l.id,
      'userImages', (
        SELECT JSON_ARRAYAGG(locationUrl)
        FROM images lui
        WHERE lui.ownerId = lu.userId
        ORDER BY lui.idx
      )
    )
  )
  FROM likes l
  JOIN users lu ON (lu.userId = CASE WHEN l.senderId = users.userId THEN l.receiverId ELSE l.senderId END)
  WHERE l.receiverId = users.userId
) AS likedBy`;

const joinMatches = `(
  SELECT JSON_ARRAYAGG(
    JSON_OBJECT(
      'userId', mu.userId,
      'firstName', mu.firstName,
      'lastName', mu.lastName,
      'displayName', mu.displayName,
      'bio', mu.bio,
      'interests', mu.interests,
      'birthdate', mu.birthDate,
      'longitude', mu.longitude,
      'latitude', mu.latitude,
      'sex', mu.sex,
      'orientation', mu.orientation,
      'matchId', m.id,
      'userImages', (
        SELECT JSON_ARRAYAGG(locationUrl)
        FROM images mui
        WHERE mui.ownerId = mu.userId
        ORDER BY mui.idx
      )
    )
  )
  FROM matches m
  JOIN users mu ON (mu.userId = CASE WHEN m.user1Id = users.userId THEN m.user2Id ELSE m.user1Id END)
  WHERE m.user1Id = users.userId OR m.user2Id = users.userId
) AS matches`;

const queries = {
  USE_DB: "USE ?",
  // user queries
  ADD_NEW_USER:
    "INSERT INTO users (userId, firstName, lastName, displayName, birthDate, email, password, sex, orientation, interests, createdAt) VALUES (uuid(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
  FIND_USERS_BY_FIRSTNAME: `SELECT ${userFieldsWithImages} FROM users LEFT JOIN images i ON i.ownerId = users.userId WHERE firstName = ? GROUP BY users.userId`,
  FIND_USERS_BY_LASTNAME: `SELECT ${userFieldsWithImages} FROM users LEFT JOIN images i ON i.ownerId = users.userId WHERE lastName = ? GROUP BY users.userId`,
  FIND_USER_BY_ID: `SELECT ${userFieldsWithImages} FROM users LEFT JOIN images i ON i.ownerId = users.userId WHERE userId = ? GROUP BY users.userId`,
  FIND_USER_BY_EMAIL: `
  SELECT ${userFieldsWithImages}, ${joinLikes}, ${joinLikedBy}, ${joinMatches}
  FROM users
  LEFT JOIN images i ON i.ownerId = users.userId
  WHERE users.email = ?
  GROUP BY users.userId
`,
  FIND_AUTH_USER_BY_EMAIL: `
SELECT 
  users.*, 
  GROUP_CONCAT(DISTINCT i.locationUrl ORDER BY i.idx) AS userImages,
  ${joinLikes},
  ${joinLikedBy},
  ${joinMatches}
FROM users
LEFT JOIN images i ON i.ownerId = users.userId
LEFT JOIN dislikes d ON (d.receiverId = users.userId)
WHERE users.email = ?
  AND d.id IS NULL
GROUP BY users.userId
`,

  FIND_ALL_USERS: `SELECT ${userFieldsWithImages} FROM users LEFT JOIN images i ON i.ownerId = users.userId GROUP BY users.userId`,
  FIND_USERS_BY_NAME: `SELECT ${userFieldsWithImages} FROM users LEFT JOIN images i ON i.ownerId = users.userId WHERE LOWER(firstName) = LOWER(?) OR LOWER(lastName) = LOWER(?) ORDER BY firstName, lastName LIMIT ? OFFSET ? GROUP BY users.userId`,
  UPDATE_USER_PASSWORD: `UPDATE users SET password = ? WHERE userId = ?`,
  DELETE_USER_QUERY: `DELETE FROM users WHERE userId = ?`,
  SET_USER_INTERESTS: `UPDATE users SET interests = ? WHERE userId = ?`,
  FIND_USERS_BY_INTERESTS: `SELECT ${userFieldsWithImages} FROM users LEFT JOIN images i ON i.ownerId = users.userId WHERE interests = ? GROUP BY users.userId`,
  FIND_USERS_BY_ONE_INTEREST: `SELECT ${userFieldsWithImages} FROM users LEFT JOIN images i on i.ownerId = users.userId WHERE MOD(interests >> ?, 2) = 1 GROUP BY users.userId`,
  FIND_USERS_BY_TWO_INTERESTS: `SELECT ${userFieldsWithImages} FROM users LEFT JOIN images i on i.ownerId = users.userId WHERE MOD(interests >> ?, 2) = 1 AND MOD(interests >> ?, 2) = 1 GROUP BY users.userId`,
  FIND_USERS_BY_THREE_INTERESTS: `SELECT ${userFieldsWithImages} FROM users LEFT JOIN images i on i.ownerId = users.userId WHERE MOD(interests >> ?, 2) = 1 AND MOD(interests >> ?, 2) = 1 AND MOD(interests >> ?, 2) = 1 GROUP BY users.userId`,
  FIND_USERS_BY_FOUR_INTERESTS: `SELECT ${userFieldsWithImages} FROM users LEFT JOIN images i on i.ownerId = users.userId WHERE MOD(interests >> ?, 2) = 1 AND MOD(interests >> ?, 2) = 1 AND MOD(interests >> ?, 2) = 1 AND MOD(interests >> ?, 2) = 1 GROUP BY users.userId`,
  FIND_USERS_BY_FIVE_INTERESTS: `SELECT ${userFieldsWithImages} FROM users LEFT JOIN images i on i.ownerId = users.userId WHERE
  MOD(interests >> ?, 2) = 1 AND
  MOD(interests >> ?, 2) = 1 AND
  MOD(interests >> ?, 2) = 1 AND
  MOD(interests >> ?, 2) = 1 AND
  MOD(interests >> ?, 2) = 1
  GROUP BY users.userId`,

  REPORT_USER: `INSERT INTO report (id, senderId, receiverId, reason) VALUES (uuid(), ?, ?, ?)`,
  GET_REPORTS: `SELECT * FROM report WHERE receiverId = ?`,
  FIND_REPORT_BY_SENDER_AND_RECEIVER: `SELECT * FROM report WHERE senderId = ? AND receiverId = ?`,

  UPDATE_USER: `UPDATE users SET firstName = ?, lastName = ?, displayName = ?, email = ?, longitude = ?, latitude = ?, radiusInKm = ?, interests = ?, sex = ?, orientation = ?, bio = ? WHERE userId = ?`,
  UPDATE_FAME_RATING: `UPDATE users u
  JOIN (
      SELECT 
          u.userId AS user_id,
          COUNT(DISTINCT l.id) AS like_count,
          COUNT(DISTINCT m.id) AS match_count,
          COUNT(DISTINCT d.id) AS dislike_count,
          COUNT(DISTINCT r.id) AS report_count
      FROM users u
      LEFT JOIN likes l ON l.receiverId = u.userId
      LEFT JOIN matches m ON (m.user1Id = u.userId OR m.user2Id = u.userId)
      LEFT JOIN dislikes d ON d.receiverId = u.userId
      LEFT JOIN report r ON r.receiverId = u.userId
      GROUP BY u.userId
  ) stats ON u.userId = stats.user_id
  SET u.fameRating = 
      CASE 
          WHEN (like_count + match_count + dislike_count + report_count) = 0 THEN 50
          ELSE (like_count + match_count) * 100 / 
               (like_count + match_count + dislike_count + report_count)
      END;
  ;
  `,
  UPDATE_LAST_LOCATION: `UPDATE users SET longitude = ?, latitude = ?, city = ?, region = ?, country = ?  WHERE userId = ?`,
  // oAuth user queries
  ADD_OAUTH_USER: `INSERT INTO oauthUsers (userId, providerId, provider, email, createdAt) VALUES (uuid(), ?, ?, ?, ?)`,
  FIND_OAUTH_USER_BY_EMAIL: `SELECT * FROM oauthUsers WHERE email = ?`,
  DELETE_OAUTH_USER: `DELETE FROM oauthUsers WHERE email = ?`,
  // image queries
  ADD_IMAGE: `INSERT INTO images (locationUrl, ownerId, idx, publicId) VALUES (?, ?, ?, ?)`,
  DELETE_IMAGE: `DELETE FROM images WHERE imageId = ?`,
  DECREMENT_IMAGES_INDEX: `UPDATE images SET idx = idx - 1 WHERE ownerId = ? AND idx > ?`,
  SWAP_IMAGES: `
    UPDATE images 
    SET idx = CASE 
        WHEN idx = ? THEN ?
        WHEN idx = ? THEN ?
        ELSE idx 
    END
    WHERE ownerId = ? AND idx IN (?, ?)
    `,
  FIND_IMAGE_BY_OWNER_AND_IDX: `SELECT * FROM images WHERE ownerId = ? AND idx = ?`,
  FIND_IMAGES_BY_USER: `SELECT * FROM images WHERE ownerId = ? ORDER BY idx`,
  // like queries
  ADD_LIKE: `INSERT INTO likes (id, senderId, receiverId,superLike) VALUES (uuid(), ?, ?, false)`,
  ADD_SUPER_LIKE: `INSERT INTO likes (id, senderId, receiverId, superLike) VALUES (uuid(), ?, ?, true)`,
  DELETE_LIKE: `DELETE FROM likes WHERE senderId = ? AND receiverId = ?`,
  DELETE_DISLIKE: `DELETE FROM dislikes WHERE senderId = ? AND receiverId = ?`,
  // match queries
  CHECK_MATCH: `SELECT * FROM matches WHERE (user1Id = ? AND user2Id = ?) OR (user1Id = ? AND user2Id = ?)`,
  ADD_MATCH: `INSERT INTO matches (id, user1Id, user2Id) VALUES (uuid(), ?, ?)`,
  DELETE_MATCH: `DELETE FROM matches WHERE user1Id = ? AND user2Id = ?`,
  // message queries
  ADD_MESSAGE: `INSERT INTO messages (id, senderId, receiverId, content1) VALUES (?, ?, ?, ?)`,
  DELETE_MESSAGE: `DELETE FROM messages WHERE id = ?`,
  FIND_MESSAGES_BETWEEN_USERS: `SELECT * FROM messages WHERE (senderId = ? AND receiverId = ?) OR (senderId = ? AND receiverId = ?)`,
  // relations
  GET_NEARBY_USERS: `
  SELECT ${userFieldsWithImages},
      (6371 * ACOS(
        COS(RADIANS(?)) * COS(RADIANS(users.latitude)) *
        COS(RADIANS(users.longitude) - RADIANS(?)) +
        SIN(RADIANS(?)) * SIN(RADIANS(users.latitude))
      )) AS distance
    FROM users
    LEFT JOIN images i ON i.ownerId = users.userId
    LEFT JOIN dislikes d ON d.receiverId = users.userId AND d.senderId = ?
    LEFT JOIN likes l ON l.receiverId = users.userId AND l.senderId = ?
    LEFT JOIN matches m ON (m.user1Id = users.userId OR m.user2Id = users.userId) AND (m.user1Id = ? OR m.user2Id = ?)
    WHERE users.userId != ?
    AND JSON_CONTAINS(users.orientation, JSON_QUOTE(?)) -- they interested  in your gender
    AND JSON_CONTAINS(?, JSON_QUOTE(users.sex)) -- you are interested in their gender
    AND users.latitude IS NOT NULL 
    AND users.longitude IS NOT NULL
    AND d.receiverId IS NULL  -- Exclude disliked users
    AND d.senderId IS NULL  -- Exclude disliked users
    AND l.receiverId IS NULL  -- Exclude liked users
    AND l.senderId IS NULL  -- Exclude liked users
    AND m.user1Id IS NULL  -- Exclude matched users
    AND m.user2Id IS NULL  -- Exclude matched users
    GROUP BY users.userId
    HAVING distance <= ?
    ORDER BY distance ASC;
`,
  GET_LIKED_BY: `
SELECT l.*, 
       ${userFieldsWithImages}
FROM likes l
JOIN users ON l.senderId = users.userId
LEFT JOIN images i ON i.ownerId = l.receiverId
WHERE l.receiverId = ?
GROUP BY l.id, users.userId
`,
  GET_MATCHES: `SELECT m.*, ${userFieldsWithImages} FROM matches m JOIN users u ON (m.user1Id = u.userId OR m.user2Id = u.userId) WHERE user1Id = ? OR user2Id = ?`,
  FIND_MATCH: `SELECT 
  CASE 
    WHEN m.user1Id = ? THEN m.user2Id 
    ELSE m.user1Id 
  END AS matchedUserId,
  (
    SELECT JSON_OBJECT(
      'userId', mu.userId,
      'firstName', mu.firstName,
      'lastName', mu.lastName,
      'displayName', mu.displayName,
      'bio', mu.bio,
      'interests', mu.interests,
      'birthDate', mu.birthDate,
      'longitude', mu.longitude,
      'latitude', mu.latitude,
      'sex', mu.sex,
      'orientation', mu.orientation,
      'userImages', (
        SELECT GROUP_CONCAT(DISTINCT mui.locationUrl ORDER BY mui.idx)
        FROM images mui
        WHERE mui.ownerId = mu.userId
      )
    )
    FROM users mu
    WHERE mu.userId = CASE 
      WHEN m.user1Id = ? THEN m.user2Id 
      ELSE m.user1Id 
    END
  ) AS matchedUser
FROM matches m
WHERE (m.user1Id = ? OR m.user2Id = ?)`,
  CHECK_LIKE: `SELECT * FROM likes WHERE senderId = ? AND receiverId = ?`,
  ADD_DISLIKE: `INSERT INTO dislikes (id, senderId, receiverId) VALUES (uuid(), ?, ?)`,
  CHECK_DISLIKE: `SELECT * FROM dislikes WHERE senderId = ? AND receiverId = ?`,
  GET_LIKES_BY_SENDER_ID: `SELECT * FROM likes WHERE senderId = ?`,
  GET_LIKE_BY_SENDER_ID_AND_RECEIVER_ID: `
  SELECT l.*, 
         ${userFieldsWithImages}
  FROM likes l
  JOIN users ON l.senderId = users.userId
  LEFT JOIN images i ON i.ownerId = l.senderId
  WHERE l.senderId = ? AND l.receiverId = ?
  GROUP BY l.id, users.userId
  `,
};

module.exports = queries;
