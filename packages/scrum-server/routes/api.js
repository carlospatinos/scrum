/* eslint-disable */

const express = require('express');
const { END_POINTS } = require('scrum-common');

const router = express.Router();
const i18n = require('i18n');

const { auth } = require('../src/api/middleware/auth'); 
const PlanningSession = require('../models/planningSession');
const Tips = require('../models/tips');
const UserService = require('../src/api/components/user/service');

const ObjectId = require('mongoose').Types.ObjectId;

router.get(END_POINTS.ROOT, (req, res, next) => {
  res.json({ message: i18n.__('apiWorking') });
});

router.post(END_POINTS.ROOT, (req, res, next) => {
  const { email } = req.body;
  res.json({ message: i18n.__('apiWorking') });
});

router.post(END_POINTS.SIGN_UP, function (req, res, next) { 
  const serviceResponse = UserService.signUp(req);
  // TODO remove from serviceResponse any HTTP code
  return  res.status(response.status).json({ ...serviceResponse });
  });


router.get(END_POINTS.LOGOUT, auth, (req, res, next) => {
  console.log('profile');
  res.json({
    isAuth: true,
    id: req.user._id,
    email: req.user.email,
    name: req.user.firstname + req.user.lastname,
  });
});

router.get(END_POINTS.PROFILE, auth, (req, res) => {
  console.log('logout');
  req.user.deleteToken(req.token, (err, user) => {
    req.logout();
    if (err) return res.status(400).send(err);
    res.sendStatus(200);
  });
});


router.post(END_POINTS.PLANNING_SESSION, function (req, res, next) {
  const newSession = new PlanningSession(req.body);
  newSession.save((err, docSession) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ success: false });
    }
    res.status(200).json({
      success: true,
      session: docSession,
      planningRoomId: docSession._id
    });
  });
});

router.get(`${END_POINTS.PLANNING_SESSION}/:id`, function (req, res, next) {
  const planningRoomId = req.params.id;
  if (!planningRoomId || !ObjectId.isValid(planningRoomId)) {
    console.log("invalid session id");
    return res.status(400).json({ success: false, message: 'invalid session id' });
  }
  PlanningSession.findOne({ _id: planningRoomId }, function (err, session) {
    if (err || !session) {
      console.log(err);
      return res.status(400).json({ success: false });
    } else {
      return res.status(200).json({
        success: true,
        sessionInformation: session
      });
    }
  });
});

const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 50;
router.get(`${END_POINTS.TIPS_FOR_THE_SESSION}`, (req, res, next) => {
  let pageSize = req.params.pageSize || DEFAULT_PAGE_SIZE;
  if (pageSize > MAX_PAGE_SIZE) {
    console.log(`invalid pageSize using MAX_PAGE_SIZE as ${MAX_PAGE_SIZE}`);
    pageSize = MAX_PAGE_SIZE;
  }

  Tips.find().limit(pageSize).exec(function (err, tipDocs) {
    // console.log(tipDocs);
    if (err) {
      console.log(err);
      return res.status(400).json({ success: false, message: "tips not found" });
    } else {
      return res.status(200).json({
        success: true,
        tips: tipDocs
      })
    }
  });
}
);

module.exports = router;
