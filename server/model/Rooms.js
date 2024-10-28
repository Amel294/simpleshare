// models/Room.js
const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isSecured : {
    type: Boolean,
    required : true,
    default: true
  }
});

module.exports = mongoose.model('Room', RoomSchema);
