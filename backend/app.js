require("module-alias/register");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const passport = require("./src/middleware/auth/passport");

var indexRouter = require("./src/routes/index");
var usersRouter = require("./src/routes/users");
var authRoutes = require("./src/routes/authRoutes");

var app = express();

var sanitizer = require("perfect-express-sanitizer");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRoutes);

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
