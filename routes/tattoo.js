const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Tattoo = require('../models/Tattoo');
const Category = require('../models/Category');

router.get('/categories', (req, res) => {
  Category.find()
    .then(category => res.json(category))
    .catch(err => res.json(err));
});

router.get('/tattoo', (req, res) => {
  Tattoo.find()
    .populate('artist')
    .then(artists => res.json(artists))
    .catch(err => res.json(err));
});

router.get('/tattoo/:id', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Tattoo.findById(req.params.id)
    .populate('artist')
    .then(artist => res.status(200).json(artist))
    .catch(err => res.json(err));
});

module.exports = router;
