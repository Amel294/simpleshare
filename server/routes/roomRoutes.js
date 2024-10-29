const express = require('express');
const { createRoom, joinRoom,getRoomPassword } = require('../controller/RoomController');
const router = express.Router();

router.post("/rooms/create", createRoom);
router.post("/rooms/join", joinRoom);
router.get("/rooms/:roomId/password", getRoomPassword);

module.exports = router;