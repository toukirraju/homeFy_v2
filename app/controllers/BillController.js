const BillModel = require("../database/models/billModel");
const TempBillModel = require("../database/models/tempBillModel");
const RenterModel = require("../database/models/renterModel");
const ApartmentModel = require("../database/models/apartmentModel");
const mongoose = require("mongoose");
const { serverError, resourceError } = require("../utils/error");
// const { sendMessage } = require("../../utils/methods");

const payableRenters = async (req, res) => {
  // let { _id, role, homeId, homeOwner } = req.user;
  const { _id, defaultHomeID } = req.user;

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  try {
    const bills = await BillModel.find({
      ownerId: _id,
      defaultHomeID,
      billMonth: currentMonth,
      billYear: currentYear,
    });
    const billRenterIds = bills.map((bill) => bill.renterId);

    const nonPaidRenters = await RenterModel.find({
      ownerId: _id,
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
    // const filteredRenters = await RenterModel.find({
    //   ownerId: _id.toString(),
    //   defaultHomeID,
    //   apartmentId: { $nin: [null, ""] },
    //   // billingDate: {
    //   //   $exists: true,
    //   //   $ne: null,
    //   // },
    //   $or: [
    //     {
    //       $and: [
    //         {
    //           "billingDate.getMonth() + 1": {
    //             $ne: currentMonth,
    //           },
    //         },
    //         {
    //           "billingDate.getFullYear()": {
    //             $ne: currentYear,
    //           },
    //         },
    //       ],
    //     },
    //     {
    //       billingDate: {
    //         $exists: false,
    //         $eq: null,
    //       },
    //     },
    //   ],
    // }).populate("apartment");
    // const filteredRenters = await RenterModel.find({
    //   ownerId: _id.toString(),
    //   defaultHomeID,
    //   apartmentId: { $nin: [null, ""] },
    //   $and: [
    //     // {
    //     //   billingDate: {
    //     //     $exists: true,
    //     //     $ne: null,
    //     //   },
    //     // },
    //     {
    //       $or: [
    //         {
    //           $and: [
    //             {
    //               "billingDate.getMonth() + 1": {
    //                 $ne: currentMonth,
    //               },
    //             },
    //             {
    //               "billingDate.getFullYear()": {
    //                 $ne: currentYear,
    //               },
    //             },
    //           ],
    //         },
    //         {
    //           billingDate: {
    //             $exists: false,
    //             $eq: null,
    //           },
    //         },
    //       ],
    //     },
    //     {
    //       assignedDate: {
    //         $exists: true,
    //         $ne: null,
    //       },
    //     },
    //     {
    //       $or: [
    //         {
    //           $and: [
    //             {
    //               "assignedDate.getMonth() + 1": {
    //                 $gt: parseInt(req.params.month),
    //               },
    //             },
    //             {
    //               "assignedDate.getFullYear()": {
    //                 $gt: parseInt(req.params.year),
    //               },
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    // });
  } catch (error) {
    serverError(res, error);
  }

  // const monthlyBills = await BillModel.aggregate([
  //   {
  //     $match: {
  //       $expr: {
  //         $and: [
  //           {
  //             $eq: [{ $month: "$createdAt" }, parseInt(req.params.month)],
  //           },
  //           {
  //             $eq: [{ $year: "$createdAt" }, parseInt(req.params.year)],
  //           },
  //         ],
  //       },
  //       $and: [{ ownerId: _id.toString(),defaultHomeID }],
  //     },
  //   },
  // ]);
  // const renters = await RenterModel.find({
  //   ownerId: _id.toString(),
  //   defaultHomeID,
  //   apartmentId: { $nin: [null, ""] },
  //   // $expr: {
  //   //   $and: [
  //   //     {
  //   //       $lt: [{ $month: "$assignedDate" }, parseInt(req.params.month)],
  //   //     },
  //   //     {
  //   //       $lt: [{ $year: "$assignedDate" }, parseInt(req.params.year)],
  //   //     },
  //   //   ],
  //   // },
  // });

  // try {
  //   if (renters.length != 0) {
  //     let payableRenters = renters;

  //     for (let i = monthlyBills.length - 1; i >= 0; i--) {
  //       for (let j = 0; j < payableRenters.length; j++) {
  //         if (monthlyBills[i].renterId === payableRenters[j]._id.toString()) {
  //           payableRenters.splice(j, 1);
  //         }
  //       }
  //     }

  //     let renterDetails = [];

  //     for (let i = 0; i < payableRenters.length; i++) {
  //       try {
  //         const apartments = await ApartmentModel.findOne(
  //           { ownerId: _id.toString(), defaultHomeID },
  //           {
  //             allApartments: {
  //               $elemMatch: {
  //                 _id: new mongoose.Types.ObjectId(
  //                   payableRenters[i].apartmentId
  //                 ),
  //               },
  //             },
  //           }
  //         );

  //         const apartment = apartments.allApartments[0];
  //         renterDetails.push({
  //           defaultHomeID: payableRenters[i]._doc.defaultHomeID,
  //           apartmentId: payableRenters[i]._doc.apartmentId,
  //           ownerId: payableRenters[i]._doc.ownerId,
  //           phone: payableRenters[i]._doc.phone,

  //           apartmentDetails: apartment._doc.apartmentDetails,
  //           billDetails: apartment._doc.billDetails,
  //           renterId: apartment._doc.renterId,
  //           renterName: apartment._doc.renterName,
  //         });
  //       } catch (error) {
  //         res.status(500).json(error);
  //       }
  //     }

  //     res.status(200).json(renterDetails);
  //   } else {
  //     return resourceError(res, "Action forbidden");
  //   }
  // } catch (error) {
  //   serverError(res, error);
  // }
};

const payableRenters2 = async (req, res) => {
  // let { _id, role, homeId, homeOwner } = req.user;
  const { _id, defaultHomeID } = req.user;
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
        $and: [{ ownerId: _id.toString(), defaultHomeID }],
      },
    },
  ]);
  const renters = await RenterModel.find({
    ownerId: _id.toString(),
    defaultHomeID,
    apartmentId: { $nin: [null, ""] },
    // $expr: {
    //   $and: [
    //     {
    //       $lt: [{ $month: "$assignedDate" }, parseInt(req.params.month)],
    //     },
    //     {
    //       $lt: [{ $year: "$assignedDate" }, parseInt(req.params.year)],
    //     },
    //   ],
    // },
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
            { ownerId: _id.toString(), defaultHomeID },
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
          renterDetails.push({
            defaultHomeID: payableRenters[i]._doc.defaultHomeID,
            apartmentId: payableRenters[i]._doc.apartmentId,
            ownerId: payableRenters[i]._doc.ownerId,
            phone: payableRenters[i]._doc.phone,

            apartmentDetails: apartment._doc.apartmentDetails,
            billDetails: apartment._doc.billDetails,
            renterId: apartment._doc.renterId,
            renterName: apartment._doc.renterName,
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
  const { _id, defaultHomeID } = req.user;
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  // const sms = req.body.isSMS;
  // const _id = "1981493110";
  // const name = "ChayaNirr";
  try {
    const billData = new BillModel({
      ownerId: _id.toString(),
      defaultHomeID,
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

      billMonth: currentMonth,
      billYear: currentYear,
    });

    const tempData = new TempBillModel({
      _id: req.body.renterId,
      ownerId: _id.toString(),
      defaultHomeID,
      renterName: req.body.renterName,
      electricity_bill: 0,
      others: 0,
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
          $set: { electricity_bill: 0, others: 0, tempDue: req.body.due },
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
  const { _id, defaultHomeID } = req.user;
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
        $and: [{ ownerId: _id.toString(), defaultHomeID }],
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
  const { _id, defaultHomeID } = req.user;

  const tempBills = await TempBillModel.find({
    ownerId: _id.toString(),
    defaultHomeID,
  });

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
  const { _id, defaultHomeID } = req.user;

  let tempObj = new Object({
    electricity_bill: 0,
    others: 0,
    tempDue: 0,
  });

  const tempBill = await TempBillModel.aggregate([
    {
      $match: {
        $and: [
          { ownerId: _id.toString(), defaultHomeID },
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
          electricity_bill: parseInt(req.body.electricity_bill),
          others: parseInt(req.body.others),
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
