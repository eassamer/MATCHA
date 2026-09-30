require("dotenv").config();
require("module-alias/register");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var authMiddleware = require("@middlewares/auth/auth.middleware");
var passport = require("@middlewares/auth/passport.middleware");

var indexRouter = require("@routes/index");
var usersRouter = require("@routes/users");
var authRoutes = require("@routes/auth");
var imagesRouter = require("@routes/images");
var relationsRouter = require("@routes/relations");
var blocksRouter = require("@routes/blocks");
var viewsRouter = require("@routes/views");
var notificationRouter = require("@routes/notifications");
var messageRouter = require("@routes/message");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

if (process.env.NODE_ENV !== "test") {
  app.use(logger("dev"));
}
app.use(
  cors({
    origin: process.env.FRONTEND_PUBLIC_URL || "http://localhost:3000",
    credentials: true,
  })
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
app.use("/views", viewsRouter);
app.use("/notifications", notificationRouter);
app.use("/messages", messageRouter);

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

// NOTE: input sanitisation is tracked in ticket BE-36 (the previous sanitizer was
// mounted after the error handler and never ran).

module.exports = app;
