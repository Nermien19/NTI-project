// // routes/about.js
// const express = require('express');
// const router = express.Router();
// const About = require('../models/About'); // Assuming you move the About model to a separate file

// // POST route for the "About" section
// router.post('/', async (req, res) => {
//     try {
//         const { title, subtitle, description, image } = req.body;

//         const newAbout = new About({
//             title,
//             subtitle,
//             description,
//             image
//         });

//         await newAbout.save();
//         res.status(201).json({ message: 'About section saved successfully', data: newAbout });
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to save the about section', error });
//     }
// });

// module.exports = router;
// server/routes/about.js

// const express = require('express');
// const router = express.Router();
// const About = require('../models/about');

// Get all about sections
// router.get('/', async (req, res) => {
//   try {
//     const aboutSections = await About.find();
//     res.json(aboutSections);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Add new about section
// router.post('/', async (req, res) => {
//   const about = new About({
//     title: req.body.title,
//     subtitle: req.body.subtitle,
//     description: req.body.description,
//     image: req.body.image
//   });

//   try {
//     const newAbout = await about.save();
//     res.status(201).json(newAbout);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });




// const express = require('express');
// const router = express.Router();
// const About = require('../models/about');

// // Create or Update About Section
// router.post('/admin', async (req, res) => {
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
// router.get('/about', async (req, res) => {
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
const About = require('../models/about');

// Create or Update About Section
router.post('/', async (req, res) => { // Change from '/about' to '/'
  try {
    let about = await About.findOne();
    if (about) {
      // Update existing entry
      about = await About.findByIdAndUpdate(about._id, req.body, { new: true });
      res.status(200).json(about);
    } else {
      // Create new entry
      about = new About(req.body);
      await about.save();
      res.status(201).json(about);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get About Section
router.get('/', async (req, res) => { // Change from '/about' to '/'
  try {
    const about = await About.find();
    res.status(200).json(about);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update about section
router.put('/:id', async (req, res) => {
  try {
    const about = await About.findById(req.params.id);
    if (!about) return res.status(404).json({ message: 'About section not found' });

    about.title = req.body.title;
    about.subtitle = req.body.subtitle;
    about.description = req.body.description;
    about.image = req.body.image;

    const updatedAbout = await about.save();
    res.json(updatedAbout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete about section
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
