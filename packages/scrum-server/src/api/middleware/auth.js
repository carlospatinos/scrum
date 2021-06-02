/* eslint-disable */
const User = require('../../api/components/user/model');
const { Logger } = require('../../utils/Logger');

const logger = Logger(__filename);
const auth = async (req, res, next) => {
  try {
    const token = req.cookies.auth;
    logger.debug(`token2 ${token}`);
    const user = await User.findByToken(token);
    if (!user) {
      return res.json({
        authenticated: false,
        message: "user has not been authenticated",
        error: true
      });
    }
    logger.debug("user found");
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
