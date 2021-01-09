/* eslint-disable */
// routes.ts
// Here we define our API endpoints for the corresponding component and assign the controller methods to them. Moreover we can do things like authorization (e.g. JWT), permission validation (e.g. ACL) or add component specific middleware.

const express = require('express');
const router = express.Router();
const { END_POINTS } = require('scrum-common');
const UserStoryController = require('./controller');

router.post(END_POINTS.USER_STORY, UserStoryController.userStoryServiceSave);
router.get(`${END_POINTS.USER_STORY}/:id`, UserStoryController.userStoryServiceFind);

module.exports = router;
