const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // Servir archivos estáticos desde la carpeta 'public'

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('gyroscopeData', (data) => {
    console.log('Gyroscope data received: ', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
