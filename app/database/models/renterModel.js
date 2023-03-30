const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const renterSchema = new Schema(
  {
    // those fields are used when user was assigned on apartment  \\//
    ownerId: {
      type: String,
      default: null,
    },
    defaultHomeID: {
      type: String,
      default: null,
    },
    house: {
      type: mongoose.Types.ObjectId,
      ref: "HouseInfo",
      default: null,
    },
    apartment: {
      type: mongoose.Types.ObjectId,
      ref: "ApartmentModel",
      default: null,
    },
    apartmentId: {
      type: String,
      default: "",
    },
    apartment_number: {
      type: String,
    },
    roomNumber: {
      type: String,
    },
    advanceRent: {
      type: Number,
    },
    assignedDate: {
      type: Date,
    },
    //\\those fields are used when user was assigned on apartment  //\\
    billingDate: {
      type: Date,
    },
    bills: [
      {
        type: mongoose.Types.ObjectId,
        ref: "BillModel",
        default: null,
      },
    ],
    username: {
      type: String,
      require: true,
    },
    password: {
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
    permanent_address: {
      type: String,
      // require: true,
    },
    street_no: {
      type: String,
      // require: true,
    },

    postcode: {
      type: String,
      // require: true,
    },
    NID_no: {
      type: String,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },
    profilePicture: String,
    documents: {
      nid: String,
      income_tax: String,
      others_doc: String,
    },
  },
  { timestamps: true }
);

const RenterInfoModel = mongoose.model("RenterInfoModel", renterSchema);
module.exports = RenterInfoModel;
