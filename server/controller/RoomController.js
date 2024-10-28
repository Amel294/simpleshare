// RoomController.js

const Rooms = require("../model/Rooms");

exports.createRoom = async (req, res) => {
  try {
    const { roomId, password } = req.body;
    console.log(req.body); // Check if data is received correctly

    // Check if the room already exists
    const existingRoom = await Rooms.findOne({ roomId });
    if (existingRoom) {
      return res.status(400).json({ message: "Room ID already exists. Choose a different one." });
    }

    // Create and save the new room
    const newRoom = new Rooms({ roomId, password });
    await newRoom.save();

    res.status(200).json({ message: "Room created successfully", roomId });
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ message: "Failed to create room", error });
  }
};
