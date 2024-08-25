const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
});

const skillsSectionSchema = new mongoose.Schema({
  sectionName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  brief: {
    type: String,
  },
  skills: [skillSchema],
});

module.exports = mongoose.model('SkillsSection', skillsSectionSchema);
