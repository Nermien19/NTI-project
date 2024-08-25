const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Skills = require('../models/skills');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../images'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Get Skills Section
router.get('/', async (req, res) => {
  try {
    const skills = await Skills.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add Skill to Skills Section
router.post('/:id/skill', upload.single('image'), async (req, res) => {
  try {
    const skillsSection = await Skills.findById(req.params.id);
    if (!skillsSection) return res.status(404).send('Skills section not found');

    const newSkill = {
      name: req.body.name,
      description: req.body.description,
      image: req.file ? req.file.filename : '',
    };

    skillsSection.skills.push(newSkill);
    await skillsSection.save();
    res.send(skillsSection);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const newSkillsSection = new Skills({
      sectionName: req.body.sectionName,
      description: req.body.description,
      brief: req.body.brief,
      skills: []  // Start with an empty skills array
    });

    await newSkillsSection.save();
    res.status(201).json(newSkillsSection);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.put('/:id', async (req, res) => {
  try {
    const skills = await Skills.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!skills) return res.status(404).send('skills section not found');
    res.send(skills);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
router.put('/skills/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const updateData = req.body;

      // Update the skill section in the database
      const updatedSkillSection = await Skill.findByIdAndUpdate(id, updateData, { new: true });

      if (!updatedSkillSection) {
          return res.status(404).send('Skill section not found');
      }

      res.status(200).json(updatedSkillSection);
  } catch (error) {
      console.error('Error updating skill section:', error);
      res.status(500).send('Server error');
  }
});

// Update Skill in Skills Section
router.put('/:id/skill/:skillId', upload.single('image'), async (req, res) => {
  try {
    const skillsSection = await Skills.findById(req.params.id);
    if (!skillsSection) return res.status(404).send('Skills section not found');

    const skill = skillsSection.skills.id(req.params.skillId);
    if (!skill) return res.status(404).send('Skill not found');

    skill.name = req.body.name || skill.name;
    skill.description = req.body.description || skill.description;

    if (req.file) {
      skill.image = req.file.filename;
    }

    await skillsSection.save();
    res.send(skillsSection);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Delete Skill from Skills Section
router.delete('/:skillSectionId/skill/:skillId', async (req, res) => {
  try {
    const skillsSection = await Skills.findById(req.params.skillSectionId);
    if (!skillsSection) return res.status(404).send('Skills section not found');

    skillsSection.skills = skillsSection.skills.filter(skill => skill._id.toString() !== req.params.skillId);

    await skillsSection.save();
    res.send(skillsSection);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
