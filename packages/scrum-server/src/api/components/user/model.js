/* eslint-disable */
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const keys = require('../../../config/keys');
const ObjectId = require('mongoose').Types.ObjectId;
const salt = 10;
// TODO fix password was mandatory but with google/twitter oauth either we create 2 different collections or we find a way to persist all in the same

const validatePassword = (data) => {
  if (data.length >= 8) {
    return true; //validation success
  }
  else {
    return false; // validation failure
  }
}

/**
 * User Schema
 *
 * @namespace User
 */
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 100,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    required: false,
    validate: {
      validator: validatePassword,
      message: "Length mismatch. Password lenght must be >=8"
    }
  },
  password2: {
    type: String,
    required: false,
    validate: {
      validator: validatePassword,
      message: "Length mismatch. Password lenght must be >=8"
    }
  },
  token: {
    type: String,
  },
  userType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserType',
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  twitterId: {
    type: String,
    required: false
  },
  googleId: {
    type: String,
    required: false
  },
  profileImageUrl: {
    type: String,
    required: false
  },
  wasReferred: {
    type: Boolean,
    required: true, 
    default: false
  },
  referralList: [{ type: ObjectId, ref: 'User' }],
});

UserSchema.pre('save', function (next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(salt, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        user.password2 = hash; // TODO remove
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

UserSchema.methods.generateToken = function (cb) {
  const user = this;
  const token = jwt.sign(user._id.toHexString(), keys.jwtSecret);

  user.token = token;
  // TODO FIX ======>>>
  user.save((err, user) => {
    console.log('save');
    if (err) return cb(err);
    cb(null, user);
  });
  // cb(null, user); // TODO remove when token is saved (code above)
};

UserSchema.statics.findByToken = function (token, cb) {
  const user = this;

  jwt.verify(token, keys.jwtSecret, (err, decode) => {
    user.findOne({ _id: decode, token }, (err, user) => {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

UserSchema.methods.deleteToken = function (token, cb) {
  const user = this;

  user.update({ $unset: { token: 1 } }, (err, user) => {
    if (err) return cb(err);
    cb(null, user);
  });
  // cb(null, user); // TODO remove when token is saved (code above)
};

/**
 * The model for the user object.
 *
 * @namespace User
 */
const User = mongoose.model('User', UserSchema);

module.exports = User;
