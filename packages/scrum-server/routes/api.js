/* eslint-disable */

const express = require('express');
const { END_POINTS } = require('scrum-common');

const router = express.Router();
const i18n = require('i18n');

const { auth } = require('../src/api/middleware/auth');

router.get(END_POINTS.ROOT, (req, res, next) => {
  res.json({ message: i18n.__('apiWorking') });
});

router.post(END_POINTS.ROOT, (req, res, next) => {
  const { email } = req.body;
  res.json({ message: i18n.__('apiWorking') });
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

module.exports = router;
