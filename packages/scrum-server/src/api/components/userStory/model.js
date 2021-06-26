const mongoose = require('mongoose');

// This needs to be shorter than the planning Session
const EXPIRE_TIME_AFTER_ONE_WEEK = 60 * 60 * 24 * 7 * 1; // 604800

const UserStorySchema = new mongoose.Schema({
  planningSessionId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  chosenEstimatedValue: {
    type: String,
    required: true,
  },
  minEstimatedValue: {
    type: String,
    required: true,
  },
  maxEstimatedValue: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
    expires: EXPIRE_TIME_AFTER_ONE_WEEK,
  },
});
const UserStory = mongoose.model('UserStory', UserStorySchema);

module.exports = UserStory;
