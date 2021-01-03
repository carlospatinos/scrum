const facebookStrategy = require('./facebookStrategy');
const googleStrategy = require('./googleStrategy');
const localStrategy = require('./localStrategy');
const twitterStrategy = require('./twitterStrategy');
const passportPersistent = require('./passportPersistent');

const configure = (
  passport,
  config = {
    facebook: true,
    google: true,
    local: true,
    twitter: true,
    passportPersistent: true,
  }
) => {
  if (config.facebook) facebookStrategy(passport);
  if (config.google) googleStrategy(passport);
  if (config.local) localStrategy(passport);
  if (config.twitter) twitterStrategy(passport);
  if (config.passportPersistent) passportPersistent(passport);
};

module.exports = { configure };
