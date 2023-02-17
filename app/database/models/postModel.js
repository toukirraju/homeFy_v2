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
    defaultHomeID: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "OwnerInfoModel",
      required: true,
    },
    house: {
      type: mongoose.Types.ObjectId,
      ref: "HouseInfo",
      required: true,
    },
    apartment: {
      type: mongoose.Types.ObjectId,
      ref: "ApartmentModel",
      required: true,
    },
    description: {
      type: String,
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
    isNegotiable: {
      type: Boolean,
      default: false,
    },
    isBlock: {
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
