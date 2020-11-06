const express = require('express');

const router = express.Router();

router.get('/appRunning', (req, res, next) =>
  res.status(200).json({
    message: 'Application is running',
  })
);

/* GET home page. */
router.get('/static', (req, res, next) => {
  res.render('index', { title: 'Scrum' });
});

module.exports = router;
