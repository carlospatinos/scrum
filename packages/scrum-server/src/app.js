/* eslint-disable */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const httpLogger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const cors = require('cors');
const { END_POINTS } = require('scrum-common');
const keys = require('./config/keys');
const corsOptions = require('./config/corsOptions');
const {Logger} = require('./utils/Logger');
const logger = Logger(__filename);

const AuthStrategies = require('./services/authStrategies');
require('./services/db.js');

const app = express();
const i18n = require('i18n');
const { TipsRoutes, UserRoutes, PlanningSessionRoutes, AuthRoutes , DefaultRoute, UserStoryRoutes } = require('./api/routes');


console.log("--->>>>>>" + __dirname + "/locales")

AuthStrategies.configure(passport);
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


const CLIENT_PATH = '/../../scrum-client/build/';
app.use(cors(corsOptions));
app.use(i18n.init);
app.use(httpLogger(keys.httpLogging.httpLogFormat, { skip: (req, res) => keys.httpLogging.httpLoggingEnabled === 'false' }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    secret: keys.sessionSecret,
    resave: false,
    saveUninitialized: false,
    // cookie: { expires: new Date(Date.now() + 3600000*24) , secure: false },
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

app.use(END_POINTS.ROOT, DefaultRoute);
app.use(END_POINTS.AUTH, AuthRoutes);
app.use(END_POINTS.API, UserRoutes);
app.use(END_POINTS.API, TipsRoutes);
app.use(END_POINTS.API, PlanningSessionRoutes);
app.use(END_POINTS.API, UserStoryRoutes);

// Handles any requests that don't match the ones above
app.get('*', (req, res, next) => {
  logger.info(`Client retrieval: ${path.join(`${__dirname + CLIENT_PATH}index.html`)}`);
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
  // TODO is this needed?
  logger.error(err);
  // render the error page
  res.status(err.status || 500);
  res.json('error');
});

module.exports = app;
