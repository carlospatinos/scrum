/* eslint-disable */
const User = require('../models/user');

module.exports = function (passport) {
  passport.serializeUser((user, doneCallBack) => {
    // console.log("serialize user: ", user);
    doneCallBack(null, user.id);
  });

  passport.deserializeUser((id, doneCallBack) => {
    // console.log("deserialize user: ", id);
    User.findById(id, (err, user) => {
      doneCallBack(err, user);
    });
  });
};
