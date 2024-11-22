require("module-alias/register");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var sanitizer = require("perfect-express-sanitizer");

var authMiddleware = require("@middlewares/auth/auth.middleware");
var passport = require("@middlewares/auth/passport.middleware");

var indexRouter = require("@routes/index");
var usersRouter = require("@routes/users");
var authRoutes = require("@routes/auth");
var imagesRouter = require("@routes/images");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
//limiting the size of the request body
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
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

app.listen(3001, () => {
  console.log(`Example app listening on port`);
});

module.exports = app;
