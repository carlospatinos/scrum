/* eslint-disable */
// routes.ts
// Here we define our API endpoints for the corresponding component and assign the controller methods to them. Moreover we can do things like authorization (e.g. JWT), permission validation (e.g. ACL) or add component specific middleware.

const express = require('express');
const router = express.Router();
const { END_POINTS } = require('scrum-common');
const PlanningSessionController = require('./controller');

router.post(END_POINTS.PLANNING_SESSION, PlanningSessionController.planningSessionSave);
router.get(`${END_POINTS.PLANNING_SESSION}/:id`, PlanningSessionController.planningSessionFind);

module.exports = router;
