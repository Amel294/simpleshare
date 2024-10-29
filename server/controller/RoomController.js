// RoomController.js

const Rooms = require("../model/Rooms");

exports.createRoom = async (req, res) => {
  try {
    const { roomId, password,isSecured } = req.body;
    console.log(req.body); // Check if data is received correctly

    // Check if the room already exists
    const existingRoom = await Rooms.findOne({ roomId });
    if (existingRoom) {
      return res.status(400).json({ message: "Room ID already exists. Choose a different one." });
    }

    // Create and save the new room
    const newRoom = new Rooms({ roomId, password,isSecured });
    await newRoom.save();

    res.status(200).json({ message: "Room created successfully", roomId });
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ message: "Failed to create room", error });
  }
};

exports.joinRoom = async (req, res) => {
  try {
    const { roomId, password } = req.body;
    console.log(req.body); // Check if data is received correctly

    // Check if the room exists
    const existingRoom = await Rooms.findOne({ roomId });
    if (!existingRoom) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Verify the password if the room is password-protected
    if (existingRoom.password && existingRoom.password !== password) {
      return res.status(403).json({ message: "Incorrect password" });
    }

    // If the room exists and password is correct (or not required)
    res.status(200).json({ message: "Joined room successfully", roomId });
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