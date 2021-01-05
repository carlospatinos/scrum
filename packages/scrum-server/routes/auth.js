/* eslint-disable */
// TODO fix eslint
const express = require('express');
const passport = require('passport');
const i18n = require('i18n');
const { END_POINTS } = require('scrum-common');
const User = require('../src/api/components/user/model');
const keys = require('../src/config/keys');
const router = express.Router();

router.post(END_POINTS.AUTH_LOCAL, passport.authenticate('local'), (req, res, next) => {
  console.log('Inside passport.authenticate() callback');
  const token = req.cookies.auth;
  User.findByToken(token, (err, user) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    if (user) {
      return res.status(400).json({
        success: false,
        message: i18n.__('apiUserAlreadyLoggedIn'),
      });
    }
    User.findOne({ email: req.body.email }, function (err, user) {
      if (!user) return res.json({ isAuth: false, message: i18n.__('apiEmailNotFound') });

      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) return res.json({ isAuth: false, message: i18n.__('apiPasswordDoNotMatch') });

        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);

          req.login(user, function (err) {
            if (err) {
              return res.status(400).send(err);
            }
            return res.cookie('auth', user.token).json({data:{
              isAuth: true,
              login_access_token: user.token,
              user: {
                id: user._id,
                email: user.email,
                fullName: `${user.firstName} ${user.lastName}`,
              },
            }});
            // return res.status(200).json({
            //   user: {
            //     id: user._id,
            //     email: user.email,
            //     fullName: `${user.firstName} ${user.lastName}`,
            //   }
            // });
          });
        });
      });
    });
  });
});

// TODO difference with profile?
router.get(END_POINTS.LOGIN_SUCCESS, (req, res, next) => {
  if (req.user) {
    return res.json({
      isAuth: true,
      success: true,
      user: req.user,
      login_access_token: 'sadadasdas', // TODO fix this
    });
  }
  return res.status(400).json({
    success: false,
    message: 'user not authenticated',
  });
});

module.exports = router;
