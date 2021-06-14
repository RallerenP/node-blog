const socketUrl = window.location.hostname;
const socket = io(socketUrl, { autoConnect: false });

window.addEventListener('load', () => {
  socket.connect();
});
