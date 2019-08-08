const express = require('express');

const router = express.Router();
const User = require('../models/User');
const Chat = require('../models/Chat');

router.get('/has-chat/:artistId', (req, res) => {
  Chat.find({ user: req.user._id, artist: req.params.artistId })
    .then((chat) => {
      res.json(chat);
    })
    .catch((err) => {
      throw new Error(err);
    });
});

router.get('/has-chat-artist/:userId', (req, res) => {
  Chat.find({ user: req.params.userId, artist: req.user._id })
    .then((chat) => {
      res.json(chat);
    })
    .catch((err) => {
      throw new Error(err);
    });
});

router.get('/create-chat/:artistId', (req, res) => {
  const newChat = new Chat({
    user: req.user._id,
    artist: req.params.artistId,
  });

  newChat.save()
    .then((chat) => {
      res.json(chat);
      User.updateMany({ _id: [req.user._id, req.params.artistId] }, { $push: { chatHistoric: chat } })
        .then(response => console.log(response))
        .catch((err) => {
          throw new Error(err);
        });
    })
    .catch(err => res.json(err));
});

router.put('/add-message/:chatId', (req, res) => {
  Chat.findByIdAndUpdate(req.params.chatId, { $push: { historic: [{ author: req.body.author, message: req.body.message }] } })
    .then((response) => {
      res.json(response)
    })
    .catch((err) => {
      throw new Error(err);
    });
});

module.exports = router;
