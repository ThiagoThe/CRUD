var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var nova = require("./routes/new"); //registrando nova rota

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express(); //Instancia o express e associa nossa variavel app a ele

// view engine setup
app.set("views", path.join(__dirname, "views")); //todas as "views" ficarao na pasta views
app.set("view engine", "ejs"); //escolhemos que o motor de renderizacao sera o ejs

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

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

module.exports = app;
