// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./db'); 
require('dotenv').config({ path: '.env.local' });

const serverPort = process.env.SERVER_PORT || 3000;
const clientPort = process.env.CLIENT_PORT || 5173;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: `http://localhost:${clientPort}`,
  },
});

// Connect to MongoDB
connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const rooms = {}; // Store room codes and their passwords

io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});

server.listen(serverPort, () => {
  console.log(`Socket.io server running on port ${serverPort}`);
});
