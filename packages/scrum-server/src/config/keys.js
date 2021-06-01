require('dotenv').config();

const config = {
  corsWhiteListUrl:
    process.env.CORS_WHITELIST_URL ||
    'http://scrum-app-local.com:4000 http://scrum-app-local.com:3000 http://localhost:4000 http://localhost:3000',
  mongodb: {
    dbURI: process.env.DB_URL || 'dburi',
    dbUser: process.env.DB_USER || 'user',
    dbPass: process.env.DB_PASS || 'pass',
    dbName: process.env.DB_NAME || 'dbname',
  },
  sessionSecret: process.env.SESSION_SECRET || 'sessionSecret',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'jwtSecret',
  reactAppURL: process.env.REACT_APP_API_URL || 'http://scrum-app-local.com:4000',
  logging: {
    level: process.env.LOG_LEVEL || 'warn',
    format: process.env.LOG_DATEFORMAT || 'MMM-DD-YYYY HH:mm:ss',
  },
  httpLogging: {
    httpLogFormat: process.env.HTTP_LOG_FORMAT || 'tiny',
    httpLoggingEnabled: process.env.HTTP_LOG_ENABLED || 'false',
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID || 'clientID',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'clientSecret',
    callback: process.env.GOOGLE_CALLBACK || 'http://scrum-app-local.com:3000/auth/google/redirect',
  },
  facebook: {
    clientID: process.env.FACEBOOK_CLIENT_ID || 'clientID',
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET || 'clientSecret',
    callback:
      process.env.FACEBOOK_CALLBACK || 'http://scrum-app-local.com:3000/auth/facebook/redirect',
  },
  twitter: {
    consumerKey: process.env.TWITTER_CONSUMER_KEY || 'consumerKey',
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET || 'consumerSecret',
    accessToken: process.env.TWITTER_ACCESS_TOKEN || 'accessToken',
    accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET || 'accessTokenSecret',
    callback:
      process.env.TWITTER_CALLBACK || 'http://scrum-app-local.com:3000/auth/twitter/redirect',
  },
};

module.exports = config;
