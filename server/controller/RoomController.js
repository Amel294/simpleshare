// RoomController.js

const Rooms = require("../model/Rooms");
const crypto = require('crypto');

exports.createRoom = async (req, res) => {
  try {
    const { roomId, password, isSecured } = req.body;
    console.log(req.body); 
    const existingRoom = await Rooms.findOne({ roomId });
    if (existingRoom) {
      return res.status(400).json({ message: "Room ID already exists. Choose a different one." });
    }

    const roomData = { roomId, isSecured };
    if (isSecured) {
      roomData.password = password; 
    }

    const newRoom = new Rooms(roomData);
    await newRoom.save();

    res.status(200).json({ message: "Room created successfully", roomId ,isSecured});
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ message: "Failed to create room", error });
  }
};

exports.joinRoom = async (req, res) => {
  try {
    const { roomId, password } = req.body;
    console.log(req.body); 

    const existingRoom = await Rooms.findOne({ roomId });
    if (!existingRoom) {
      return res.status(404).json({ message: "Room not found" });
    }

    const secure = !!existingRoom.password;

    if (secure && existingRoom.password !== password) {
      return res.status(403).json({ message: "Incorrect password" });
    }

    res.status(200).json({ message: "Joined room successfully", roomId, secure });
  } catch (error) {
    console.error("Error joining room:", error);
    res.status(500).json({ message: "Failed to join room", error });
  }
};

exports.getRoomPassword = async (req, res) => {
  try {
    const { roomId } = req.params;
    console.log(roomId)
    // Find the room by ID
    const room = await Rooms.findOne({ roomId });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Return the password
    res.status(200).json({ password: room.password });
  } catch (error) {
    console.error("Error retrieving room password:", error);
    res.status(500).json({ message: "Failed to retrieve room password", error });
  }
};

const generateRoomId = () => crypto.randomBytes(3).toString('hex'); // 6 characters
const generatePassword = () => crypto.randomBytes(5).toString('hex'); // 10 characters

exports.generateRoom = async (req, res) => {
  try {
    let roomId;
    let isUnique = false;

    while (!isUnique) {
      roomId = generateRoomId();
      const existingRoom = await Rooms.findOne({ roomId });
      if (!existingRoom) {
        isUnique = true;
      }
    }

    let password = null;
    console.log(req.body);
    console.log(req.body.isSecured ? "Password should be generated" : "Password will not be generated");
    if (req.body.isSecured) {
      password = generatePassword(); 
    }

    const newRoom = new Rooms({
      roomId,
      password,
      isSecured: req.body.isSecured,
    });

    await newRoom.save(); 

    res.status(200).json({ roomId, isSecured: req.body.isSecured });
  } catch (error) {
    console.error("Error generating room ID and password:", error);
    res.status(500).json({ message: "Failed to generate room ID and password", error });
  }
};