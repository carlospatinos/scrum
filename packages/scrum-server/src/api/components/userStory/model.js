const mongoose = require('mongoose');

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
  choosedEstimatedValue: {
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
  },
});
const UserStory = mongoose.model('UserStory', UserStorySchema);

module.exports = UserStory;
