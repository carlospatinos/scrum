const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;

// This needs to be longer than the planning Session
const EXPIRE_TIME_AFTER_TWO_WEEKS = 60 * 60 * 24 * 7 * 2; // 1209600

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
  userAdmin: { type: ObjectId, ref: 'User' },
  creationDate: {
    type: Date,
    default: Date.now,
    expires: EXPIRE_TIME_AFTER_TWO_WEEKS,
  },
});

const PlanningSession = mongoose.model('PlanningSession', PlanningSessionSchema);

module.exports = PlanningSession;
