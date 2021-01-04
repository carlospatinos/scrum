/* eslint-disable */
// service.ts
// The service class acts like a wrapper for the database. Here we read and write data to the database. Furthermore, we can implement caching for example.

const express = require('express');
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

module.exports = { signUp };
