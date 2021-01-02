/* eslint-disable */

const express = require('express');
const { END_POINTS } = require('scrum-common');

const router = express.Router();
const i18n = require('i18n');


router.get(END_POINTS.ROOT, (req, res, next) => {
  res.json({ message: i18n.__('apiWorking') });
});

router.post(END_POINTS.ROOT, (req, res, next) => {
  const { email } = req.body;
  res.json({ message: i18n.__('apiWorking') });
});

module.exports = router;
