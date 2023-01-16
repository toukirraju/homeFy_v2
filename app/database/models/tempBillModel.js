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
    renterName: {
      type: String,
    },
    e_bill: {
      type: Number,
    },
    o_bill: {
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
