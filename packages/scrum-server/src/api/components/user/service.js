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
  console.log('Inside passport.authenticate() callback');
  const token = req.cookies.auth;
  try {
    const loggedUser = await User.findByToken(token);
    if (loggedUser) {
      throw Error(i18n.__('apiUserAlreadyLoggedIn'));
    }

    const freshUser = await User.findOne({ email: req.body.email });
    if (!freshUser){
      throw Error(i18n.__('apiEmailNotFound'));
    }
    //const isMatch = await freshUser.comparePassword(req.body.password);
    // if (!isMatch) {
    //   throw Error(i18n.__('apiPasswordDoNotMatch'));
    // }

    // const newToken = await freshUser.generateToken();
    // if (!newToken) {
    //   throw Error('Token was not generated');
    // }

    // return res.status(200).json({
          //   user: {
          //     id: user._id,
          //     email: user.email,
          //     fullName: `${user.firstName} ${user.lastName}`,
          //   }
          // });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) throw Error(i18n.__('apiPasswordDoNotMatch'));

      user.generateToken((err, user) => {
        if (err) {throw Error('Token was not generated')};

        req.login(user, function (err) {
          if (err) {
            throw Error('Token was not generated');
          }
          return {
            isAuth: true,
            login_access_token: user.token,
            user: {
              id: user._id,
              email: user.email,
              fullName: `${user.firstName} ${user.lastName}`,
            },
          };
          
        });
      });
    });
    return {
      isAuth: true,
      login_access_token: newToken,
      user: {
        id: freshUser._id,
        email: freshUser.email,
        fullName: `${freshUser.firstName} ${freshUser.lastName}`,
      },
    };
  } catch (e) {
    console.log(e.message);
    throw Error(e.message);
  }
};

module.exports = { signUp, localAuth };
