const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    conversationId: {
      type: mongoose.Types.ObjectId,
      ref: "Conversations",
      required: true,
    },

    sender: {
      type: Object,
      username: String,
      fullname: String,
      _id: String,
    },
    receiver: {
      type: Object,
      username: String,
      fullname: String,
      _id: String,
    },

    message: {
      type: String,
    },
  },
  { timestamps: true }
);

const Messages = mongoose.model("Messages", messageSchema);
module.exports = Messages;
