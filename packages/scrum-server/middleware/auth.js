/* eslint-disable */
const User = require('../models/user');

const auth = (req, res, next) => {
  const token = req.cookies.auth;
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({
        authenticated: false,
        message: "user has not been authenticated",
        error: true
      });
    }

    req.token = token;
    req.user = user;
    next();
  });
};

const auth2 = (req, res, next) => {
  console.log(req.user);
    if (!req.user) { // req.isAuthenticated()
      res.status(401).json({
        authenticated: false,
        message: "user has not been authenticated 2"
      });
    } else {
      next();
    }
};

module.exports = { auth, auth2 };
