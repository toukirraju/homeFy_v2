const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billSchema = new Schema(
  {
    ownerId: {
      type: String,
      required: true,
    },
    defaultHomeID: {
      type: String,
    },
    renterId: {
      type: String,
      required: true,
    },
    renterName: {
      type: String,
      required: true,
    },
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
    payableAmount: {
      type: Number,
    },
    paidAmount: {
      type: Number,
    },
    due: {
      type: Number,
    },
    billMonth: {
      type: Number,
    },
    billYear: {
      type: Number,
    },
  },
  { timestamps: true }
);
billSchema.index({ renterId: 1, billMonth: 1, billYear: 1 }, { unique: true });
const BillModel = mongoose.model("BillModel", billSchema);
module.exports = BillModel;
