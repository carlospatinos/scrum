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

UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
}

UserSchema.methods.generateToken = async function () {
  const user = this;
  try {
    const token = jwt.sign(user._id.toHexString(), keys.jwtSecret);
    user.token = token;
    // TODO do we need TTL? If user abruptilibly goes offline? 
    let updatedUser = await user.save();
    return updatedUser;
  } catch (e) {
    throw Error(e);
  }
};

UserSchema.statics.findByToken = async function (token) {
  const user = this;
  let isVerified = undefined;
  try {
    isVerified = await jwt.verify(token, keys.jwtSecret);
    console.log(isVerified);
    if (!isVerified) {
      console.err('jwt not verified');
    }
  } catch (e) {
    console.log(e);
  }

  let userFromDB = await user.findOne({ _id: isVerified, token });
  if (!userFromDB) {
    return undefined;
  }
  return userFromDB;
};

UserSchema.methods.deleteToken = async function (token) {
  const user = this;
  return await user.updateOne({ $unset: { token: 1 } });
};

/**
 * The model for the user object.
 *
 * @namespace User
 */
const User = mongoose.model('User', UserSchema);

module.exports = User;
