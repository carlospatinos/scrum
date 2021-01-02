/* eslint-disable */
// routes.ts
// Here we define our API endpoints for the corresponding component and assign the controller methods to them. Moreover we can do things like authorization (e.g. JWT), permission validation (e.g. ACL) or add component specific middleware.

const express = require('express');
const router = express.Router();
const { END_POINTS } = require('scrum-common');
const PlanningSessionService = require('./service');

router.post(END_POINTS.PLANNING_SESSION, (req, res, next) => {
  PlanningSessionService.save(req, serviceResponse => {
    return res.status(serviceResponse.status).json({
      success: serviceResponse.success,
      // TODO HERE IT IS CALLED session, in other api is sessionInformation, and the model PlanningSession
      session: serviceResponse.session,
      planningRoomId: serviceResponse.planningRoomId,
    });
  });
});

router.get(`${END_POINTS.PLANNING_SESSION}/:id`, function (req, res, next) {
  PlanningSessionService.find(req, serviceResponse => {
    return res.status(serviceResponse.status).json({
      success: serviceResponse.success,
      sessionInformation: serviceResponse.sessionInformation,
    });
  });
});


module.exports = router;
