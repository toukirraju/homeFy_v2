const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema(
  {
    ownerId: {
      type: String,
      require: true,
    },
    house: {
      type: mongoose.Types.ObjectId,
      ref: "HouseInfo",
      required: true,
    },

    country: {
      type: String,
      require: true,
    },
    // "Bangladesh"
    country_code: {
      type: String,
      require: true,
    },
    // "bd"
    postCode: {
      type: String,
      // require: true,
    },
    // "1711"
    road: {
      type: String,
      // require: true,
    },
    // "Dhaka-Mymensingh Highway"
    state: {
      type: String,
      require: true,
    },
    // "Dhaka Division"
    state_district: {
      type: String,
      require: true,
    },
    // "Gazipur District"
    suburb: {
      type: String,
      // require: true,
    },
    // "Cherag Ali"
    town: {
      type: String,
      // require: true,
    },
    // "Tongi"

    address_display_name: {
      type: String,
      require: true,
    },
    // "Tongi Truck Stand, Dhaka-Mymensingh Highway, Purbo Arichpur, Cherag Ali, Tongi, Gazipur District, Dhaka Division, 1711, Bangladesh"
    lat: {
      type: String,
      require: true,
    },
    // "23.90447025"
    lon: {
      type: String,
      require: true,
    },
    // "90.39839547436223"
    place_id: {
      type: String,
      require: true,
    },
    // 222625763
  },
  { timestamps: true }
);

const AdressModel = mongoose.model("AdressModel", addressSchema);
module.exports = AdressModel;
