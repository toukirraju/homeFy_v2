const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const houseInfoSchema = new Schema(
  {
    ownerId: {
      type: String,
      require: true,
    },
    ownerName: {
      type: String,
      require: true,
    },
    ownerPhone: {
      type: String,
      require: true,
    },
    houseName: {
      type: String,
      require: true,
    },
    houseNo: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    streetNo: {
      type: String,
      // require: true,
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
    number_of_floors: {
      type: Number,
      require: true,
    },
    number_of_apartments: {
      type: Number,
      require: true,
    },
    documents: {
      nid: String,
      income_tax: String,
      others_doc: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const HouseInfo = mongoose.model("HouseInfo", houseInfoSchema);
module.exports = HouseInfo;
