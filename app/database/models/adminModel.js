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
    phone: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    area: {
      type: String,
      require: true,
    },
    postCode: {
      type: String,
      require: true,
    },
    nid: {
      type: String,
    },
    profession: {
      type: String,
    },
    roles: {
      type: [String],
      require: true,
      default: ["editor", "moderator"],
    },
    isAdmin: {
      type: Boolean,
      default: true,
    },
    superAdmin: {
      type: Boolean,
      default: false,
    },
    createdAdmin: {
      type: String,
      require: true,
    },
    profilePicture: String,
  },
  { timestamps: true }
);

const AdminModel = mongoose.model("AdminModel", adminSchema);
module.exports = AdminModel;
