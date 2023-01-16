const BillModel = require("../database/models/billModel");
const TempBillModel = require("../database/models/tempBillModel");
const RenterModel = require("../database/models/renterModel");
const ApartmentModel = require("../database/models/apartmentModel");
const mongoose = require("mongoose");
const { serverError, resourceError } = require("../utils/error");
// const { sendMessage } = require("../../utils/methods");

const payableRenters = async (req, res) => {
  // let { _id, role, homeId, homeOwner } = req.user;
  const { _id } = req.user;
  const monthlyBills = await BillModel.aggregate([
    {
      $match: {
        $expr: {
          $and: [
            {
              $eq: [{ $month: "$createdAt" }, parseInt(req.params.month)],
            },
            {
              $eq: [{ $year: "$createdAt" }, parseInt(req.params.year)],
            },
          ],
        },
        $and: [{ ownerId: _id.toString() }],
      },
    },
  ]);

  const renters = await RenterModel.find({
    ownerId: _id.toString(),
    apartmentId: { $nin: [null, ""] },
  });

  try {
    if (renters.length != 0) {
      let payableRenters = renters;

      for (let i = monthlyBills.length - 1; i >= 0; i--) {
        for (let j = 0; j < payableRenters.length; j++) {
          if (monthlyBills[i].renterId === payableRenters[j]._id.toString()) {
            payableRenters.splice(j, 1);
          }
        }
      }

      let renterDetails = [];

      for (let i = 0; i < payableRenters.length; i++) {
        try {
          const apartments = await ApartmentModel.findOne(
            { ownerId: _id.toString() },
            {
              allApartments: {
                $elemMatch: {
                  _id: new mongoose.Types.ObjectId(
                    payableRenters[i].apartmentId
                  ),
                },
              },
            }
          );

          const apartment = apartments.allApartments[0];
          const { apartmentId, ownerId, phoneNo } = payableRenters[i]._doc;
          const {
            level,
            apartNo,
            roomNo,
            renterId,
            renterName,
            rent,
            gasbill,
            f_bill,
            c_service,
            waterbill,
            totalRent,
          } = apartment._doc;
          renterDetails.push({
            apartmentId,
            ownerId,
            phoneNo,
            level,
            apartNo,
            roomNo,
            renterId,
            renterName,
            rent,
            gasbill,
            f_bill,
            c_service,
            waterbill,
            totalRent,
          });
        } catch (error) {
          res.status(500).json(error);
        }
      }

      res.status(200).json(renterDetails);
    } else {
      return resourceError(res, "Action forbidden");
    }
  } catch (error) {
    serverError(res, error);
  }
};

const createBill = async (req, res) => {
  const { _id } = req.user;
  // const sms = req.body.isSMS;
  // const _id = "1981493110";
  // const name = "ChayaNirr";

  try {
    const billData = new BillModel({
      ownerId: _id.toString(),
      renterId: req.body.renterId,
      renterName: req.body.renterName,
      e_bill: req.body.e_bill,
      o_bill: req.body.o_bill,
      totalRent: req.body.totalRent,
      payableAmount: req.body.payableAmount,
      paidAmount: req.body.paidAmount,
      due: req.body.due,
    });

    const tempData = new TempBillModel({
      _id: req.body.renterId,
      ownerId: _id.toString(),
      renterName: req.body.renterName,
      e_bill: 0,
      o_bill: 0,
      tempDue: req.body.due,
    });

    const userBill = await BillModel.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              {
                $eq: [{ $month: "$createdAt" }, { $month: new Date() }],
              },
              {
                $eq: [{ $year: "$createdAt" }, { $year: new Date() }],
              },
            ],
          },
          $and: [{ ownerId: _id.toString() }, { renterId: req.body.renterId }],
        },
      },
    ]);

    const userTempBill = await TempBillModel.findById({
      _id: req.body.renterId,
    });

    if (userBill.length == 0) {
      await billData.save();
      if (!userTempBill) {
        await tempData.save();
      } else {
        await userTempBill.updateOne({
          $set: { e_bill: 0, o_bill: 0, tempDue: req.body.due },
        });
      }
      res.status(201).json({
        message: "Successfully create",
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

  try {
    const bill = await BillModel.findById(id);
    if (bill) {
      if (bill.ownerId === _id.toString()) {
        await bill.deleteOne();
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
  const { _id } = req.user;
  const monthlyBills = await BillModel.aggregate([
    {
      $match: {
        $expr: {
          $and: [
            {
              $eq: [{ $month: "$createdAt" }, parseInt(req.params.month)],
            },
            {
              $eq: [{ $year: "$createdAt" }, parseInt(req.params.year)],
            },
          ],
        },
        $and: [{ ownerId: _id.toString() }],
      },
    },
  ]);

  try {
    if (monthlyBills.length != 0) {
      res.status(200).json(monthlyBills);
    } else {
      return resourceError(res, "bill not found");
    }
  } catch (error) {
    serverError(res, error);
  }
};

const allTempBills = async (req, res) => {
  const { _id } = req.user;

  const tempBills = await TempBillModel.find({ ownerId: _id.toString() });

  try {
    if (tempBills.length != 0) {
      res.status(200).json(tempBills);
    } else {
      return resourceError(res, "Temporary bill not found");
    }
  } catch (error) {
    serverError(res, error);
  }
};

const userTempBill = async (req, res) => {
  const { _id } = req.user;

  let tempObj = new Object({
    e_bill: 0,
    o_bill: 0,
    tempDue: 0,
  });

  const tempBill = await TempBillModel.aggregate([
    {
      $match: {
        $and: [{ ownerId: _id.toString() }, { _id: req.params.id }],
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
  const { _id } = req.user;

  const tempData = new TempBillModel({
    _id: req.body.renterId,
    ownerId: _id.toString(),
    renterName: req.body.renterName,
    e_bill: req.body.e_bill,
    o_bill: req.body.o_bill,
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
          e_bill: parseInt(userTempBill.e_bill) + parseInt(req.body.e_bill),
          o_bill: parseInt(userTempBill.o_bill) + parseInt(req.body.o_bill),
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

  const userTempBill = await TempBillModel.findById({
    _id: req.body._id,
  });
  try {
    if (!userTempBill) {
      res.status(201).json({
        message: "temporary bill not found",
      });
    } else {
      await userTempBill.updateOne({
        $set: {
          e_bill: parseInt(req.body.e_bill),
          o_bill: parseInt(req.body.o_bill),
          tempDue: parseInt(req.body.tempDue),
        },
      });
      res.status(201).json({
        message: "successfully updated",
      });
    }
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
};
