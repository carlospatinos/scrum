const keys = require('../config/keys');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');

module.exports = function (passport) {
    passport.use(
        new FacebookStrategy(
            {
              clientID: process.env.FACEBOOK_CLIENT_ID,
              clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
              callbackURL: process.env.FACEBOOK_CALLBACK_URL,
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