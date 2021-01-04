/* eslint-disable */
const User = require('../../api/components/user/model');
module.exports = function (passport) {
  passport.serializeUser((user, doneCallBack) => {
    doneCallBack(null, user.id);
  });

  passport.deserializeUser((id, doneCallBack) => {
    User.findById(id, (err, user) => {
      doneCallBack(err, user);
    });
  });
};
