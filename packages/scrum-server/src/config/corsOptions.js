const keys = require('./keys');

const whitelist = [keys.reactAppURL, ...keys.corsWhiteListUrl.split(' ')];
const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // allow session cookie from browser to pass through
};

module.exports = corsOptions;
