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
    fullname: {
      type: String,
    },
    phone: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      // require: true,
    },
    city: {
      type: String,
      // require: true,
    },
    area: {
      type: String,
      // require: true,
    },
    postCode: {
      type: String,
      // require: true,
    },
    nid: {
      type: String,
    },
    profession: {
      type: String,
    },
    role: {
      type: String,
      require: true,
    },
    ownerId: {
      //only for manager
      type: String,
    },
    defaultHomeID: {
      // for owner & manager
      type: String,
      default: "",
    },
    houseName: {
      // for manager
      type: String,
      default: "",
    },
    isOwner: {
      type: Boolean,
      default: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    profilePicture: {
      type: Object,
    },
    documents: {
      nid: String,
      income_tax: String,
      others_doc: String,
    },
    isHomifyPlus: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const OwnerInfoModel = mongoose.model("OwnerInfoModel", ownerSchema);
module.exports = OwnerInfoModel;
