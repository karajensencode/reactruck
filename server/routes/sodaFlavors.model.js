const express = require('express');
const router = express.Router();
const Flavor = require('../models/SodaFlavor.model');

router.post('/', async (req, res) => {
  try {
    const newFlavor = new Flavor(req.body);
    const savedFlavor = await newFlavor.save();
    res.status(201).json(savedFlavor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const flavors = await Flavor.find();
    res.json(flavors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add more routes for PUT, DELETE, etc.

module.exports = router;