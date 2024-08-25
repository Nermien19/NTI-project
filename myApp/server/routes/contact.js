const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// Get Contact section
router.get('/', async (req, res) => {
    try {
        const contact = await Contact.findOne();
        res.json(contact);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update Contact section
router.put('/', async (req, res) => {
    try {
        let contact = await Contact.findOne();
        if (!contact) {
            contact = new Contact();
        }
        contact.title = req.body.title;
        contact.subtitle = req.body.subtitle;

        const updatedContact = await contact.save();
        res.json(updatedContact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Add Email (for form submission)
router.post('/emails', async (req, res) => {
    try {
        const contact = await Contact.findOne();
        if (!contact) {
            return res.status(404).json({ message: "Contact section not found" });
        }
        contact.emails.push({ email: req.body.email });
        await contact.save();
        res.status(201).json({ message: "Email received" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete Email
router.delete('/emails/:id', async (req, res) => {
    try {
        const contact = await Contact.findOne();
        if (!contact) {
            return res.status(404).json({ message: "Contact section not found" });
        }
        contact.emails = contact.emails.filter(email => email._id.toString() !== req.params.id);
        await contact.save();
        res.json({ message: "Email deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
