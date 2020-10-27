var express = require('express');
var router = express.Router();

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

module.exports = router;
