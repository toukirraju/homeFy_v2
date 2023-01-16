const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ownerSchema = new Schema(
  {
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
      require: true,
    },
    lastname: {
      type: String,
      require: true,
    },
    phoneNo: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      require: true,
    },
    ownerId: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profilePicture: String,
    coverPicture: String,
    livesin: String,
  },
  { timestamps: true }
);

const OwnerInfoModel = mongoose.model("OwnerInfoModel", ownerSchema);
module.exports = OwnerInfoModel;
