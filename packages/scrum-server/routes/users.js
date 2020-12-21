/* eslint-disable */
// TODO DELETE
const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const router = express.Router();
const i18n = require('i18n');

const User = require('../models/user.js');

const { ensureAuthenticated } = require('../config/auth.js');

/* GET users listing. */
router.post('/register', (req, res) => {
  const { name, email, password, password2, type } = req.body;
  console.log(` Name ${name} email :${email}`);
  if (!name || !email || !password || !password2 || !type) {
    req.flash('error_msg', i18n.__('apiFillTheFields'));
  }
  // check if match
  if (password !== password2) {
    req.flash('error_msg', "Passwords don't match");
  }

  // check if password is more than 6 characters
  if (password.length < 6) {
    req.flash('error_msg', i18n.__('apiPasswordMinLength'));
  }

  const messagesToSend = req.flash('error_msg');
  // messages: req.flash()

  if (!messagesToSend || messagesToSend.length > 0) {
    console.log(messagesToSend);
    // res.redirect('/register');
    res.render('register', {
      error_msg: messagesToSend,
      name,
      email,
      password,
      password2,
      type,
    });
  } else {
    // validation passed
    User.findOne({ email }).exec((err, user) => {
      if (user) {
        console.log('USER FOUND');
        req.flash('error_msg', i18n.__('apiEmailAlreadyRegistered'));
        res.render('register', {
          message: req.flash('error_msg'),
          name,
          email,
          password,
          password2,
          type,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
          userType: type,
        });

        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (error, hash) => {
            if (error) {
              console.log('errorrrrr');
              throw error;
            }
            // save pass to hash
            newUser.password = hash;
            // save user
            newUser
              .save()
              .then(value => {
                console.log(value);
                req.flash('success_msg', i18n.__('apiSuccessRegister'));
                res.redirect('/expLogin');
              })
              .catch(value => console.log(value));
          })
        );
      }
    });
  }
});

router.post('/expLogin', (req, res, next) => {
  // TODO checar por que los mensajes no salen
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/expLogin',
    failureFlash: true,
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', i18n.__('apiNowLoggedOut'));
  res.redirect('/');
});

router.get('/online', ensureAuthenticated, (req, res, next) => {
  res.render('online', { user: req.user });
});

module.exports = router;
