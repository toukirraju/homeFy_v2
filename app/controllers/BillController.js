const BillModel = require("../database/models/billModel");
const TempBillModel = require("../database/models/tempBillModel");
const RenterModel = require("../database/models/renterModel");
const mongoose = require("mongoose");
const { serverError, resourceError } = require("../utils/error");
// const { sendMessage } = require("../../utils/methods");

const payableRenters = async (req, res) => {
  const { _id, defaultHomeID, role } = req.user;
  const { month, year } = req.params;

  try {
    const bills = await BillModel.find({
      ownerId: role === "owner" ? _id : req.user.ownerId,
      defaultHomeID,
      billMonth: month,
      billYear: year,
    });
    const billRenterIds = bills.map((bill) => bill.renterId);

    const nonPaidRenters = await RenterModel.find({
      ownerId: role === "owner" ? _id : req.user.ownerId,
      defaultHomeID,
      _id: {
        $nin: billRenterIds,
      },
      assignedDate: {
        $lt: new Date(
          `${parseInt(req.params.year)}-${parseInt(req.params.month)}-01`
        ),
      },
    }).populate("apartment");
    res.status(200).json(nonPaidRenters);
  } catch (error) {
    serverError(res, error);
  }
};

const createBill = async (req, res) => {
  const { _id, defaultHomeID, role } = req.user;
  // const sms = req.body.isSMS;
  // const _id = "1981493110";
  // const name = "ChayaNirr";
  // console.log(req.body.month);
  try {
    const billData = new BillModel({
      ownerId: role === "owner" ? _id.toString() : req.user.ownerId,
      defaultHomeID,
      renter: req.body.renterId,
      renterId: req.body.renterId,
      renterName: req.body.renterName,

      electricity_bill: req.body.electricity_bill,
      others: req.body.others,

      rent: req.body.rent,
      gas_bill: req.body.gas_bill,
      water_bill: req.body.water_bill,
      service_charge: req.body.service_charge,
      totalRent: req.body.totalRent,

      payableAmount: req.body.payableAmount,
      paidAmount: req.body.paidAmount,
      due: req.body.due,

      billMonth: req.body.month,
      billYear: req.body.year,
    });

    const tempData = new TempBillModel({
      _id: req.body.renterId,
      ownerId: role === "owner" ? _id.toString() : req.user.ownerId,
      defaultHomeID,
      renterName: req.body.renterName,
      electricity_bill: 0,
      others: 0,
      tempDue: req.body.due,
    });

    const userBill = await BillModel.aggregate([
      {
        $match: {
          $and: [
            { ownerId: role === "owner" ? _id.toString() : req.user.ownerId },
            { renterId: req.body.renterId },
            {
              billMonth: { $eq: parseInt(req.body.month) },
              billYear: { $eq: parseInt(req.body.year) },
            },
          ],
        },
      },
    ]);

    const userTempBill = await TempBillModel.findById({
      _id: req.body.renterId,
    });

    if (userBill.length == 0) {
      //creating bill
      const createdBill = await billData.save();

      //push bill id on renter bills array
      await RenterModel.updateOne(
        {
          _id: req.body.renterId,
        },
        {
          $push: {
            bills: createdBill._id,
          },
        }
      );

      //creating temporaray bill
      if (!userTempBill) {
        await tempData.save();
      } else {
        await userTempBill.updateOne({
          $set: { electricity_bill: 0, others: 0, tempDue: req.body.due },
        });
      }
      // res.status(201).json({
      //   message: "Successfully create",
      // });
      res.status(201).json({
        createdBill,
      });
    } else {
      return resourceError(res, "Bill already created, try again next month..");
    }
  } catch (error) {
    serverError(res, error);
  }
};

const deleteBill = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.user;
  //need to delete bill from renter bills array
  try {
    const bill = await BillModel.findById(id);
    if (bill) {
      if (bill.ownerId === _id.toString()) {
        //remove bill from bill collection
        await bill.deleteOne();

        //remove bill from renter collection
        await RenterModel.updateOne(
          { _id: mongoose.Types.ObjectId(bill.renterId) },
          { $pull: { bills: mongoose.Types.ObjectId(id) } }
        );

        res.status(201).json({
          message: "bill deleted successfully",
        });
      } else {
        return resourceError(res, "Action forbidden");
      }
    } else {
      return resourceError(res, "Bill not found");
    }
  } catch (error) {
    serverError(res, error);
  }
};

const monthlyBill = async (req, res) => {
  const { _id, defaultHomeID, role } = req.user;
  const monthlyBills = await BillModel.aggregate([
    {
      $match: {
        $expr: {
          $and: [],
        },

        $and: [
          {
            ownerId: role === "owner" ? _id.toString() : req.user.ownerId,
            defaultHomeID,
            billMonth: { $eq: parseInt(req.params.month) },
            billYear: { $eq: parseInt(req.params.year) },
          },
        ],
      },
    },
  ]);

  try {
    if (monthlyBills.length != 0) {
      res.status(200).json(monthlyBills);
    } else {
      // return resourceError(res, { bill_error: "bill not found" });
      res.status(200).json(monthlyBills);
    }
  } catch (error) {
    serverError(res, error);
  }
};

const allTempBills = async (req, res) => {
  const { _id, defaultHomeID, role } = req.user;

  const tempBills = await TempBillModel.find({
    ownerId: role === "owner" ? _id.toString() : req.user.ownerId,
    defaultHomeID,
  });

  try {
    if (tempBills.length != 0) {
      res.status(200).json(tempBills);
    } else {
      // return resourceError(res, "Temporary bill not found");
      res.status(200).json(tempBills);
    }
  } catch (error) {
    serverError(res, error);
  }
};

const userTempBill = async (req, res) => {
  const { _id, defaultHomeID, role } = req.user;

  let tempObj = new Object({
    electricity_bill: 0,
    others: 0,
    tempDue: 0,
  });

  const tempBill = await TempBillModel.aggregate([
    {
      $match: {
        $and: [
          {
            ownerId: role === "owner" ? _id.toString() : req.user.ownerId,
            defaultHomeID,
          },
          { _id: req.params.id },
        ],
      },
    },
  ]);
  try {
    if (tempBill.length != 0) {
      res.status(200).json(tempBill[0]);
    } else {
      res.status(200).json(tempObj);
      // return resourceError(res, "Temporary bill not found");
    }
  } catch (error) {
    serverError(res, error);
  }
};

const createUserTempBill = async (req, res) => {
  const { _id, defaultHomeID } = req.user;

  const tempData = new TempBillModel({
    _id: req.body.renterId,
    ownerId: _id.toString(),
    defaultHomeID,
    renterName: req.body.renterName,
    electricity_bill: req.body.electricity_bill,
    others: req.body.others,
    tempDue: req.body.tempDue,
  });

  const userTempBill = await TempBillModel.findById({
    _id: req.body.renterId,
  });

  try {
    if (!userTempBill) {
      await tempData.save();
      res.status(201).json({
        message: "Created Successfully",
      });
    } else {
      await userTempBill.updateOne({
        $set: {
          electricity_bill:
            parseInt(userTempBill.electricity_bill) +
            parseInt(req.body.electricity_bill),
          others: parseInt(userTempBill.others) + parseInt(req.body.others),
          tempDue: parseInt(userTempBill.tempDue) + parseInt(req.body.tempDue),
        },
      });
      res.status(201).json({
        message: "create successfully",
      });
    }
  } catch (error) {
    serverError(res, error);
  }
};

const updateTempBill = async (req, res) => {
  // let { _id, role, homeId, homeOwner } = req.user;

  try {
    const filter = { _id: req.body._id };
    const update = {
      $set: {
        electricity_bill: parseInt(req.body.electricity_bill),
        others: parseInt(req.body.others),
        tempDue: parseInt(req.body.tempDue),
      },
    };
    const options = { returnDocument: "after" };

    const temporaryBill = await TempBillModel.findOneAndUpdate(
      filter,
      update,
      options
    );

    if (!temporaryBill)
      res.status(201).json({ message: "Temporary bill not updated" });

    res.status(201).json({ temporaryBill });
  } catch (error) {
    serverError(res, error);
  }
};

const deleteTempBill = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.user;

  try {
    const tempBill = await TempBillModel.findById(id);
    if (tempBill) {
      if (tempBill.ownerId === _id.toString()) {
        await tempBill.deleteOne();
        res.status(201).json({
          message: "Temporary bill deleted",
        });
      } else {
        return resourceError(res, "Action forbidden");
      }
    } else {
      return resourceError(res, "Bill not found");
    }
  } catch (error) {
    serverError(res, error);
  }
};

// generate Due for unbilled user........
const generatedDueBills = async (req, res) => {
  // const ownerId = "6410285b9d612e3dc8daa154";
  // const defaultHomeID = "64109df309507d7410f1162d";
  const ownerId = req.user._id.toString();
  const defaultHomeID = req.user.defaultHomeID;

  // Get the current date
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const inputDate = new Date(req.body.date); // input value
  const dayOfMonth = inputDate.getDate();
  const inputMonth = inputDate.getMonth() + 1;
  const inputYear = inputDate.getFullYear();

  const makeBill = async () => {
    const monthlyPaidBills = await BillModel.find({
      ownerId,
      defaultHomeID,
      billMonth: inputMonth,
      billYear: inputYear,
    });
    const paidRenterIds = monthlyPaidBills.map((bill) => bill.renterId);

    const nonPaidRenters = await RenterModel.find({
      ownerId,
      defaultHomeID,
      _id: {
        $nin: paidRenterIds,
      },
      assignedDate: {
        $lt: new Date(`${parseInt(inputYear)}-${parseInt(inputMonth)}-01`),
      },
    }).populate("apartment");

    // Create a bill for each unbilled renter
    await Promise.all(
      nonPaidRenters.map(async (renter) => {
        //get renter temporary bill
        const tempBill = await TempBillModel.aggregate([
          {
            $match: {
              $and: [
                {
                  ownerId,
                  defaultHomeID,
                },
                { _id: renter._id.toString() },
              ],
            },
          },
        ]);

        // calculate total amount
        const total =
          parseInt(renter.apartment.billDetails.totalRent) +
          parseInt(tempBill.length === 0 ? 0 : tempBill[0].electricity_bill) +
          parseInt(tempBill.length === 0 ? 0 : tempBill[0].others) +
          parseInt(tempBill.length === 0 ? 0 : tempBill[0].tempDue);

        //calculate Due bill
        const newDue = parseInt(total) - parseInt(0); //paid amount 0

        const bill = new BillModel({
          ownerId: renter.ownerId,
          defaultHomeID: renter.defaultHomeID,
          renter: renter._id,
          renterId: renter._id,
          billMonth: inputMonth,
          billYear: inputYear,
          renterName: renter.fullname,
          phone: renter.phone,

          rent: renter.apartment.billDetails.rent,
          gas_bill: renter.apartment.billDetails.gas_bill,
          water_bill: renter.apartment.billDetails.water_bill,
          service_charge: renter.apartment.billDetails.service_charge,

          electricity_bill:
            tempBill.length === 0 ? 0 : tempBill[0].electricity_bill,
          others: tempBill.length === 0 ? 0 : tempBill[0].others,
          totalRent: parseInt(renter.apartment.billDetails.totalRent),
          payableAmount: total,
          paidAmount: 0,
          due: newDue > 0 ? newDue : 0,
        });

        const tempData = new TempBillModel({
          _id: renter._id,
          ownerId,
          defaultHomeID,
          renterName: renter.fullname,
          electricity_bill: 0,
          others: 0,
          tempDue: newDue,
        });
        //////////////////////////////////////////////////// saving data start \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        //creating temporaray bill

        if (tempBill.length === 0) {
          await tempData.save();
        } else {
          const userTempBill = await TempBillModel.findById({
            _id: renter._id.toString(),
          });
          await userTempBill.updateOne({
            $set: { electricity_bill: 0, others: 0, tempDue: newDue },
          });
        }

        //save bill on bill collection
        const createdBill = await bill.save();

        // push bill id on renter bills array
        await RenterModel.updateOne(
          {
            _id: renter._id,
          },
          {
            $push: {
              bills: createdBill._id,
            },
          }
        );

        //////////////////////////////////////////////////// saving data end \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
      })
    );

    res.status(200).json({ message: "Due bill generated complete" });
  };

  // Check if date is less then 25th day of month or previous month
  if (inputMonth === currentMonth) {
    if (dayOfMonth >= 25) {
      // input date is present month and it is greter then or equal 25th
      await makeBill();
    } else {
      // "In this month you can access only after 25th days.Try again letter."
      resourceError(
        res,
        "In this month you can access only after 25th days.Try again after 25."
      );
    }
  } else if (
    inputYear < currentYear ||
    (inputYear === currentYear && inputMonth < currentMonth)
  ) {
    // Input date is less than current month
    await makeBill();
  } else {
    // "Input date is not less than current month. Try again next month."

    resourceError(
      res,
      "Input date is not less than current month. Try again latter."
    );
  }
};

module.exports = {
  createBill,
  deleteBill,
  monthlyBill,
  allTempBills,
  userTempBill,
  createUserTempBill,
  updateTempBill,
  payableRenters,
  deleteTempBill,
  generatedDueBills,
};
