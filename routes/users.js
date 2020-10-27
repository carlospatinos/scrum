var express = require('express');
var bcrypt = require('bcrypt');
const passport = require('passport');
var router = express.Router();

const User = require("../models/user.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', (req, res) => {
  console.log(req.body);
  const { name, email, password, password2, type } = req.body;
  console.log(' Name ' + name + ' email :' + email);
  if (!name || !email || !password || !password2 || !type) {
    req.flash('error_msg', 'Please fill in all fields!');
  }
  //check if match
  if (password !== password2) {
    req.flash('error_msg', 'Passwords don\'t match');
  }

  //check if password is more than 6 characters
  if (password.length < 6) {
    req.flash('error_msg', 'Password atleast 6 characters');
  }

  let messagesToSend = req.flash('error_msg');
  // messages: req.flash()

  if (!messagesToSend || messagesToSend.length > 0) {
    console.log(messagesToSend);
    res.redirect('/register');
    // res.render('/register', {
    //   message: messagesToSend,
    //   name: name,
    //   email: email,
    //   password: password,
    //   password2: password2,
    //   type: type
    // });
  } else {
    //validation passed
    User.findOne({ email: email }).exec((err, user) => {
      if (user) {
        console.log("USER FOUND");
        req.flash('error_msg', 'Email already registered');
        res.render('publicRegister', {
          message: req.flash('error_msg'),
          name: name,
          email: email,
          password: password,
          password2: password2,
          type: type
        });
      } else {
        const newUser = new User({
          name: name,
          email: email,
          password: password,
          userType: type
        });

        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt,
            (err, hash) => {
              if (err) {
                console.log("errorrrrr");
                throw err;
              }
              //save pass to hash
              newUser.password = hash;
              //save user
              newUser.save()
                .then((value) => {
                  console.log(value);
                  req.flash('success_msg', 'You have now registered!');
                  res.redirect('/login');
                })
                .catch(value => console.log(value));

            }));
      }
    });
  }
});

router.post('/login', (req, res, next) => {
  // TODO checar por que los mensajes no salen 
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true,
  })(req, res, next);
});

module.exports = router;
