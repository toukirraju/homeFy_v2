const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const apartmentSchema = new Schema(
  {
    ownerName: {
      type: String,
      required: true,
    },
    ownerId: {
      type: String,
      required: true,
    },
    allApartments: [
      {
        level: {
          type: String,
        },
        apartNo: {
          type: String,
        },
        roomNo: {
          type: String,
        },
        rent: {
          type: Number,
        },
        gasbill: {
          type: Number,
        },
        waterbill: {
          type: Number,
        },
        f_bill: {
          type: Number,
        },
        c_service: {
          type: Number,
        },
        totalRent: {
          type: Number,
        },
        isAvailable: {
          type: Boolean,
          default: true,
        },
        renterId: {
          type: String,
        },
        renterName: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const ApartmentModel = mongoose.model("ApartmentModel", apartmentSchema);
module.exports = ApartmentModel;
