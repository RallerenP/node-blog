const socketUrl = window.location.hostname;
const socket = io(`${socketUrl}:3000`, { autoConnect: false });

window.addEventListener('load', () => {
  socket.connect();
});
