const express = require('express');
const { createRoom, joinRoom,getRoomPassword, generateRoom } = require('../controller/RoomController');
const generateRoomLimiter = require('../middleware/rateLimiter');
const router = express.Router();

router.post("/rooms/create", createRoom);
router.post("/rooms/createrandom",generateRoomLimiter, generateRoom);
router.post("/rooms/join", joinRoom);
router.get("/rooms/:roomId/password", getRoomPassword);

module.exports = router;