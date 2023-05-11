const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationSchema = new Schema(
  {
    participants: {
      type: String,
      required: true,
    },
    users: [
      {
        username: String,
        fullname: String,
        _id: String,
      },
      {
        username: String,
        fullname: String,
        _id: String,
      },
    ],
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

const Conversations = mongoose.model("Conversations", conversationSchema);
module.exports = Conversations;
