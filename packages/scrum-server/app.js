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
const keys = require('./config/keys');

require('./authStrategies/localStrategy')(passport);
require('./authStrategies/googleStrategy')(passport);
require('./authStrategies/twitterStrategy')(passport);
require('./utils/db.js');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const api = require('./routes/api');

const app = express();
const i18n = require('i18n');

i18n.configure({
  locales: ['es', 'en'],
  cookie: 'locale',
  directory: __dirname + "/locales",
  defaultLocale: 'en',
  queryParameter: 'lang',
  api: {
    '__': 'translate',
    '__n': 'translateN'
  },
});

const CLIENT_PATH = '/../scrum-client/build/';
// TODO change this 
// view engine setup
app.use(cors({
  origin: keys.reactAppURL, // allow to server to accept request from different origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true // allow session cookie from browser to pass through
}));
app.use(i18n.init);
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
app.use('/api', api);
app.use('/auth', authRouter);

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
  res.json('error');
});

module.exports = app;
