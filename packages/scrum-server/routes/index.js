const express = require('express');

const router = express.Router();

const UserType = require('../models/userType.js');

const { ensureAuthenticated } = require('../config/auth.js');

router.get('/appRunning', (req, res, next) =>
  res.status(200).json({
    message: 'Application is running',
  })
);

/* GET home page. */
router.get('/static', (req, res, next) => {
  res.render('index', { title: 'Scrum' });
});

// var SocketSingleton = require('../utils/socket-singleton');



// router.get('/signin', (req, res, next) => {
//   res.render('dashboard', { title: 'Scrum' });
// });

// router.get('/dashboard', ensureAuthenticated, (req, res, next) => {
//   res.render('dashboard', { user: req.user });
// });



// router.get('/register', (req, res, next) => {
//   UserType.find().exec((err, types) => {
//     res.render('register', { userTypes: types });
//   });
// });

// router.get('/expLogin', (req, res, next) => {
//   res.render('login', { title: 'Express' });
// });

module.exports = router;
