const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tempBillSchema = new Schema(
  {
    //_id===renterId
    _id: {
      type: String,
    },
    ownerId: {
      type: String,
      required: true,
    },
    defaultHomeID: {
      type: String,
    },
    renterName: {
      type: String,
    },
    electricity_bill: {
      type: Number,
    },
    others: {
      type: Number,
    },
    tempDue: {
      type: Number,
    },
  },
  { timestamps: true }
);

const TempBillModel = mongoose.model("TempBillModel", tempBillSchema);
module.exports = TempBillModel;
