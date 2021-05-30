let socket;

window.addEventListener('load', () => {
  const url = window.location.hostname;

  socket = io(`${url}:8080`, { autoConnect: false });
  socket.connect();
});
