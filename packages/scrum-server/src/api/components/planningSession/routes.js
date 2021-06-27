/* eslint-disable */
// routes.ts
// Here we define our API endpoints for the corresponding component and assign the controller methods to them. Moreover we can do things like authorization (e.g. JWT), permission validation (e.g. ACL) or add component specific middleware.

const express = require('express');
const router = express.Router();
const { END_POINTS } = require('scrum-common');
const PlanningSessionController = require('./controller');

router.post(END_POINTS.PLANNING_SESSION, PlanningSessionController.planningSessionSave);
router.get(`${END_POINTS.PLANNING_SESSION}/:id`, PlanningSessionController.planningSessionFindById);
router.delete(`${END_POINTS.PLANNING_SESSION}/:id`, PlanningSessionController.planningSessionDelete);
router.delete(`${END_POINTS.PLANNING_SESSIONS}/:adminId`, PlanningSessionController.planningSessionDeleteAllByAdminId);
router.get(`${END_POINTS.PLANNING_SESSION}/findByAdmin/:adminId`, PlanningSessionController.planningSessionFindByAdmin);

module.exports = router;
