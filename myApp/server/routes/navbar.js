// routes/navbar.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Navbar = require('../models/navbar');

// Set up multer for image and file storage
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const ext = path.extname(file.originalname).toLowerCase();
//         const isImage = ext === '.png' || ext === '.jpg' || ext === '.jpeg';
//         cb(null, isImage ? '../images' : '../cv');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });
const createDirectory = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Define storage for logo images
const logoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
      const logoDir = path.join(__dirname, '../images');
      createDirectory(logoDir);
      cb(null, logoDir);
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Append the current timestamp to the filename
  }
});

// Define storage for CV files
const cvStorage = multer.diskStorage({
  destination: (req, file, cb) => {
      const cvDir = path.join(__dirname, '../cv');
      createDirectory(cvDir);
      cb(null, cvDir);
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Append the current timestamp to the filename
  }
});

// Set up multer middleware with conditional storage
const upload = multer({
  storage: multer.diskStorage({
      destination: (req, file, cb) => {
          if (file.fieldname === 'logo') {
              cb(null, path.join(__dirname, '../images'));
          } else if (file.fieldname === 'cv') {
              cb(null, path.join(__dirname, '../cv'));
          }
      },
      filename: (req, file, cb) => {
          cb(null, Date.now() + path.extname(file.originalname));
      }
  })
});


// router.get('/navbar', async (req, res) => {
//   try {
//       const navbar = await Navbar.findOne(); // Fetching the first document

//       // if (!navbar) {
//       //     return res.status(404).json({ message: 'Navbar data not found' });
//       // }

//       res.status(200).json(navbar);
//   } catch (err) {
//       res.status(500).json({ message: err.message });
//   }
// });

router.get('/', async (req, res) => {
  try {
    const navbar = await Navbar.find();
    res.status(200).json(navbar);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create or Update Navbar
router.post('/', upload.fields([{ name: 'logo' }, { name: 'cv' }]), async (req, res) => {
  try {
      let navbar = await Navbar.findOne();

      const logoPath = req.files.logo ? `${req.files.logo[0].filename}` : navbar?.logo;
      const cvPath = req.files.cv ? `${req.files.cv[0].filename}` : navbar?.cv;

      if (navbar) {
          // Update existing entry
          navbar = await Navbar.findByIdAndUpdate(navbar._id, {
              ...req.body,
              logo: logoPath,
              cv: cvPath
          }, { new: true });
      } else {
          // Create new entry
          navbar = new Navbar({
              ...req.body,
              logo: logoPath,
              cv: cvPath
          });
          await navbar.save();
      }

      res.status(200).json(navbar);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

module.exports = router;
