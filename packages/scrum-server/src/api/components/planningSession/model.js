const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;

const PlanningSessionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  cardDeck: {
    type: String,
    required: true,
  },
  userStoriesCreationMethod: {
    type: String,
    required: true,
  },
  allowUnauthenticated: {
    type: Boolean,
  },
  userStoryList: [{ type: ObjectId, ref: 'UserStory' }],
  creationDate: {
    type: Date,
    default: Date.now,
  },
});
const PlanningSession = mongoose.model('PlanningSession', PlanningSessionSchema);

module.exports = PlanningSession;
