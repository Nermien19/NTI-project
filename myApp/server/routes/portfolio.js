const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const uploads = multer({ dest: 'uploads/' });
const Portfolio = require('../models/portfolio');

// // Assuming you're in the server folder and want to reference the public folder outside of it
// const publicDirectoryPath = path.join(__dirname, '../public/images');

// // Then use publicDirectoryPath when saving the file
// const filePath = path.join(publicDirectoryPath, req.file.filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../images'));
    
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append the current timestamp to the filename
  }
});

const upload = multer({ storage: storage });
// Get Portfolio
router.get('/', async (req, res) => {
  try {
    const portfolio = await Portfolio.find();
    
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/admin/portfolio/:id', async (req, res) => {
  try {
      const portfolio = await Portfolio.findById(req.params.id);
      if (!portfolio) {
          return res.status(404).send('Portfolio not found');
      }
      
      // Ensure the image field is just the filename, e.g., 'image.jpg'
      portfolio.projects.forEach(project => {
          project.image = project.image && path.basename(project.image);
      });

      res.json(portfolio);
  } catch (error) {
      res.status(500).send('Server error');
  }
});
// Add Portfolio Section
router.post('/:id/project', upload.single('image'), async (req, res) => {
  console.log('File uploaded:', req.file);
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) return res.status(404).send('Portfolio section not found');

    const newProject = {
      name: req.body.name,
      popup: req.body.popup,
      image: req.file ?   req.file.filename : '',
    };

    portfolio.projects.push(newProject);
    await portfolio.save();
    res.send(portfolio);
  } catch (err) {
    console.error('Error while adding project:', err);
    res.status(400).send(err.message);
  }
});

router.post('/:id', async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) return res.status(404).send('Portfolio section not found');

    // portfolio.projects.push(req.body); // Add the new project
    await portfolio.save();
    res.send(portfolio);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
router.put('/:id', async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!portfolio) return res.status(404).send('Portfolio section not found');
    res.send(portfolio);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Update a project in a portfolio section
router.put('/:id/project/:projectId', upload.single('image'), async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) return res.status(404).send('Portfolio section not found');

    const project = portfolio.projects.id(req.params.projectId);
    if (!project) return res.status(404).send('Project not found');

    project.name = req.body.name || project.name;
    project.popup = req.body.popup || project.popup;

    if (req.file) {
      project.image = '/images/' + req.file.filename; // Save the image path relative to the public folder
    }

    await portfolio.save();
    res.send(portfolio);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
// router.put('/:id/project/:projectId', async (req, res) => {
//   try {
//     const portfolio = await Portfolio.findById(req.params.id);
//     if (!portfolio) return res.status(404).send('Portfolio section not found');

//     const project = portfolio.projects.id(req.params.projectId);
//     if (!project) return res.status(404).send('Project not found');

//     project.name = req.body.name || project.name;
//     project.popup = req.body.popup || project.popup;
//     project.image = req.body.image || project.image;

//     await portfolio.save();
//     res.send(portfolio);
//   } catch (err) {
//     res.status(400).send(err.message);
//   }
// });

// Update Portfolio Section
router.patch('/:id', async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });

    portfolio.sectionName = req.body.sectionName || portfolio.sectionName;
    portfolio.image = req.body.image || portfolio.image;
    portfolio.brief = req.body.brief || portfolio.brief;
    portfolio.description = req.body.description || portfolio.description;
    portfolio.projects = req.body.projects || portfolio.projects;

    const updatedPortfolio = await portfolio.save();
    res.json(updatedPortfolio);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete Portfolio Section
// router.delete('/:id', async (req, res) => {
//   try {
//     const portfolio = await Portfolio.findById(req.params.id);
//     if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });

//     await portfolio.remove();
//     res.json({ message: 'Portfolio deleted' });y

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// router.delete('/:id/project/:projectId', async (req, res) => {
//   try {
//     const portfolio = await Portfolio.findById(req.params.id);
//     if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });

//     // Filter out the project to be deleted
//     portfolio.projects = portfolio.projects.filter(project => project._id.toString() !== req.params.projectId);
//     await portfolio.save();
//     res.json(portfolio);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

router.delete('/:portfolioId/project/:projectId', async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.portfolioId);
    if (!portfolio) return res.status(404).send('Portfolio section not found');

    // Filter out the project to be deleted
    portfolio.projects = portfolio.projects.filter(project => project._id.toString() !== req.params.projectId);

    await portfolio.save();
    res.send(portfolio);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


module.exports = router;
