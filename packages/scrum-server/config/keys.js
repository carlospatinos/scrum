require('dotenv').config();

const config = {
  mongodb: {
    dbURI: process.env.DB_URL || "dburi",
    dbUser: process.env.DB_USER || "user",
    dbPass: process.env.DB_PASS || 'pass',
    dbName: process.env.DB_NAME || 'dbname',
  },
  sessionSecret: process.env.SESSION_SECRET || 'sessionSecret',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "jwtSecret",
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID || "clientID",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "clientSecret",
    callback: process.env.GOOGLE_CALLBACK ||  "http://localhost:3000/auth/google/redirect"
  },
  twitter: {
    consumerKey: process.env.TWITTER_CONSUMER_KEY || "consumerKey",
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET || "consumerSecret",
    accessToken: process.env.TWITTER_ACCESS_TOKEN || "accessToken",
    accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET || "accessTokenSecret",
    callback: process.env.TWITTER_CALLBACK || "http://localhost:3000/auth/twitter/redirect"
  }
};

module.exports = config;