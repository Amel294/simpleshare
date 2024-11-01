// socket.js
const { Server } = require('socket.io');
const http = require('http');
require('dotenv').config({ path: '.env.local' });

const createSocketServer = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.SOCKET_CORS_ORIGIN || '*', // Use the origin from the .env file
    },
  });

  io.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user connected`);

    // Join a specific room based on `roomId`
    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);
    });

    // Broadcast new messages to the room
    socket.on('message', ({ roomId, message, sender }) => {
      io.to(roomId).emit('message', { message, sender });
    });

    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
    });
  });

  return io; // Return the io instance for further use if needed
};

module.exports = createSocketServer;
