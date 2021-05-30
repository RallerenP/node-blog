const url = window.location.hostname;

const socket = io(`${url}:8080`, { autoConnect: false });

window.addEventListener('load', () => {
  socket.connect();
});
