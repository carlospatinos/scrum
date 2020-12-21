const express = require('express');
const router = express.Router();

router.get('/appRunning', (req, res, next) =>
  res.status(200).json({
    message: 'Application is running',
  })
);

module.exports = router;
