/* eslint-disable */
// TODO fix eslint
const TwitterStrategy = require('passport-twitter');
const keys = require('../../config/keys');
const User = require('../../api/components/user/model');

module.exports = function (passport) {
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: keys.twitter.consumerKey,
        consumerSecret: keys.twitter.consumerSecret,
        callbackURL: keys.twitter.callback,
      },
      (accessToken, refreshToken, profile, doneCallBack) => {
        console.log('user not found in db');
        User.findOne({ twitterId: profile._json.id_str }, function (err, currentUser) {
          if (!currentUser) {
            console.log('user not found in db for: ', profile._json.screen_name);
            // doneCallBack(null, profile);
            new User({
              twitterId: profile._json.id_str,
              firstName: profile._json.name,
              lastName: profile._json.screen_name,
              email: profile._json.screen_name,
              profileImageUrl: profile._json.profile_image_url,
            }).save((err, docUser) => {
              if (err) {
                console.log(err);
                doneCallBack(null, profile);
              }
              doneCallBack(null, docUser);
            });
          } else {
            console.log('user found in db');
            doneCallBack(null, currentUser);
          }
        });
      }
    )
  );
};
