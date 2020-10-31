var express = require('express');
var router = express.Router();

const UserType = require("../models/userType.js");

const {ensureAuthenticated} = require("../config/auth.js");

//var SocketSingleton = require('../utils/socket-singleton');

/* GET home page. */
router.get('/static', function (req, res, next) {
  res.render('index', { title: 'Scrum' });
});

router.get('/signin', function (req, res, next) {
  res.render('dashboard', { title: 'Scrum' });
});

router.get('/dashboard', ensureAuthenticated, (req, res, next) => {
  res.render('dashboard', { user: req.user });
});

router.get('/appRunning', function (req, res, next) {
  return res.status(200).json({
    message: "Application is running",
  });
});

router.get('/register', function (req, res, next) {
  UserType.find().exec((err, types) => {
    res.render('register', { userTypes: types });
  });
});

router.get('/expLogin', function (req, res, next) {
  res.render('login', { title: 'Express' });
});


module.exports = router;
