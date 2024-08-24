// const mongoose = require('mongoose');

// const projectSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   popup: { type: String, required: true },
//   image: { type: String, required: true } // Added project image
// });

// const portfolioSchema = new mongoose.Schema({
//   sectionName: { type: String, required: true },
//   image: { type: String, required: true },
//   brief: { type: String, required: true },
//   description: { type: String, required: true }, // Added section description
//   projects: [projectSchema]
// });

// module.exports = mongoose.model('Portfolio', portfolioSchema);

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  popup: { type: String, required: true },
  image: { type: String, required: true } // Ensure image is required
});

const portfolioSchema = new mongoose.Schema({
  sectionName: { type: String, required: true },
  image: { type: String, required: true },
  brief: { type: String, required: true },
  description: { type: String, required: true }, // Added section description
  projects: [projectSchema]
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
