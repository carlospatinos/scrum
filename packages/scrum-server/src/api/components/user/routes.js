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
const UserController = require('./controller');

const { auth } = require('../../middleware/auth');

router.get(END_POINTS.LOGOUT, auth, (req, res) => {
  req.user.deleteToken(req.token, (err, user) => {
    req.logout();
    if (err) return res.status(400).send(err);
    res.sendStatus(200);
  });
});

// TODO - should be this removed?
router.get(END_POINTS.PROFILE, auth, (req, res, next) => {
  res.json({
    isAuth: true,
    id: req.user._id,
    email: req.user.email,
    name: req.user.firstname + req.user.lastname,
  });
});

router.post(END_POINTS.SIGN_UP, UserController.signUp);

module.exports = router;
