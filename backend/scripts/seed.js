// Seeds the database with dummy users, pictures, likes, matches and views.
// Usage: npm run seed            (500 users)
//        npm run seed -- --count=50
const argon2 = require("argon2");
const { v4: uuidv4 } = require("uuid");
const { connectWithRetry, serverConfig } = require("../src/lib/db/migrate");

const CITIES = [
  { latitude: 33.5731, longitude: -7.5898, city: "Casablanca", region: "Casablanca-Settat" },
  { latitude: 34.0209, longitude: -6.8416, city: "Rabat", region: "Rabat-Sale" },
  { latitude: 31.6295, longitude: -7.9811, city: "Marrakech", region: "Marrakech-Safi" },
  { latitude: 35.7595, longitude: -5.834, city: "Tangier", region: "Tangier-Assilah" },
  { latitude: 30.4278, longitude: -9.5981, city: "Agadir", region: "Souss-Massa" },
];

const IMAGES = [
  "https://res.cloudinary.com/dfc1d7dmn/image/upload/v1703411030/samples/animals/cat.jpg",
  "https://res.cloudinary.com/dfc1d7dmn/image/upload/v1703411031/samples/people/kitchen-bar.jpg",
  "https://res.cloudinary.com/dfc1d7dmn/image/upload/v1703411033/samples/people/smiling-man.jpg",
  "https://res.cloudinary.com/dfc1d7dmn/image/upload/v1703411035/samples/people/boy-snow-hoodie.jpg",
  "https://res.cloudinary.com/dfc1d7dmn/image/upload/v1703411036/samples/people/jazz.jpg",
  "https://res.cloudinary.com/dfc1d7dmn/image/upload/v1703411038/samples/people/bicycle.jpg",
];

const SEXES = ["male", "female", "other"];
const BIOS = [
  "Coffee, hikes and bad puns.",
  "Looking for someone to share playlists with.",
  "Weekend surfer, weekday developer.",
  "I cook better than I text.",
  "Ask me about my cat.",
];

const DEFAULT_PASSWORD = "Password123";

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function pick(list) {
  return list[randomInt(list.length)];
}

function randomOffsetKm(latitude, maxKm = 10) {
  const km = Math.random() * maxKm;
  const lat = km / 111;
  const lon = km / (111 * Math.cos((latitude * Math.PI) / 180));
  return {
    lat: (Math.random() < 0.5 ? -1 : 1) * lat,
    lon: (Math.random() < 0.5 ? -1 : 1) * lon,
  };
}

function randomOrientation() {
  // at least one, up to all three
  const subset = SEXES.filter(() => Math.random() < 0.6);
  return subset.length ? subset : [pick(SEXES)];
}

function randomInterests() {
  let mask = 0;
  for (let i = 0; i < 3; i++) mask |= 1 << randomInt(10);
  return mask;
}

function randomBirthdate() {
  const year = 1980 + randomInt(26); // 18..46 years old in 2026
  return `${year}-${String(1 + randomInt(12)).padStart(2, "0")}-${String(1 + randomInt(28)).padStart(2, "0")}`;
}

function buildUsers(count, passwordHash, prefix) {
  const users = [];
  for (let i = 0; i < count; i++) {
    const city = CITIES[i % CITIES.length];
    const offset = randomOffsetKm(city.latitude);
    users.push({
      userId: uuidv4(),
      firstName: `First${i}`,
      lastName: `Last${i}`,
      displayName: `${prefix}${i}`,
      email: `${prefix}${i}@test.com`,
      latitude: city.latitude + offset.lat,
      longitude: city.longitude + offset.lon,
      city: city.city,
      region: city.region,
      birthdate: randomBirthdate(),
      radiusInKm: 20 + randomInt(80),
      interests: randomInterests(),
      sex: pick(SEXES),
      orientation: JSON.stringify(randomOrientation()),
      bio: pick(BIOS),
      password: passwordHash,
    });
  }
  return users;
}

async function insertInChunks(connection, sql, rows, chunkSize = 200) {
  for (let i = 0; i < rows.length; i += chunkSize) {
    const chunk = rows.slice(i, i + chunkSize);
    if (chunk.length) await connection.query(sql, [chunk]);
  }
}

/**
 * @param {object} options
 * @param {number} [options.count=500] number of users to create
 * @param {string} [options.database=process.env.DB_NAME]
 * @param {string} [options.prefix="user"] displayName/email prefix
 * @param {Function} [options.log]
 * @returns {Promise<{users: number, images: number, likes: number, matches: number, views: number}>}
 */
async function seed({
  count = 500,
  database = process.env.DB_NAME,
  prefix = "user",
  log = console.log,
} = {}) {
  if (!database) throw new Error("DB_NAME must be set");
  const connection = await connectWithRetry(serverConfig(), { log });
  try {
    await connection.query(`USE \`${database}\``);
    const passwordHash = await argon2.hash(DEFAULT_PASSWORD);
    const users = buildUsers(count, passwordHash, prefix);

    await insertInChunks(
      connection,
      `INSERT INTO users (userId, firstName, lastName, displayName, email, createdAt, longitude, latitude,
        city, region, birthdate, radiusInKm, interests, sex, orientation, bio, emailVerified, password) VALUES ?`,
      users.map((u) => [
        u.userId, u.firstName, u.lastName, u.displayName, u.email, new Date(), u.longitude, u.latitude,
        u.city, u.region, u.birthdate, u.radiusInKm, u.interests, u.sex, u.orientation, u.bio, true, u.password,
      ])
    );

    const images = [];
    users.forEach((u, i) => {
      for (let idx = 0; idx < 3; idx++) {
        images.push([IMAGES[(i + idx) % IMAGES.length], u.userId, idx, uuidv4()]);
      }
    });
    await insertInChunks(connection, `INSERT INTO images (locationUrl, ownerId, idx, publicId) VALUES ?`, images);

    // relations: each user likes ~3 others; mutual likes become matches (no like rows kept, as in the app)
    const likedPairs = new Set();
    const likes = [];
    const matches = [];
    const views = [];
    const now = new Date();
    users.forEach((u) => {
      for (let n = 0; n < 3 && users.length > 1; n++) {
        const other = pick(users);
        if (other.userId === u.userId) continue;
        const key = `${u.userId}>${other.userId}`;
        const reverse = `${other.userId}>${u.userId}`;
        if (likedPairs.has(key) || likedPairs.has(`m:${key}`) || likedPairs.has(`m:${reverse}`)) continue;
        if (likedPairs.has(reverse)) {
          likedPairs.delete(reverse);
          likedPairs.add(`m:${key}`);
          matches.push([uuidv4(), u.userId, other.userId, now]);
        } else {
          likedPairs.add(key);
        }
        views.push([uuidv4(), u.userId, other.userId, now]);
      }
    });
    likedPairs.forEach((key) => {
      if (key.startsWith("m:")) return;
      const [senderId, receiverId] = key.split(">");
      likes.push([uuidv4(), senderId, receiverId, Math.random() < 0.1, now]);
    });

    await insertInChunks(connection, `INSERT INTO likes (id, senderId, receiverId, superLike, createdAt) VALUES ?`, likes);
    await insertInChunks(connection, `INSERT INTO matches (id, user1Id, user2Id, createdAt) VALUES ?`, matches);
    await insertInChunks(connection, `INSERT IGNORE INTO views (id, viewerId, viewedId, createdAt) VALUES ?`, views);

    const summary = { users: users.length, images: images.length, likes: likes.length, matches: matches.length, views: views.length };
    log(`Seeded ${summary.users} users (password "${DEFAULT_PASSWORD}"), ${summary.images} images, ${summary.likes} likes, ${summary.matches} matches, ${summary.views} views`);
    return summary;
  } finally {
    await connection.end();
  }
}

if (require.main === module) {
  require("dotenv").config();
  const countArg = process.argv.find((a) => a.startsWith("--count="));
  seed({ count: countArg ? Number(countArg.split("=")[1]) : 500 })
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Seeding failed:", error.message);
      process.exit(1);
    });
}

module.exports = { seed, DEFAULT_PASSWORD };
