const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const houseInfoSchema = new Schema(
  {
    _id: {
      type: String,
    },
    desc: {
      type: String,
    },
    ownerName: {
      type: String,
    },
    ownerPhone: {
      type: String,
    },
    houseName: {
      type: String,
    },
    houseNo: {
      type: String,
    },
    village: {
      type: String,
    },
    district: {
      type: String,
    },
    division: String,
  },
  { timestamps: true }
);

const HouseInfo = mongoose.model("HouseInfo", houseInfoSchema);
module.exports = HouseInfo;
