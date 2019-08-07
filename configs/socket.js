module.exports = (server) => {
  // Socket config
  const io = require('socket.io').listen(server);

  io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('SUBSCRIBE', (room) => {
      socket.join(room, (err) => {
        if (err) console.log(err);
      });
    });

    socket.on('SEND_MESSAGE', (data) => {
      socket.broadcast.to(data.room).emit('RECEIVE_MESSAGE', {
        message: data.message,
        author: data.author,
      });
    });
    
    socket.on('DISCONNECT', () => {
      console.log('Client disconnected');
      io.emit('client disconnected');
    });
  });
};
