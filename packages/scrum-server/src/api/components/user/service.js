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

const signUp = (req, cb) => {
  const newUser = new User(req.body);
  const typeForNewUser = new UserType();
  typeForNewUser.type = 'admin';
  newUser.userType = typeForNewUser; // TODO fix

  const { referredBy } = req.body;
  if (isUserAReferral(referredBy)) {
    newUser.wasReferred = true;
    console.log('User was referredBy');
  }

  if (newUser.password != newUser.password2)
    return cb({ status: 400, success: false, message: i18n.__('apiPasswordDoNotMatch') });

  User.findOne({ email: newUser.email }, function (err, user) {
    if (user) {
      return cb({ status: 400, success: false, message: i18n.__('apiEmailExist') });
    } else {
      newUser.save((err, docUser) => {
        // TODO propagate SchemaString.SchemaType.doValidate
        if (err) {
          console.log(err);
          return cb({ status: 400, success: false });
        } else {
          if (isUserAReferral(referredBy)) {
            // Async operation
            User.findOne({ _id: referredBy }, function (err, referredByUser) {
              referredByUser.referralList.push(newUser._id);
              referredByUser.save((err, updatedReferredByUser) => {
                if (err) {
                  console.log(err);
                }
              });
            });
          }
          return cb({ status: 200, success: true, user: docUser });
        }
      });
    }
  });
};

module.exports = { signUp };
