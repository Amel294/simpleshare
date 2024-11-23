// socket.js
const { Server } = require('socket.io');
const http = require('http');
require('dotenv').config({ path: '.env.local' });

const createSocketServer = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.SOCKET_CORS_ORIGIN || '*', // Use the origin from the .env file
    },
    transports: ['websocket']
  });

  io.on('connection', (socket) => {

    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
    });

    // Broadcast new messages to the room
    socket.on('message', ({ roomId, message, sender }) => {
      io.to(roomId).emit('message', { message, sender });
    });

    socket.on('disconnect', () => {
    });
  });

  return io; // Return the io instance for further use if needed
};

module.exports = createSocketServer;
