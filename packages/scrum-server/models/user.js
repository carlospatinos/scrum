/* eslint-disable */
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const salt = 10;
// TODO extract this from env
const SECRET = 'mysecretjwt';

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
    required: true,
    minlength: 8,
  },
  password2: {
    type: String,
    required: true,
    minlength: 8,
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
  twitterId: String,
  googleId: String,
  profileImageUrl: String,
});

// { id: '107784567939805735984',
// @scrum/server:   displayName: 'Carlos ASAP',
// @scrum/server:   image:
// @scrum/server:    'https://lh3.googleusercontent.com/a-/AOh14GggNtU2-CHIiTs1dAVWI-mglFe-QG1huxuVlS2DU_I=s96-c' }

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
    if (err) return cb(next);
    cb(null, isMatch);
  });
};

UserSchema.methods.generateToken = function (cb) {
  const user = this;
  const token = jwt.sign(user._id.toHexString(), SECRET);

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

  jwt.verify(token, SECRET, (err, decode) => {
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

const User = mongoose.model('User', UserSchema);

module.exports = User;
