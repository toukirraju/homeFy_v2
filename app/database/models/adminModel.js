const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    username: {
      //email
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
    fullName: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    country: {
      type: String,
      require: true,
    },
    country_code: {
      type: String,
      require: true,
    },
    postcode: {
      type: String,
      require: true,
    },
    state: {
      type: String,
      require: true,
    },
    state_district: {
      type: String,
      require: true,
    },
    nid: {
      type: String,
    },
    profession: {
      type: String,
    },
    role: {
      type: mongoose.Types.ObjectId,
      ref: "AdminRole",
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: true,
    },
    superAdmin: {
      type: Boolean,
      default: false,
    },
    profilePicture: String,
  },
  { timestamps: true }
);

const AdminModel = mongoose.model("AdminModel", adminSchema);
module.exports = AdminModel;
