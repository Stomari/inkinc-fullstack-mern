module.exports = (server) => {
  // Socket config
  const io = require('socket.io').listen(server);

  // Other requires
  const mongoose = require('mongoose');
  const Message = require('../models/Message');
  const Chat = require('../models/Chat');
  const User = require('../models/User');

  io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('SEND_MESSAGE', (data) => {
      const newMessage = new Message({
        message: data.message,
        author: data.author,
      });

      newMessage.save()
        .then((msg) => {
          Chat.findByIdAndUpdate(data.chatId, { $push: { historic: msg } })
            .populate('historic')
            .then((historicData) => {
              console.log('Success');
              io.emit('RECEIVE_MESSAGE', data);
            })
            .catch((err) => {
              throw new Error(err);
            });
        })
        .catch(err => console.log(err));

    });

    socket.on('GET_CHAT', ({ user, artist }) => {
      Chat.find({ user: user._id, artist })
        .populate('historic')
        .then((chat) => {
          if (chat.length === 0) {
            console.log('teste')
            const newChat = new Chat({
              user: user._id,
              artist,
            });

            newChat.save()
              .then((response) => {
                User.findByIdAndUpdate(user._id, { $push: { chatHistoric: response } })
                  .then(() => {
                    User.findByIdAndUpdate(artist, { $push: { chatHistoric: response } })
                      .populate({ path: 'invites', populate: { path: 'historic' } })
                      .then((response) => {
                        const chat = response.chatHistoric;
                        io.emit('RETRIEVE_CHAT', chat);
                      })
                      .catch((err) => {
                        throw new Error(err);
                      });
                  })
                  .catch((err) => {
                    throw new Error(err);
                  });
              })
              .catch((err) => {
                throw new Error(err);
              });
          } else {
            io.emit('RETRIEVE_CHAT', chat);
          }
        })
        .catch((err) => {
          throw new Error(err);
        });
    });
  });

}
