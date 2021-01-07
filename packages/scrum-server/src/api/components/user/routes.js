/* eslint-disable */
// routes.ts
// Here we define our API endpoints for the corresponding component and assign the controller methods to them. Moreover we can do things like authorization (e.g. JWT), permission validation (e.g. ACL) or add component specific middleware.

// TODO DELETE
const express = require('express');
const router = express.Router();
const { END_POINTS } = require('scrum-common');
const UserController = require('./controller');

const { auth } = require('../../middleware/auth');

router.get(END_POINTS.LOGOUT, auth, UserController.logout);

router.post(END_POINTS.SIGN_UP, UserController.signUp);

module.exports = router;
