const keys = require('../config/keys');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');

module.exports = function (passport) {
    passport.use(
        new FacebookStrategy(
            {
              clientID: keys.facebook.clientID,
              clientSecret: keys.facebook.clientSecret,
              callbackURL: keys.facebook.callback,
              profileFields: ["email", "name"]
            },
            function(accessToken, refreshToken, profile, done) {
              const { email, first_name, last_name } = profile._json;
              const userData = {
                email,
                firstName: first_name,
                lastName: last_name
              };
              new userModel(userData).save();
              done(null, profile);
            })
    );
}