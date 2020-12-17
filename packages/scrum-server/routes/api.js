/* eslint-disable */

const express = require('express');
const router = express.Router();
const i18n = require('i18n');

const { auth } = require('../middleware/auth.js');
const User = require('../models/user.js');
const UserType = require('../models/userType');
const PlanningSessionSchema = require('../models/planningSession');

const uuid = require('uuid');

router.get('/', (req, res, next) => {
  res.json({ message: i18n.__('apiWorking') });
});

router.post('/', (req, res, next) => {
  const { email } = req.body;
  res.json({ message: i18n.__('apiWorking') });
});

router.get('/uuid', (req, res, next) => {
  res.json({ uuid: uuid.v1() });
});

router.post('/signup', function (req, res, next) {
  const newUser = new User(req.body);
  const typeForNewUser = new UserType();
  typeForNewUser.type = "admin";
  newUser.userType = typeForNewUser; // TODO fix

  if (newUser.password != newUser.password2) return res.status(400).json({ success: false, message: i18n.__('apiPasswordDoNotMatch') });

  User.findOne({ email: newUser.email }, function (err, user) {
    if (user) return res.status(400).json({ success: false, message: i18n.__('apiEmailExist') });

    newUser.save((err, docUser) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ success: false });
      }
      res.status(200).json({
        success: true,
        user: docUser
      });
    });
  });
});


router.post('/login', (req, res, next) => {
  let token = req.cookies.auth;
  User.findByToken(token, (err, user) => {
    if (err) return res(err);
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
            res.cookie('auth', user.token).json({
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


router.post('/planningsession', function (req, res, next) {
  const newSession = new PlanningSessionSchema(req.body);
  console.log(req.body);
  res.json({ uuid: uuid.v1() });
});

module.exports = router;
