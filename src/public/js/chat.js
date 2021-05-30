const socketUrl = window.location.hostname;
const socket = io(`${socketUrl}:8080`, { autoConnect: false });

window.addEventListener('load', () => {
  socket.connect();
});
