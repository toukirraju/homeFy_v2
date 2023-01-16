const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    //here _id == apartment id
    _id: {
      type: String,
      required: true,
    },
    ownerId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
    ratings: {
      userId: String,
      rating: Number,
    },
    comments: {
      userId: String,
      comment: String,
      isVisible: {
        type: Boolean,
        default: true,
      },
    },
  },
  { timestamps: true }
);

const Posts = mongoose.model("Posts", postSchema);
module.exports = Posts;
