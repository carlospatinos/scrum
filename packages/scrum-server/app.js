/* eslint-disable */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const cors = require('cors');

require('./config/passport')(passport);

const db = require('./utils/db.js');

const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
const api = require('./routes/api');

const app = express();

const CLIENT_PATH = '/../scrum-client/build/';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'defaultSecret',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, CLIENT_PATH)));

app.use('/js', express.static(`${__dirname}/node_modules/jquery/dist`)); // redirect JS jQuery
app.use('/js', express.static(`${__dirname}/node_modules/bootstrap/dist/js`)); // redirect bootstrap JS
app.use('/css', express.static(`${__dirname}/node_modules/bootstrap/dist/css`)); // redirect CSS bootstrap

app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.use('/api', api);

// Handles any requests that don't match the ones above
app.get('*', (req, res, next) => {
  console.log(`Client retrieval: ${path.join(`${__dirname + CLIENT_PATH}index.html`)}`);
  res.sendFile(path.join(`${__dirname + CLIENT_PATH}index.html`));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
