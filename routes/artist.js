const express = require('express');
const mongoose = require('mongoose');
const uploader = require('../configs/cloudinary-setup');

const router = express.Router();
const User = require('../models/User');
const Tattoo = require('../models/Tattoo');
const Flash = require('../models/Flash');

// All artists
router.get('/artists', (req, res) => {
  User.find({ role: 'Artist' })
    .populate('artistTattoo')
    .then(artists => res.json(artists))
    .catch(err => res.json(err));
});

// Specific Artist finder
router.get('/artists/:id', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  User.findById(req.params.id)
    .populate('artistTattoo flash')
    .then(artist => res.status(200).json(artist))
    .catch(err => res.json(err));
});

// Edit current logged artist profile
router.put('/edit-artist', (req, res) => {
  const { name, category, workplace, image, about } = req.body;
  console.log(req.body);
  User.findByIdAndUpdate(req.user.id, { $set: { name, category, workplace, profileImg: image, about } })
    .then((artist) => {
      console.log('updated');
      res.status(200).json(artist)
    })
    .catch(err => res.json(err));
});

// Add Tattoo to artist
router.post('/add-tattoo', (req, res, next) => {

  let { tag, image, category } = req.body;

  tag = tag.split(', ');

  const newTattoo = new Tattoo({
    tag,
    image,
    category,
    artist: req.user.id,
  });


  newTattoo.save()
    .then((response) => {
      User.findOneAndUpdate({ _id: req.user.id }, { $push: { artistTattoo: response } })
        .populate('artistTattoo')
        .then((user) => {
          res.status(200).json(user);
        })
        .catch(err => res.json(err));
    })
    .catch(err => res.json(err));
});


// Remove Artist Tattoo
router.put('/remove-tattoo/:tattooId', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.tattooId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  User.findByIdAndUpdate(req.user.id, { $pull: { artistTattoo: req.params.tattooId } })
    .then(() => {
      Tattoo.findByIdAndDelete(req.params.tattooId)
        .then((response) => {
          res.status(200).json(response);
        })
        .catch(err => res.json(err));
    })
    .catch(err => res.json(err));
});

// Add flash tattoo
router.post('/add-flash', (req, res, next) => {
  // if (!req.file) {
  //   next(new Error('No file uploaded!'));
  //   return;
  // }

  let { tag, category, image, price } = req.body;

  // category = category.split(', ');
  tag = tag.split(', ');

  const newFlash = new Flash({
    tag,
    image,
    category,
    artist: req.user.id,
    price,
  });


  newFlash.save()
    .then((response) => {
      User.findOneAndUpdate({ _id: req.user.id }, { $push: { flash: response } })
        .populate('flash')
        .then((user) => {
          res.status(200).json(user);
        })
        .catch(err => res.json(err));
    })
    .catch(err => res.json(err));
});

router.post('/upload', uploader.single('image'), (req, res, next) => {
  // console.log('file is: ', req.file)
  console.log(req.file.secure_url);
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  res.json({ secure_url: req.file.secure_url });
});

// Remove Flash
router.put('/remove-flash/:flashId', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.flashId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  User.findByIdAndUpdate(req.user.id, { $pull: { flash: req.params.flashId } })
    .then(() => {
      Flash.findByIdAndDelete(req.params.flashId)
        .then((response) => {
          res.status(200).json(response);
        })
        .catch(err => res.json(err));
    })
    .catch(err => res.json(err));
});

module.exports = router;
