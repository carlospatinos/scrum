/* eslint-disable */
// service.ts
// The service class acts like a wrapper for the database. Here we read and write data to the database. Furthermore, we can implement caching for example.

const i18n = require('i18n');
const User = require('./model');
const UserType = require('./userType');

const isUserAReferral = referredBy => {
  return referredBy !== undefined && referredBy !== '';
};

const signUp = async jsonData => {
  const newUser = new User(jsonData);
  const typeForNewUser = new UserType();
  typeForNewUser.type = 'admin';
  newUser.userType = typeForNewUser; // TODO fix

  const { referredBy } = jsonData;
  if (isUserAReferral(referredBy)) {
    newUser.wasReferred = true;
    console.log('User was referredBy', referredBy);
  }

  if (newUser.password != newUser.confirmPassword) throw Error(i18n.__('apiPasswordDoNotMatch'));
  try {
    const user = await User.findOne({ email: newUser.email }).exec();
    if (user) throw Error(i18n.__('apiEmailExist'));

    const docUser = await newUser.save();
    // TODO propagate SchemaString.SchemaType.doValidate
    if (isUserAReferral(referredBy)) {
      // Async operation
      const referredByUser = await User.findOne({ _id: referredBy }).exec();
      referredByUser.referralList.push(newUser._id);
      const updatedReferredByUser = await referredByUser.save();
      if (!updatedReferredByUser) {
        console.log(err);
      }
    }
    return { user: docUser };
  } catch (e) {
    console.log(e.message);
    throw Error(e.message);
  }
};

// TODO remove the req 
const localAuth = async req => {
  const token = req.cookies.auth;
  const loggedUser = await User.findByToken(token);
  if (loggedUser) {
    throw Error(i18n.__('apiUserAlreadyLoggedIn'));
  }

  try {
    const freshUser = await User.findOne({ email: req.body.email });
    if (!freshUser) {
      throw Error(i18n.__('apiEmailNotFound'));
    }
    const isMatch = await freshUser.comparePassword(req.body.password);
    if (!isMatch) {
      throw Error(i18n.__('apiPasswordDoNotMatch'));
    }

    const updatedUser = await freshUser.generateToken();
    const realUserObj = updatedUser.toJSON();
    delete realUserObj.confirmPassword;
    delete realUserObj.password;
    console.log('realUserObj', realUserObj);
    // TODO return full user without pass
    // return {
    //   data: {
    //     login_access_token: updatedUser.token,
    //     user: {
    //       id: updatedUser._id,
    //       email: updatedUser.email,
    //       firstName: updatedUser.firstName,
    //       lastName: updatedUser.lastName,
    //       fullName: `${updatedUser.firstName} ${updatedUser.lastName}`,
    //     }
    //   }
    // };
    return {
      data: {
        other: 'yayayay',
        login_access_token: realUserObj.token,
        user: realUserObj
      }
    };
  } catch (e) {
    console.log(e.message);
    throw Error(e.message);
  }
};
const deleteProfileById = async userId => {
  try {
    const user = await User.findOneAndDelete({ _id: userId });
    return user;
  } catch (e) {
    console.log(e.message);
    throw Error(e.message);
  }
};

module.exports = { signUp, localAuth, deleteProfileById };
