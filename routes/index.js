var express = require('express');
var router = express.Router();

const UserType = require("../models/userType.js");
//var SocketSingleton = require('../utils/socket-singleton');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Scrum' });
});

router.get('/signin', function (req, res, next) {
  res.render('dashboard', { title: 'Scrum' });
});

router.post('/signin', function (req, res, next) {
  res.render('dashboard', { title: 'Scrum' });
});

router.get('/appRunning', function (req, res, next) {
  return res.status(200).json({
    message: "Application is running",
  });
});

router.get('/register', function (req, res, next) {
  UserType.find().exec((err, types) => {
    console.log(types);
    res.render('register', { userTypes: types });
  });
});

router.get('/login', function (req, res, next) {
  res.render('welcome', { title: 'Express' });
});


module.exports = router;
