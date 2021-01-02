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
});
const Tips = mongoose.model('Tips', TipsSchema);

module.exports = Tips;
