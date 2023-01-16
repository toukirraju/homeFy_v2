const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billSchema = new Schema(
  {
    ownerId: {
      type: String,
      required: true,
    },
    renterId: {
      type: String,
      required: true,
    },
    renterName: {
      type: String,
      required: true,
    },
    e_bill: {
      type: Number,
    },
    o_bill: {
      type: Number,
    },
    totalRent: {
      type: Number,
    },
    payableAmount: {
      type: Number,
    },
    paidAmount: {
      type: Number,
    },
    due: {
      type: Number,
    },
  },
  { timestamps: true }
);

const BillModel = mongoose.model("BillModel", billSchema);
module.exports = BillModel;
