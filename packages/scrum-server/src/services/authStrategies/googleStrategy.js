/* eslint-disable */
// TODO fix eslint
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../../config/keys');
const User = require('../../api/components/user/model');

module.exports = function (passport) {
  function extractProfile(profile) {
    if (profile && profile._json) {
      return {
        googleId: profile._json.sub,
        firstName: profile._json.given_name,
        lastName: profile._json.family_name,
        email: profile._json.email,
        profileImageUrl: profile._json.picture,
      };
    }
    return undefined;
  }
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: keys.google.callback,
        accessType: 'offline',
        userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
      },
      async (accessToken, refreshToken, profile, doneCallBack) => {
        const googleProfileInfo = extractProfile(profile);
        const existingUser = await User.findOne({ googleId: googleProfileInfo.googleId }).exec();
        if (!existingUser) {
          console.log('user not found in db');
          const newUser = await new User(googleProfileInfo).save();
          if (!newUser) {
            console.log('error user not saved');
            doneCallBack(null, profile);
          }
          doneCallBack(null, newUser);
        } else {
          console.log('user found in db');
          doneCallBack(null, existingUser);
        }
      }
    )
  );
};
