const keys = require('../config/keys');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

module.exports = function (passport) {
    function extractProfile(profile) {
        if (profile && profile._json) {
            return {
                googleId: profile._json.id_str,
                firstName: profile._json.given_name,
                lastName: profile._json.family_name,
                email: profile._json.email,
                profileImageUrl: profile._json.picture
            }
        } else {
            return {
                googleId: 'profile._json.id_str',
                firstName: 'profile._json.given_name',
                lastName: 'profile._json.family_name',
                email: 'profile._json.email',
                profileImageUrl: 'profile._json.picture'
            };
        }
        
    }
    passport.use(new GoogleStrategy({
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: keys.google.callback,
        accessType: 'offline',
        userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
    }, (accessToken, refreshToken, profile, doneCallBack) => {
        User.findOne({ googleId: profile._json.sub }, function (err, currentUser) {
            if (!currentUser) {
                console.log('user not found in db');
                new User({
                    googleId: profile._json.sub,
                    firstName: profile._json.given_name,
                    lastName: profile._json.family_name,
                    email: profile._json.email,
                    profileImageUrl: profile._json.picture
                }).save((err, docUser) => {
                    if (err) {
                        console.log(err);
                        doneCallBack(null, extractProfile(profile));
                    }
                    doneCallBack(null, docUser);
                });
            } else {
                console.log('user found in db');
                doneCallBack(null, currentUser);
            }
        });
        //doneCallBack(null, extractProfile(profile));
    }));
    // passport.serializeUser((user, doneCallBack) => {
    //     doneCallBack(null, user);
    // });
    // passport.deserializeUser((obj, doneCallBack) => {
    //     doneCallBack(null, obj);
    // });
}

