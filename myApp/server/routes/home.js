// routes/home.js
const express = require('express');
const router = express.Router();
const Home = require('../models/home');

// Get Home Section
router.get('/', async (req, res) => {
  try {
    const home = await Home.find();
    res.status(200).json(home);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create or Update Home Section
router.post('/', async (req, res) => {
  try {
    let home = await Home.findOne();
    if (home) {
      home = await Home.findByIdAndUpdate(home._id, req.body, { new: true });
      res.status(200).json(home);
    } else {
      home = new Home(req.body);
      await home.save();
      res.status(201).json(home);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Home Section
router.put('/:id', async (req, res) => {
  try {
    const home = await Home.findById(req.params.id);
    if (!home) return res.status(404).json({ message: 'Home section not found' });

    home.greetings = req.body.greetings;
    home.name = req.body.name;
    home.jobTitle = req.body.jobTitle;
    home.nationality = req.body.nationality;
    home.description = req.body.description;

    const updatedHome = await home.save();
    res.json(updatedHome);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete Home Section
router.delete('/:id', async (req, res) => {
  try {
    const home = await Home.findById(req.params.id);
    if (!home) return res.status(404).json({ message: 'Home section not found' });

    await home.remove();
    res.json({ message: 'Deleted Home section' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
