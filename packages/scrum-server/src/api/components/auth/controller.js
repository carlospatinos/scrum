// The controller class handles incoming requests, validates them and sends the response data back to the client. It uses the service class to interact with the database.

const UserService = require('../user/service');
const keys = require('../../../config/keys');

const authUserLocal = async (req, res) => {
  try {
    const serviceResponse = await UserService.localAuth(req);
    return res.status(200).json({
      success: true,
      data: serviceResponse.data,
    });
  } catch (e) {
    return res.status(400).json({ success: false, message: e.message });
  }
};

const authUserGoogle = async (req, res) => {
  console.log('google auth');
};

const authUserGoogleRedirect = async (req, res) => {
  req.session.save(function (err) {
    if (err) {
      console.log(err);
    }
    res.redirect(`${keys.reactAppURL}/oauthvalidation`);
  });
};

const authUserTwitter = async (req, res) => {
  console.log('twitter auth');
};

const authUserTwitterRedirect = async (req, res) => {
  req.session.save(function (err) {
    if (err) {
      console.log(err);
    }
    res.redirect(`${keys.reactAppURL}/oauthvalidation`);
  });
};

const authUserFacebook = async (req, res) => {
  console.log('facebook auth');
};

const authUserFacebookRedirect = async (req, res) => {
  req.session.save(function (err) {
    if (err) {
      console.log(err);
    }
    res.redirect(`${keys.reactAppURL}/oauthvalidation`);
  });
};

const authLoginSucess = async (req, res) => {
  const { user } = req;
  const copy = user.toJSON();
  // eslint-disable-next-line no-underscore-dangle
  copy.id = copy._id;
  if (user) {
    return res.status(200).json({
      success: true,
      data: {
        isAuth: true,
        user: copy,
        login_access_token: req.cookies.auth,
      },
    });
  }
  return res.status(400).json({
    success: false,
    message: 'user not authenticated',
  });
};

module.exports = {
  authUserLocal,
  authLoginSucess,
  authUserGoogle,
  authUserGoogleRedirect,
  authUserTwitter,
  authUserTwitterRedirect,
  authUserFacebook,
  authUserFacebookRedirect,
};
