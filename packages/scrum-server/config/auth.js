/* eslint-disable */
module.exports = { 
  ensureAuthenticated(req, res, next) {
    console.log(req.user);
    if (!req.user) { // req.isAuthenticated()
      res.status(401).json({
        authenticated: false,
        message: "user has not been authenticated"
      });
    } else {
      next();
    }
  },
};
