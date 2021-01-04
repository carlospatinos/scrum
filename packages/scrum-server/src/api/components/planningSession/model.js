const mongoose = require('mongoose');

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
});
const PlanningSession = mongoose.model('PlanningSession', PlanningSessionSchema);

module.exports = PlanningSession;
