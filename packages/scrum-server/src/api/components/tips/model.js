const mongoose = require('mongoose');

const TipsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});
const Tips = mongoose.model('Tips', TipsSchema);

module.exports = Tips;
