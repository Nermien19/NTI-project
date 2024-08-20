// models/about.js
const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    description: String,
    image: String,
});

module.exports = mongoose.model('About', aboutSchema);
