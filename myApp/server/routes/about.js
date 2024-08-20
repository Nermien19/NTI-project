const express = require('express');
const router = express.Router();
const About = require('../models/About');


router.get('/', async (req, res) => {
  try {
    const about = await About.find();
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const updatedAbout = await About.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedAbout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.post('/', async (req, res) => {
    try {
        const { content } = req.body;

        // Check if the "About" section content exists
        let aboutSection = await About.findOne();

        if (aboutSection) {
            // Update the existing content
            aboutSection.content = content;
        } else {
            // Create a new "About" section content
            aboutSection = new About({ content });
        }

        // Save to the database
        await aboutSection.save();

        res.status(200).json({ message: 'About section updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update About section', error });
    }
});
module.exports = router;
