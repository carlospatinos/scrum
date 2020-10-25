var express = require('express');
var router = express.Router();

var SocketSingleton = require('../utils/socket-singleton');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Scrum' });
});

router.get('/signin', function (req, res, next) {
  res.render('welcome', { title: 'Scrum' });
});

module.exports = router;
