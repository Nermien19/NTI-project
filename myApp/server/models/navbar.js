// models/navbar.js
const mongoose = require('mongoose');

const navbarSchema = new mongoose.Schema({
    logo: String,
    cv: String,
    home: String,
    about: String,
    portfolio: String,
    skills: String,
    contact: String
});

module.exports = mongoose.model('Navbar', navbarSchema);
