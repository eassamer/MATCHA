require("dotenv").config();
require("module-alias/register");
const { v4: uuidv4 } = require("uuid");
const argon2 = require("argon2");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var sanitizer = require("perfect-express-sanitizer");
const db = require("@lib/db/dbconnect");
var authMiddleware = require("@middlewares/auth/auth.middleware");
var passport = require("@middlewares/auth/passport.middleware");

var indexRouter = require("@routes/index");
var usersRouter = require("@routes/users");
var authRoutes = require("@routes/auth");
var imagesRouter = require("@routes/images");

var app = express();

const locations = [
  { latitude: 33.5731, longitude: -7.5898 }, // Casablanca
  { latitude: 34.0209, longitude: -6.8416 }, // Rabat
  { latitude: 31.6295, longitude: -7.9811 }, // Marrakech
  { latitude: 35.7595, longitude: -5.83395 }, // Tangier
  { latitude: 30.4278, longitude: -9.5981 }, // Agadir
];

async function generateDummyUsers() {
  try {
    const connection = await db; 
    console.log("Inserting dummy users...");

    for (let i = 0; i < 100; i++) {
      const { latitude, longitude } =
        locations[Math.floor(Math.random() * locations.length)];
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

      const query = `
        INSERT INTO users (userId, firstName, lastName, displayName, email, createdAt, longitude, latitude, birthdate, includingRange, radiusInKm, sex, bio, emailVerified, password)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
        Math.floor(Math.random() * 5) + 1, // includingRange: 1-5
        Math.floor(Math.random() * 100), // radiusInKm: 0-100km
        i % 2 === 0 ? "Male" : "Female",
        "This is a test bio.",
        true,
        hashedPassword,
      ];

      await connection.execute(query, values);
    }

    console.log("✅ Dummy users inserted successfully!");
  } catch (error) {
    console.error("❌ Error inserting dummy users:", error);
  }
}

// ✅ Fix: Move user insertion into an async function
async function insertUsers() {
  try {
    const connection = await db;
    for (const user of users) {
      await connection.query(
        `INSERT INTO users (userId, firstName, lastName, displayName, email, createdAt, longitude, latitude, birthdate, includingRange, radiusInKm, sex, bio, emailVerified, password) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          user.userId,
          user.firstName,
          user.lastName,
          user.displayName,
          user.email,
          user.createdAt,
          user.longitude,
          user.latitude,
          user.birthdate,
          user.includingRange,
          user.radiusInKm,
          user.sex,
          user.bio,
          user.emailVerified,
          user.password,
        ]
      );
    }
    console.log(`✅ Successfully inserted dummy users.`);
  } catch (err) {
    console.error("❌ Error inserting dummy users:", err);
  }
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
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
app.listen(3001, async () => {
  console.log(`Example app listening on port 3001`);
  // await generateDummyUsers();
});

module.exports = app;
