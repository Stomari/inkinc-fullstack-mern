const express = require('express');

const router = express.Router();
const User = require('../models/User');
const Tattoo = require('../models/Tattoo');
const Folder = require('../models/Folder');

// Find logged user
router.get('/user', (req, res) => {
  User.findById(req.user.id)
    .populate('folder')
    // .populate({ path: 'folder', populate: { path: 'image', model: 'Tattoo' } })
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

// Create empty folder
router.post('/create-folder', (req, res) => {
  const { name } = req.body;
  const newFolder = new Folder({
    name,
  });

  newFolder.save()
    .then(() => {
      User.findByIdAndUpdate(req.user.id, { $push: { folder: newFolder } })
        .then(response => res.status(200).json(response))
        .catch(err => res.status(400).json(err));
    })
    .catch(err => res.status(400).json(err));

});

// Add tattoo to designated folder
router.post('/add-tattoo', (req, res) => {
  const { tattooId, folderId } = req.body;
  Tattoo.findById(tattooId)
    .then((tattoo) => {
      Folder.findOneAndUpdate({ _id: folderId }, { $push: { image: tattoo } })
        .then(response => res.status(200).json(response))
        .catch(err => res.status(400).json(err));
    })
    .catch(err => res.status(400).json(err));
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
