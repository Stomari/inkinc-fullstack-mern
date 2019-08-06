module.exports = (server) => {
  // Socket config
  const io = require('socket.io').listen(server);

  // Other requires
  console.log('test heroku')



  
  io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('SEND_MESSAGE', (message) => {
      io.emit('RECEIVE_MESSAGE', message);
    });

    // socket.on('SEND_MESSAGE', (data) => {
    //   const newMessage = new Message({
    //     message: data.message,
    //     author: data.author,
    //   });

    //   newMessage.save()
    //     .then((msg) => {
    //       Chat.findByIdAndUpdate(data.chatId, { $push: { historic: msg } })
    //         .populate('historic')
    //         .then((historicData) => {
    //           console.log('Success');
    //           socket.to(data.chatId).emit('RECEIVE_MESSAGE', data);
    //         })
    //         .catch((err) => {
    //           throw new Error(err);
    //         });
    //     })
    //     .catch(err => console.log(err));

    // });

    // socket.on('SUBSCRIBE', ({ user, artist }) => {
    //   Chat.find({ user, artist })
    //     .populate('historic')
    //     .then((chat) => {
    //       if (chat.length === 0) {
    //         const newChat = new Chat({
    //           user,
    //           artist,
    //         });

    //         newChat.save()
    //           .then((createdChat) => {
    //             User.findByIdAndUpdate(user, { $push: { chatHistoric: createdChat } })
    //               .then(() => {
    //                 User.findByIdAndUpdate(artist, { $push: { chatHistoric: createdChat } })
    //                   .populate({ path: 'chatHistoric', populate: { path: 'historic' } })
    //                   .then(() => {
    //                     console.log(createdChat);
    //                     const room = createdChat.chatHistoric;
    //                     socket.join(room._id);
    //                     io.emit('RETRIEVE_CHAT', room);
    //                   })
    //                   .catch((err) => {
    //                     throw new Error(err);
    //                   });
    //               })
    //               .catch((err) => {
    //                 throw new Error(err);
    //               });
    //           })
    //           .catch((err) => {
    //             throw new Error(err);
    //           });
    //       } else {
    //         socket.join(chat[0]._id);
    //         io.emit('RETRIEVE_CHAT', chat);
    //         console.log('AQUI', chat[0]._id)
    //       }
    //     })
    //     .catch((err) => {
    //       throw new Error(err);
    //     });
    // });

    // socket.on('GET_CHAT', ({ user, artist }) => {
    //   Chat.find({ user: user._id, artist })
    //     .populate('historic')
    //     .then((chat) => {
    //       if (chat.length === 0) {
    //         const newChat = new Chat({
    //           user: user._id,
    //           artist,
    //         });

    //         newChat.save()
    //           .then((createdChat) => {
    //             User.findByIdAndUpdate(user._id, { $push: { chatHistoric: createdChat } })
    //               .then(() => {
    //                 User.findByIdAndUpdate(artist, { $push: { chatHistoric: createdChat } })
    //                   .populate({ path: 'chatHistoric', populate: { path: 'historic' } })
    //                   .then(() => {
    //                     console.log(createdChat);
    //                     const room = createdChat.chatHistoric;
    //                     io.emit('RETRIEVE_CHAT', room);
    //                   })
    //                   .catch((err) => {
    //                     throw new Error(err);
    //                   });
    //               })
    //               .catch((err) => {
    //                 throw new Error(err);
    //               });
    //           })
    //           .catch((err) => {
    //             throw new Error(err);
    //           });
    //       } else {
    //         io.emit('RETRIEVE_CHAT', chat);
    //       }
    //     })
    //     .catch((err) => {
    //       throw new Error(err);
    //     });
    // });
  });

}
