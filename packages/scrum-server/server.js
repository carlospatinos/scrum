const passport = require('passport');
const express = require('express');
const googleStratergy = require('./config/googleStrategy');
const app = express();
//app.use(googleStratergy);
app.use(passport.initialize())
// Api call for google 
app.get('/google/login', passport.authenticate('google', { scope: ['email', 'profile'] }), (req, res) => {});
// Api call back function
app.get('/auth/google/redirect'
    , passport.authenticate('google', { scope: ['email', 'profile'] }),
    (req, res) => {
        return res.send("Congrats");
    });
app.listen(4000, () => console.log('app listening on port 4000!'));