const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const renterSchema = new Schema(
  {
    ownerId: {
      type: String,
    },
    username: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    phoneNo: {
      type: String,
      require: true,
    },
    nid: {
      type: String,
    },
    apartmentId: {
      type: String,
    },
    apartNo: {
      type: String,
    },
    roomNo: {
      type: String,
    },
    advanceRent: {
      type: Number,
    },
    profilePicture: String,
    coverPicture: String,
    livesin: String,
  },
  { timestamps: true }
);

const RenterInfoModel = mongoose.model("RenterInfoModel", renterSchema);
module.exports = RenterInfoModel;
