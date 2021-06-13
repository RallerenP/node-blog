const messages = [{
  username: 'TheCoolChatMan',
  message: 'Wow, this is a really cool chat!',
}, {
  username: 'AgreesWithEverything',
  message: 'Ye',
},
];


// Export empty function so this file can be imported and executed.
module.exports = (serv) => {
  // eslint-disable-next-line global-require
  const io = require('socket.io')(serv);

  io.on('connection', (socket) => {
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
};
