const express = require('express');
const { createRoom } = require('../controller/RoomController');
const router = express.Router();

router.post("/rooms", createRoom);

module.exports = router;