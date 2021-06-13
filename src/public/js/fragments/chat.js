socket.on('connect', () => {
  fetch('/api/auth/me')
    .then((response) => {
      return response.json();
    })
    .then((me) => {
      $('#chatBtn').attr('disabled', false);
      $('#chatBtn').on('click', send);
      $('#chatInput').on('keydown', (e) => {
        if (e.key === 'Enter') {
          send();
        }
      });

      socket.on('disconnect', () => {
        $('#chatBtn').attr('disabled', true);
        $('#chatBtn').off('click', send);
      });

      function send() {
        const message = $('#chatInput').val();

        render({
          username: me.email,
          message
        });

        socket.emit('CHAT_MESSAGE', {
          username: me.email,
          message
        });

        $('#chatInput').val('');
      }
    });

  socket.on('CHAT_MESSAGE', (message) => {
    render(message);
  });

  function render(message) {
    const name = $('<b></b>').text(message.username + ': ');
    const content = $('<span></span>').text(message.message);
    const html = $('<div class=""></div>').append(name, content);

    $('.chatbox').append(html);
  }
});
