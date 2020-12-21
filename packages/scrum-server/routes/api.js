/* eslint-disable */

const express = require('express');
const router = express.Router();
const i18n = require('i18n');

const { auth } = require('../middleware/auth.js');
const User = require('../models/user.js');
const UserType = require('../models/userType');
const PlanningSessionSchema = require('../models/planningSession');

const uuid = require('uuid');
const ObjectId = require('mongoose').Types.ObjectId;


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



router.get('/profile', auth, (req, res, next) => {
  res.json({
    isAuth: true,
    id: req.user._id,
    email: req.user.email,
    name: req.user.firstname + req.user.lastname,
  });
});

router.get('/logout', auth, (req, res) => {
  console.log('logout');
  req.user.deleteToken(req.token, (err, user) => {
    req.logout();
    if (err) return res.status(400).send(err);
    res.sendStatus(200);
  });
});


router.post('/planningsession', function (req, res, next) {
  const newSession = new PlanningSessionSchema(req.body);

  newSession.save((err, docSession) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ success: false });
    }
    res.status(200).json({
      success: true,
      uuid: uuid.v1(),
      session: docSession
    });
  });
});

router.get('/planningsession/:id', function (req, res, next) {
  const sessionId = req.params.id;
  // TODO this never happens for the redirect
  if (!sessionId || !ObjectId.isValid(sessionId)) {
    console.log("invalid session id");
    return res.status(400).json({ success: false });
  }

  PlanningSessionSchema.findOne({ _id: sessionId }, function (err, session) {
    if (err) {
      console.log(err);
      return res.status(400).json({ success: false });
    }
    res.status(200).json({
      success: true,
      sessionInformation: session
    });
  });
});


module.exports = router;
