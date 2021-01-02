/* eslint-disable */
// routes.ts
// Here we define our API endpoints for the corresponding component and assign the controller methods to them. Moreover we can do things like authorization (e.g. JWT), permission validation (e.g. ACL) or add component specific middleware.

// TODO DELETE
const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const router = express.Router();
const i18n = require('i18n');
const { END_POINTS } = require('scrum-common');
const User = require('./model');
const UserService = require('./service');
const { auth } = require('../../middleware/auth');

// BEGIN - DELETE  TODO  -------------------- --------------------
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

// END - DELETE -------------------- --------------------

// TODO - should be this removed?
router.get(END_POINTS.PROFILE, auth, (req, res) => {
  console.log('logout');
  req.user.deleteToken(req.token, (err, user) => {
    req.logout();
    if (err) return res.status(400).send(err);
    res.sendStatus(200);
  });
});

// TODO - should be this removed?
router.get(END_POINTS.LOGOUT, auth, (req, res, next) => {
  res.json({
    isAuth: true,
    id: req.user._id,
    email: req.user.email,
    name: req.user.firstname + req.user.lastname,
  });
});



router.post(END_POINTS.SIGN_UP, function (req, res, next) {
  UserService.signUp(req, serviceResponse => {
    // TODO remove from serviceResponse any HTTP code
    return res
      .status(serviceResponse.status)
      .json({
        success: serviceResponse.success,
        user: serviceResponse.user,
        message: serviceResponse.message,
      });
  });
});

module.exports = router;
