require("dotenv").config();
require("module-alias/register");
const { v4: uuidv4 } = require("uuid");
const { Server } = require("socket.io");
const argon2 = require("argon2");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var sanitizer = require("perfect-express-sanitizer");
const db = require("@lib/db/dbconnect");
var authMiddleware = require("@middlewares/auth/auth.middleware");
const socketAuthMiddleware = require("@middlewares/auth/socket.middleware");
var passport = require("@middlewares/auth/passport.middleware");
const http = require("http");
const { setSocketInstance } = require("@lib/socketManager");

var indexRouter = require("@routes/index");
var usersRouter = require("@routes/users");
var authRoutes = require("@routes/auth");
var imagesRouter = require("@routes/images");
var relationsRouter = require("@routes/relations");
var blocksRouter = require("@routes/blocks");
var viewsRouter = require("@routes/views");
var cors = require("cors");
const registerRelationEvents = require("@sockets/relations/relations.socket");
var app = express();

const locations = [
  {
    latitude: 33.5731,
    longitude: -7.5898,
    city: "Casablanca",
    region: "Casablanca-Settat",
  }, // Casablanca
  {
    latitude: 34.0209,
    longitude: -6.8416,
    city: "Rabat",
    region: "Rabat-Sale",
  }, // Rabat
  {
    latitude: 31.6295,
    longitude: -7.9811,
    city: "Marrakkech",
    region: "Marrakkech-Safi",
  }, // Marrakech
  {
    latitude: 35.7595,
    longitude: -5.83395,
    city: "Tangier",
    region: "Tangier-Assilah",
  }, // Tangier
  {
    latitude: 30.4278,
    longitude: -9.5981,
    city: "Agadir",
    region: "Souss-Massa",
  }, // Agadir
  {
    latitude: 33.5731,
    longitude: -7.5898,
    city: "Casablanca",
    region: "Casablanca-Settat",
  }, // Casablanca
  {
    latitude: 34.0209,
    longitude: -6.8416,
    city: "Rabat",
    region: "Rabat-Sale",
  }, // Rabat
  {
    latitude: 31.6295,
    longitude: -7.9811,
    city: "Marrakkech",
    region: "Marrakkech-Safi",
  }, // Marrakech
  {
    latitude: 35.7595,
    longitude: -5.83395,
    city: "Tangier",
    region: "Tangier-Assilah",
  }, // Tangier
  {
    latitude: 30.4278,
    longitude: -9.5981,
    city: "Agadir",
    region: "Souss-Massa",
  }, // Agadir
];

const images = [
  "https://res.cloudinary.com/dfc1d7dmn/image/upload/v1703411030/samples/animals/cat.jpg",
  "https://res.cloudinary.com/dfc1d7dmn/image/upload/v1703411031/samples/people/kitchen-bar.jpg",
  "https://res.cloudinary.com/dfc1d7dmn/image/upload/v1703411033/samples/people/smiling-man.jpg",
  "https://res.cloudinary.com/dfc1d7dmn/image/upload/v1703411035/samples/people/boy-snow-hoodie.jpg",
  "https://res.cloudinary.com/dfc1d7dmn/image/upload/v1703411036/samples/people/jazz.jpg",
  "https://res.cloudinary.com/dfc1d7dmn/image/upload/v1703411038/samples/people/bicycle.jpg",
];

function getRandomOffset(cityLat) {
  // Convert 1-10 km to degrees (1 km ≈ 0.009 degrees latitude)
  const maxOffsetKm = 10;
  const minOffsetKm = 1;
  const offsetKm = Math.random() * (maxOffsetKm - minOffsetKm) + minOffsetKm;

  const offsetLat = offsetKm / 111; // Convert km to latitude degrees
  const offsetLon = offsetKm / (111 * Math.cos((cityLat * Math.PI) / 180)); // Adjust for longitude

  // Randomly add or subtract the offset
  return {
    latOffset: (Math.random() < 0.5 ? -1 : 1) * offsetLat,
    lonOffset: (Math.random() < 0.5 ? -1 : 1) * offsetLon,
  };
}

async function seedUsers() {
  const connection = await db;
  console.log("Inserting dummy users...");

  for (let i = 0; i < 100; i++) {
    const city = locations[Math.floor(i / 20)]; // Assign 20 users per city
    const { latOffset, lonOffset } = getRandomOffset(city.latitude);

    const latitude = city.latitude + latOffset;
    const longitude = city.longitude + lonOffset;

    const hashedPassword = await argon2.hash("password123");
    const userId = uuidv4();
    const createdAt = new Date().toISOString().slice(0, 19).replace("T", " ");
    const birthdate = new Date(
      1995 + Math.floor(Math.random() * 10),
      Math.random() * 12,
      Math.random() * 28
    )
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const orientations = ["male", "female", "other"];

    const query = `
  INSERT INTO users (
    userId, firstName, lastName, displayName, email, createdAt,
    longitude, latitude, birthdate, includingRange, radiusInKm,
    interests, sex, orientation, bio, emailVerified, password
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

    const values = [
      userId,
      `First${i}`,
      `Last${i}`,
      `User${i}`,
      `user${i}@test.com`,
      createdAt,
      longitude,
      latitude,
      birthdate,
      Math.floor(Math.random() * 5) + 1,
      Math.floor(Math.random() * 100),
      1 << Math.floor(Math.random() * 10), // Random interest bitmask
      i % 2 === 0 ? "male" : "female",
      JSON.stringify(orientations), // orientation as JSON array
      "This is a test bio.",
      true,
      hashedPassword,
    ];
    await connection.execute(query, values);

    const query2 = `INSERT INTO images (locationUrl, ownerId, idx, publicId) VALUES (?, ?, ?, ?)`;
    const startingIndex = Math.floor(Math.random() * images.length);
    for (let j = 0; j < 3; j++) {
      const randomImage = images[(startingIndex + j) % images.length];
      const publicId = uuidv4();
      await connection.execute(query2, [randomImage, userId, j, publicId]);
    }

    // Insert random images
  }
}

async function generateDummyUsers() {
  try {
    console.log("Seeding dummy users...");
    await seedUsers();

    console.log("✅ Dummy users inserted successfully!");
  } catch (error) {
    console.error("❌ Error inserting dummy users:", error);
  }
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(
  cors(
    { origin: process.env.FRONTEND_PUBLIC_URL, credentials: true },
    { origin: "https://ipapi.co", credentials: false }
  )
);
app.use(
  cors(
    { origin: process.env.FRONTEND_PUBLIC_URL, credentials: true },
    { origin: "https://ipapi.co", credentials: false }
  )
);
//limiting the size of the request body
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.all("/*", authMiddleware);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRoutes);
app.use("/images", imagesRouter);
app.use("/relations", relationsRouter);
app.use("/blocks", blocksRouter);
app.use("/views", viewsRouter )
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

setSocketInstance(io);

// --- Socket Auth Middleware ---
io.use(socketAuthMiddleware);

io.on("connection", (socket) => {
  const userId = socket.user.id;
  socket.join(userId.toString());
  registerRelationEvents(socket);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.use(
  sanitizer.clean({
    xss: true,
    sql: true,
    level: 5,
  })
);

// ✅ Fix: Call generateDummyUsers() properly
server.listen(3001, async () => {
  console.log(`Example app listening on port 3001`);
  // await generateDummyUsers();
});

module.exports = app;
