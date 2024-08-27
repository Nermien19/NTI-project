// models/home.js
const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
  greetings: { type: String, required: true },
  name: { type: String, required: true },
  jobTitle: { type: String, required: true },
  nationality: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: false }
});

module.exports = mongoose.model('Home', homeSchema);
