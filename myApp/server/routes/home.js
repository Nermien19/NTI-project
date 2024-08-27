// // routes/home.js
// const express = require('express');
// const router = express.Router();
// const Home = require('../models/home');

// // Get Home Section
// router.get('/', async (req, res) => {
//   try {
//     const home = await Home.find();
//     res.status(200).json(home);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Create or Update Home Section
// router.post('/', async (req, res) => {
//   try {
//     let home = await Home.findOne();
//     if (home) {
//       home = await Home.findByIdAndUpdate(home._id, req.body, { new: true });
//       res.status(200).json(home);
//     } else {
//       home = new Home(req.body);
//       await home.save();
//       res.status(201).json(home);
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Update Home Section
// router.put('/:id', async (req, res) => {
//   try {
//     const home = await Home.findById(req.params.id);
//     if (!home) return res.status(404).json({ message: 'Home section not found' });

//     home.greetings = req.body.greetings;
//     home.name = req.body.name;
//     home.jobTitle = req.body.jobTitle;
//     home.nationality = req.body.nationality;
//     home.description = req.body.description;

//     const updatedHome = await home.save();
//     res.json(updatedHome);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Delete Home Section
// router.delete('/:id', async (req, res) => {
//   try {
//     const home = await Home.findById(req.params.id);
//     if (!home) return res.status(404).json({ message: 'Home section not found' });

//     await home.remove();
//     res.json({ message: 'Deleted Home section' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const Home = require('../models/home');
const multer = require('multer');
const path = require('path');

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../images'));

  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append the current timestamp to the filename
  }
});
const upload = multer({ storage: storage });

// Get Home Section
router.get('/', async (req, res) => {
  try {
    const home = await Home.find();
    res.status(200).json(home);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create or Update Home Section with Image
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

// Update Home Section with Image
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

