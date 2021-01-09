const mongoose = require('mongoose');

const UserStorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  choosedEstimatedValue: {
    type: String,
  },
  minEstimatedValue: {
    type: String,
  },
  maxEstimatedValue: {
    type: String,
  },
  // TODO possibly add jira id, github id, etc
  creationDate: {
    type: Date,
    default: Date.now,
  },
});
const UserStory = mongoose.model('UserStory', UserStorySchema);

module.exports = UserStory;
