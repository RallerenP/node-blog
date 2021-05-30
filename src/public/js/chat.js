window.addEventListener('load', () => {
  const url = window.location.hostname;

  const socket = io(`${url}:8080`, { autoConnect: false });
  socket.connect();
});
