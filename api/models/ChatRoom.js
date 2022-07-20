const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema(
  {
    chatRoomId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    message: {
      type: String,
    },
    time: {
      type: String,
    },
  }
)

const ChatRoomSchema = new mongoose.Schema(
  {
    roomParticipant: {
      type: Array,
      require: true,
    },
    conversations: {
     type: [MessageSchema],
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ChatRoom", ChatRoomSchema);
