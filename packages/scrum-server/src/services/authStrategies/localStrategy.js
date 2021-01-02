/* eslint-disable */
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../src/api/components/user/model');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, doneCallBack) => {
      // match user
      User.findOne({ email })
        .then(user => {
          if (!user) {
            console.log('user not found');
            return doneCallBack(null, false, { message: 'that email is not registered' });
          }
          // match pass
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              return doneCallBack(null, user);
            }
            return doneCallBack(null, false, { message: 'pass incorrect' });
          });
        })
        .catch(err => {
          console.log(err);
        });
    })
  );
};
