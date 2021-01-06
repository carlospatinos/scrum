/* eslint-disable */
// routes.ts
// Here we define our API endpoints for the corresponding component and assign the controller methods to them. Moreover we can do things like authorization (e.g. JWT), permission validation (e.g. ACL) or add component specific middleware.

const express = require('express');
const router = express.Router();
const passport = require('passport');
const { END_POINTS } = require('scrum-common');
const AuthController = require('./controller');

router.post(END_POINTS.AUTH_LOCAL, AuthController.authUserLocal);
router.get(END_POINTS.GOOGLE_LOGIN, passport.authenticate('google', { scope: ['email', 'profile'] }), AuthController.authUserGoogle);
router.get(`${END_POINTS.GOOGLE_LOGIN}/redirect`, passport.authenticate('google', {
    scope: ['email', 'profile']
}), AuthController.authUserGoogleRedirect);
router.get(END_POINTS.FACEBOOK_LOGIN, passport.authenticate('facebook'));
router.get(`${END_POINTS.FACEBOOK_LOGIN}/redirect`, passport.authenticate(
    'facebook'
  ), AuthController.authUserFacebookRedirect);
router.get(END_POINTS.TWITTER_LOGIN, passport.authenticate('twitter'), AuthController.authUserTwitter);
router.get(`${END_POINTS.TWITTER_LOGIN}/redirect`, passport.authenticate('twitter'), AuthController.authUserTwitterRedirect);
//router.get(END_POINTS.LOGIN_SUCCESS, AuthController.retrieveUserInfo);

module.exports = router;
