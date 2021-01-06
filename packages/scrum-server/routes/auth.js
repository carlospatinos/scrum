/* eslint-disable */
// TODO fix eslint
const express = require('express');
const { END_POINTS } = require('scrum-common');
const router = express.Router();

// TODO difference with profile?
router.get(END_POINTS.LOGIN_SUCCESS, (req, res, next) => {
  if (req.user) {
    return res.json({
      isAuth: true,
      success: true,
      user: req.user,
      login_access_token: 'sadadasdas', // TODO fix this
    });
  }
  return res.status(400).json({
    success: false,
    message: 'user not authenticated',
  });
});

module.exports = router;
