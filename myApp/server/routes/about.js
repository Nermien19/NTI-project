// const express = require('express');
// const router = express.Router();
// const About = require('../models/About');

// // Create or Update About Section
// router.post('/', async (req, res) => { // Change from '/about' to '/'
//   try {
//     let about = await About.findOne();
//     if (about) {
//       // Update existing entry
//       about = await About.findByIdAndUpdate(about._id, req.body, { new: true });
//       res.status(200).json(about);
//     } else {
//       // Create new entry
//       about = new About(req.body);
//       await about.save();
//       res.status(201).json(about);
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Get About Section
// router.get('/', async (req, res) => { // Change from '/about' to '/'
//   try {
//     const about = await About.find();
//     res.status(200).json(about);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Update about section
// router.put('/:id', async (req, res) => {
//   try {
//     const about = await About.findById(req.params.id);
//     if (!about) return res.status(404).json({ message: 'About section not found' });

//     about.title = req.body.title;
//     about.subtitle = req.body.subtitle;
//     about.description = req.body.description;
//     about.image = req.body.image;

//     const updatedAbout = await about.save();
//     res.json(updatedAbout);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Delete about section
// router.delete('/:id', async (req, res) => {
//   try {
//     const about = await About.findById(req.params.id);
//     if (!about) return res.status(404).json({ message: 'About section not found' });

//     await about.remove();
//     res.json({ message: 'Deleted About section' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const About = require('../models/About');
const multer = require('multer');
const path = require('path');

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../images'));

  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append the current timestamp to the filename
  }
});
const upload = multer({ storage: storage });
router.get('/', async (req, res) => { // Change from '/about' to '/'
  try {
    const about = await About.find();
    res.status(200).json(about);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Create or Update About Section
router.post('/', upload.single('image'), async (req, res) => {
  try {
    let about = await About.findOne();
    if (about) {
      // Update existing entry
      if (req.file) {
        about.image = req.file.filename;
      }
      about.title = req.body.title;
      about.subtitle = req.body.subtitle;
      about.description = req.body.description;
      await about.save();
      res.status(200).json(about);
    } else {
      // Create new entry
      about = new About({
        title: req.body.title,
        subtitle: req.body.subtitle,
        description: req.body.description,
        image: req.file ? req.file.filename : ''
      });
      await about.save();
      res.status(201).json(about);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update About Section
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const about = await About.findById(req.params.id);
    if (!about) return res.status(404).json({ message: 'About section not found' });

    if (req.file) {
      about.image = req.file.filename;
    }
    about.title = req.body.title;
    about.subtitle = req.body.subtitle;
    about.description = req.body.description;

    const updatedAbout = await about.save();
    res.json(updatedAbout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const about = await About.findById(req.params.id);
    if (!about) return res.status(404).json({ message: 'About section not found' });

    await about.remove();
    res.json({ message: 'Deleted About section' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
 module.exports = router;
