const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');

const router = express.Router();
const User = require('../models/User');
const Tattoo = require('../models/Tattoo');


router.get('/artists', (req, res) => {
  User.find({ role: 'Artist' })
    .populate('artistTattoo')
    .then(artists => res.json(artists))
    .catch(err => res.json(err));
});

router.get('/artists/:id', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  User.findById(req.params.id)
    .populate('artistTattoo', 'wrokplace')
    .then(artist => res.status(200).json(artist))
    .catch(err => res.json(err));
});

// router.delete('/artists/:id/add-tattoo', (req, res) => {
//   let { tag, image, category, artist } = req.body;
//   tag = tag.split(',');

//   const newTattoo = new Tattoo({
//     tag,
//     image,
//     category,
//     artist,
//   });

//   newTattoo.save()
//     .then((response) => {
//       User.findOneAndUpdate({ _id: req.params.id }, { $push: { artistTattoo: response } })
//         .populate('artistTattoo')
//         .then((response) => {
//           res.status(200).json(response)
//         })
//         .catch(err => res.json(err));
//     })
//     .catch(err => res.json(err));
// });

router.post('/artists/:id/add-tattoo', (req, res) => {
  let { tag, image, category, artist } = req.body;
  category = category.split(', ');
  tag = tag.split(',');

  const newTattoo = new Tattoo({
    tag,
    image,
    category,
    artist,
  });

  newTattoo.save()
    .then((response) => {
      User.findOneAndUpdate({ _id: req.params.id }, { $push: { artistTattoo: response } })
        .populate('artistTattoo')
        .then((response) => {
          res.status(200).json(response)
        })
        .catch(err => res.json(err));
    })
    .catch(err => res.json(err));
});


module.exports = router;
