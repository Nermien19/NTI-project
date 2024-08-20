const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle:{ type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
});

module.exports = mongoose.model('About', AboutSchema);
