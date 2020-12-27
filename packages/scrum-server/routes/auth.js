const express = require('express');
const passport = require('passport');
const i18n = require('i18n');
const User = require('../models/user.js');
const keys = require('../config/keys');
const router = express.Router();

router.post('/local', (req, res, next) => {
  let token = req.cookies.auth;
  User.findByToken(token, (err, user) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    if (user) {
      return res.status(400).json({
        success: false,
        message: i18n.__('apiUserAlreadyLoggedIn')
      });
    } else {
      User.findOne({ 'email': req.body.email }, function (err, user) {
        if (!user) return res.json({ isAuth: false, message: i18n.__('apiEmailNotFound') });

        user.comparePassword(req.body.password, (err, isMatch) => {
          if (!isMatch) return res.json({ isAuth: false, message: i18n.__('apiPasswordDoNotMatch') });

          user.generateToken((err, user) => {
            if (err) return res.status(400).send(err);
            return res.cookie('auth', user.token).json({
              isAuth: true,
              login_access_token: user.token,
              user: {
                id: user._id,
                email: user.email,
                fullName: `${user.firstName} ${user.lastName}`,
              }
            });
          });
        });
      });
    };
  });
});

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }), (req, res) => {
  console.log('google auth');
});
// Api call back function
// TODO verify how does this work with React
// TODO drom the keys.js
router.get('/google/redirect',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
    // successRedirect: 'http://localhost:4000/planningconfig', 
    // failureRedirect: "http://localhost:4000/sessionstarted"
  }),
  (req, res) => {
    console.log('-->', req.user.email);
    console.log('redirect', keys.reactAppURL);
    return res.redirect(`${keys.reactAppURL}/home`);
  }
);

router.get("/facebook", passport.authenticate("facebook"));

router.get("/facebook/redirect",
  passport.authenticate("facebook"
  // {
  //   successRedirect: "/",
  //   failureRedirect: "/fail"
  // }
  ),
  (req, res) => {
    console.log('-->', req.user);
    console.log('redirect', keys.reactAppURL);
    return res.redirect(`${keys.reactAppURL}/home`);
  }
);

router.get('/twitter', passport.authenticate('twitter'), (req, res) => {
  console.log('twitter auth');
});
// Api call back function
// TODO verify how does this work with React
// TODO drom the keys.js
router.get('/twitter/redirect',
  passport.authenticate('twitter'),
  // {
  //   successRedirect: 'http://localhost:4000/planningconfig', 
  //   failureRedirect: "http://localhost:4000/"
  // }
  (req, res) => {
    console.log('-->', req.user.email);
    console.log('redirect', keys.reactAppURL);
    return res.redirect(`${keys.reactAppURL}/home`);
  }
);

router.get("/login/success", (req, res, next) => {
  console.log(req.user);
  if (req.user) {
    return res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
  } else {
    return res.status(400).json({
      success: false
    })
  }
});

module.exports = router;
