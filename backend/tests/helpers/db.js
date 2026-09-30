const argon2 = require("argon2");
const { v4: uuidv4 } = require("uuid");
const db = require("@lib/db/dbconnect");

// Child tables first so truncation order is irrelevant once FK checks are off.
const TABLES = [
  "views",
  "blocks",
  "notifications",
  "report",
  "messages",
  "matches",
  "dislikes",
  "likes",
  "images",
  "oauthUsers",
  "users",
];

async function truncateAll() {
  const p = db.promise();
  await p.query("SET FOREIGN_KEY_CHECKS = 0");
  for (const table of TABLES) {
    await p.query(`TRUNCATE TABLE \`${table}\``);
  }
  await p.query("SET FOREIGN_KEY_CHECKS = 1");
}

const hashCache = new Map();
async function passwordHash(password) {
  if (!hashCache.has(password)) {
    hashCache.set(password, await argon2.hash(password));
  }
  return hashCache.get(password);
}

let counter = 0;

/**
 * Inserts a user directly in the DB and returns it (with the plaintext password).
 */
async function createUser(overrides = {}) {
  const n = ++counter;
  const user = {
    userId: uuidv4(),
    firstName: `First${n}`,
    lastName: `Last${n}`,
    displayName: `user${n}`,
    email: `user${n}@test.com`,
    password: "Password123",
    sex: "female",
    orientation: ["male", "female", "other"],
    latitude: 33.5731,
    longitude: -7.5898,
    birthdate: "1995-06-15",
    radiusInKm: 100,
    interests: 1,
    bio: "test bio",
    ...overrides,
  };
  const hash = await passwordHash(user.password);
  await db
    .promise()
    .execute(
      `INSERT INTO users (userId, firstName, lastName, displayName, email, createdAt, longitude, latitude,
         birthdate, radiusInKm, interests, sex, orientation, bio, emailVerified, password)
       VALUES (?, ?, ?, ?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.userId,
        user.firstName,
        user.lastName,
        user.displayName,
        user.email,
        user.longitude,
        user.latitude,
        user.birthdate,
        user.radiusInKm,
        user.interests,
        user.sex,
        JSON.stringify(user.orientation),
        user.bio,
        true,
        hash,
      ]
    );
  return user;
}

async function addImage(userId, idx = 0, url = `https://example.com/${userId}-${idx}.jpg`) {
  await db
    .promise()
    .execute(`INSERT INTO images (locationUrl, ownerId, idx, publicId) VALUES (?, ?, ?, ?)`, [
      url,
      userId,
      idx,
      uuidv4(),
    ]);
  return url;
}

async function rows(sql, params = []) {
  const [result] = await db.promise().execute(sql, params);
  return result;
}

async function one(sql, params = []) {
  const result = await rows(sql, params);
  return result[0];
}

module.exports = { truncateAll, createUser, addImage, rows, one, passwordHash };
