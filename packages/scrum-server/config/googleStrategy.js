const keys = require('../keys');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = function (passport) {
    function extractProfile(profile) {
        let imageUrl = '';
        if (profile.photos && profile.photos.length) {
            imageUrl = profile.photos[0].value;
        }
        console.log(profile.displayName);
        return {
            id: profile.id,
            displayName: profile.displayName,
            image: imageUrl,
        };
    }
    passport.use(new GoogleStrategy({
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: keys.google.callback,
        accessType: 'offline',
        userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
    }, (accessToken, refreshToken, profile, doneCallBack) => {
        console.log("access token: ", accessToken);
        doneCallBack(null, extractProfile(profile));
    }));
    // passport.serializeUser((user, doneCallBack) => {
    //     doneCallBack(null, user);
    // });
    // passport.deserializeUser((obj, doneCallBack) => {
    //     doneCallBack(null, obj);
    // });
}

