// Require the express module
const express = require('express');
// Creates the app object using the imported express module
const app = express();

// Create HTTP errors where needed (for express error handling)
var createError = require('http-errors');
var path = require('path');
// To parse the cookie header and populate req.cookies
var cookieParser = require('cookie-parser');
// An HTTP request logger middleware for node.
var logger = require('morgan');

const mongoose = require("mongoose");
const dotenv = require("dotenv");
require('dotenv').config();

const passport = require('passport');
const { loginCheck } = require("./auth/passport");
loginCheck(passport);

const session = require('express-session');

// Requires modules from the routes directory
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');

// Set up mongoose connection
// const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const mongoDB = process.env.MY_MONGODB_URI
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Using the app object to set up the view (template) engine.
  // Setting the 'views' value to specify the folder where the templates will be stored
app.set('views', path.join(__dirname, 'views'));
  // Setting the 'view engine' value to specify the template library.
app.set('view engine', 'ejs');

// Below: calling app.use() to add the middleware libraries that we imported above into the request handling chain

app.use(logger('dev'));

// Body parsing: To populate the req.body say with form fields
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Adding our (previously imported) route-handling code to the request handling chainRoutes
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/post', postsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
