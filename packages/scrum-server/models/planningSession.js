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
    secure: {
        type: Boolean,
    },
});
const PlanningSession = mongoose.model('PlanningSession', PlanningSessionSchema);

module.exports = PlanningSession;
