/* eslint-disable */
const User = require('../../api/components/user/model');
const auth = async (req, res, next) => {
  try {
    const token = req.cookies.auth;
    console.log('token2', token);
    const user = await User.findByToken(token);
    if (!user) {
      return res.json({
        authenticated: false,
        message: "user has not been authenticated",
        error: true
      });
    }
    console.log("user found");
    req.token = token;
    req.user = user;
    next();
  } catch (e){
    next(e);
  }
};

const auth2 = (req, res, next) => {
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
