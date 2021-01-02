/* eslint-disable */
// routes.ts
// Here we define our API endpoints for the corresponding component and assign the controller methods to them. Moreover we can do things like authorization (e.g. JWT), permission validation (e.g. ACL) or add component specific middleware.

// TODO DELETE
const express = require('express');
const router = express.Router();
const { END_POINTS } = require('scrum-common');
const TipsService = require('./service');

router.get(`${END_POINTS.TIPS_FOR_THE_SESSION}`, (req, res, next) => {
  TipsService.find(req, serviceResponse => {
    return res.status(serviceResponse.status).json({
      success: serviceResponse.success,
      tips: serviceResponse.tips,
      message: serviceResponse.message,
    });
  });
});

module.exports = router;
