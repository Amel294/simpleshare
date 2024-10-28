const express = require('express');
const { createRoom, joinRoom } = require('../controller/RoomController');
const router = express.Router();

router.post("/rooms/create", createRoom);
router.post("/rooms/join", joinRoom);

module.exports = router;