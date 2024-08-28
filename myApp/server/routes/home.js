const express = require('express');
const router = express.Router();
const Home = require('../models/home');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../images'));

  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append the current timestamp to the filename
  }
});
const upload = multer({ storage: storage });


router.get('/', async (req, res) => {
  try {
    const home = await Home.find();
    res.status(200).json(home);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/:id', upload.single('image'), async (req, res) => {
  try {
    let home = await Home.findOne();
    if (home) {
      home.greetings = req.body.greetings;
      home.name = req.body.name;
      home.jobTitle = req.body.jobTitle;
      home.nationality = req.body.nationality;
      home.description = req.body.description;
      if (req.file) home.image =  req.file.filename;
      home = await Home.findByIdAndUpdate(home._id, home, { new: true });
      res.status(200).json(home);
    } else {
      const newHome = new Home({
        greetings: req.body.greetings,
        name: req.body.name,
        jobTitle: req.body.jobTitle,
        nationality: req.body.nationality,
        description: req.body.description,
        image: req.file ?  req.file.filename : null
      });
      await newHome.save();
      res.status(201).json(newHome);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const home = await Home.findById(req.params.id);
    if (!home) return res.status(404).json({ message: 'Home section not found' });

    home.greetings = req.body.greetings;
    home.name = req.body.name;
    home.jobTitle = req.body.jobTitle;
    home.nationality = req.body.nationality;
    home.description = req.body.description;
    if (req.file) home.image =  req.file.filename;

    const updatedHome = await home.save();
    res.json(updatedHome);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


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

