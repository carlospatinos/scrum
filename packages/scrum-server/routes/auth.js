const express = require('express');
const passport = require('passport');
const User = require('../models/user.js');
const router = express.Router();

router.post('/local', (req, res, next) => {
  let token = req.cookies.auth;
  User.findByToken(token, (err, user) => {
    if (err) {
      console.log(err);
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
              id: user._id,
              email: user.email,
              ACCESS_TOKEN: user.token
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
    console.log(req.user);
    return res.redirect("http://localhost:4000/planningconfig");

  }
);

module.exports = router;
