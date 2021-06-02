/* eslint-disable */
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../../api/components/user/model');
const { Logger } = require('../../utils/Logger');

const logger = Logger(__filename);

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, doneCallBack) => {
      // match user
      User.findOne({ email })
        .then(user => {
          if (!user) {
            logger.warn('user not found');
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
          logger.error(err);
        });
    })
  );
};
