// index.js
const express = require('express');
const http = require('http');
const connectDB = require('./db');
const roomRoutes = require('./routes/roomRoutes'); // Import the room routes
require('dotenv').config({ path: '.env.local' });
const cors = require('cors');
const createSocketServer = require('./socket'); // Import the socket server setup

const serverPort = process.env.SERVER_PORT || 3000;
const clientPort = process.env.CLIENT_PORT || 5173;
const clientUrl = process.env.CLIENT_URL;

const app = express();
app.use(cors({
  origin: '*', // For testing, allow all origins
}));

const server = http.createServer(app);
const io = createSocketServer(server); // Create the Socket.io server

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Parse JSON data

// Routes
app.use('/api', roomRoutes); // Use the room routes

app.get('/', (req, res) => {
  res.send('Hello World!');
});

server.listen(serverPort, () => {
  console.log(`Server running on port ${serverPort}`);
});
