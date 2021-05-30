const io = require('socket.io')({
  cors: {
    origin: true,
  },
});

const messages = [{
  username: 'TheCoolChatMan',
  message: 'Wow, this is a really cool chat!',
}, {
  username: 'AgreesWithEverything',
  message: 'Ye',
},
];

io.on('connection', (socket) => {
  console.log(`Connected: ${socket.id}`);
  messages.forEach((message) => {
    socket.emit('CHAT_MESSAGE', message);
  });

  socket.on('CHAT_MESSAGE', (message) => {
    // TODO: Verify user identity. Currently we blindly trust the user is who they say they are.
    // TODO: Validate message.
    messages.push(message);
    if (messages.length > 100) {
      messages.splice(0, 1);
    }
    socket.broadcast.emit('CHAT_MESSAGE', message);
  });
});

io.listen(8080);

// Export empty function so this file can be imported and executed.
module.exports = () => {};
