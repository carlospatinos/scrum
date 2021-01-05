/* eslint-disable */
// service.ts
// The service class acts like a wrapper for the database. Here we read and write data to the database. Furthermore, we can implement caching for example.

const i18n = require('i18n');
const User = require('./model');
const UserType = require('./userType');

const isUserAReferral = referredBy => {
  return referredBy !== undefined && referredBy !== '';
};

const signUp = async req => {
  const newUser = new User(req.body);
  const typeForNewUser = new UserType();
  typeForNewUser.type = 'admin';
  newUser.userType = typeForNewUser; // TODO fix

  const { referredBy } = req.body;
  if (isUserAReferral(referredBy)) {
    newUser.wasReferred = true;
    console.log('User was referredBy');
  }

  if (newUser.password != newUser.password2) throw Error(i18n.__('apiPasswordDoNotMatch'));
  try {
    const user = await User.findOne({ email: newUser.email });
    if (user) throw Error(i18n.__('apiEmailExist'));

    const docUser = await newUser.save();
    // TODO propagate SchemaString.SchemaType.doValidate
    if (isUserAReferral(referredBy)) {
      // Async operation
      const referredByUser = User.findOne({ _id: referredBy });
      referredByUser.referralList.push(newUser._id);
      referredByUser.save((err, updatedReferredByUser) => {
        if (err) {
          console.log(err);
        }
      });
    }
    return { user: docUser };
  } catch (e) {
    console.log(e.message);
    throw Error(e.message);
  }
};

const localAuth = async req => {
  const token = req.cookies.auth;

  const loggedUser = await User.findByToken2(token);
  console.log('loggedUser', loggedUser);
  if (loggedUser) {
    throw Error(i18n.__('apiUserAlreadyLoggedIn'));
  }

  try {
    const freshUser = await User.findOne({ email: req.body.email });
    console.log('freshUser', freshUser);
    if (!freshUser) {
      throw Error(i18n.__('apiEmailNotFound'));
    }
    const isMatch = await freshUser.comparePassword2(req.body.password);
    console.log(isMatch);
    if (!isMatch) {
      throw Error(i18n.__('apiPasswordDoNotMatch'));
    }

    const newToken = await freshUser.generateToken2();
    if (!newToken) {
      throw Error('Token was not generated');
    }

    return res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        fullName: `${user.firstName} ${user.lastName}`,
      }
    });
  } catch (e) {
    console.log(e.message);
    throw Error(e.message);
  }
};

module.exports = { signUp, localAuth };
