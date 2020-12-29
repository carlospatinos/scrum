/* eslint-disable */
// TODO fix eslint
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('../config/keys');
const User = require('../models/user');

const fbCallback = (accessToken, refreshToken, profile, done) => {
  const { email, first_name, last_name } = profile._json;
  const userData = {
    email,
    firstName: first_name,
    lastName: last_name,
  };
  new User(userData).save();
  done(null, profile);
};

module.exports = function (passport) {
  passport.use(
    new FacebookStrategy(
      {
        clientID: keys.facebook.clientID,
        clientSecret: keys.facebook.clientSecret,
        callbackURL: keys.facebook.callback,
        profileFields: ['email', 'name'],
      },
      fbCallback
    )
  );
};
