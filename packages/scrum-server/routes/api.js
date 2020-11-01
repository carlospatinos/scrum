/* eslint-disable */

const express = require('express');

const router = express.Router();

const { auth } = require('../middleware/auth.js');
const User = require('../models/user.js');
const UserType = require('../models/userType');

router.get('/', (req, res, next) => {
  res.json({ message: 'API is working properly' });
});

router.post('/', (req, res, next) => {
  console.log(req.body);
  const { email } = req.body;
  // const { password } = req.body;
  console.log(email);
  res.json({ message: 'API is working properly' });
});

router.post('/signup', (req, res, next) => {
  const newUser = new User(req.body);
  const typeForNewUser = new UserType();
  typeForNewUser.type = 'admin';
  newUser.userType = typeForNewUser; // TODO fix

  console.log(`newUser: ${newUser}`);

  if (newUser.password != newUser.password2)
    return res.status(400).json({ message: 'password not match' });

  User.findOne({ email: newUser.email }, (err, user) => {
    if (user) return res.status(400).json({ auth: false, message: 'email exits' });

    newUser.save((err, docUser) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ success: false });
      }
      res.status(200).json({
        succes: true,
        user: docUser,
      });
    });
  });
});

router.post('/login', (req, res, next) => {
  // res.json({
  //     anObject: { item1: "item1val", item2: "item2val" },
  //     anArray: ["item1", "item2"],
  //     another: "item"
  // });
  const token = req.cookies.auth;
  User.findByToken(token, (err, user) => {
    if (err) return res(err);
    if (user) {
      return res.status(400).json({
        error: true,
        message: 'You are already logged in',
      });
    }
    User.findOne({ email: req.body.email }, (err, user) => {
      if (!user) return res.json({ isAuth: false, message: ' Auth failed ,email not found' });

      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) return res.json({ isAuth: false, message: "password doesn't match" });

        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
          res.cookie('auth', user.token).json({
            isAuth: true,
            id: user._id,
            email: user.email,
          });
        });
      });
    });
  });
});

router.get('/profile', auth, (req, res, next) => {
  res.json({
    isAuth: true,
    id: req.user._id,
    email: req.user.email,
    name: req.user.firstname + req.user.lastname,
  });
});

router.get('/logout', auth, (req, res) => {
  req.user.deleteToken(req.token, (err, user) => {
    if (err) return res.status(400).send(err);
    res.sendStatus(200);
  });
});

module.exports = router;
