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
    defaultHomeID: {
      type: String,
      required: true,
    },
    houseName: {
      type: String,
      required: true,
    },
    apartmentDetails: {
      apartmentName: {
        type: String,
      },
      apartment_number: {
        type: String,
      },
      apartmentType: {
        // "family/bachelor",
        type: String,
      },
      roomNumber: {
        //if it is bachelor apartment
        type: String,
      },
      floor: {
        type: Number,
      },
      number_of_bed_room: {
        type: Number,
      },
      number_of_kitchen: {
        type: Number,
      },
      number_of_baths: {
        type: Number,
      },
      number_of_balcony: {
        type: String,
      },
      apartment_length: {
        //sqft
        type: Number,
      },
    },
    billDetails: {
      rent: {
        type: Number,
      },
      gas_bill: {
        type: Number,
      },
      water_bill: {
        type: Number,
      },
      electricity_bill: {
        type: Number,
      },
      service_charge: {
        type: Number,
      },
      others: {
        type: Number,
      },
      totalRent: {
        type: Number,
      },
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
    renterId: {
      //after assigning renter
      type: String,
    },
    renterName: {
      //after assigning renter
      type: String,
    },
  },

  { timestamps: true }
);

const ApartmentModel = mongoose.model("ApartmentModel", apartmentSchema);
module.exports = ApartmentModel;
