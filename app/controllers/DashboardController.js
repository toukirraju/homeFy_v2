const BillModel = require("../database/models/billModel");
const RenterModel = require("../database/models/renterModel");
const ApartmentModel = require("../database/models/apartmentModel");
const TemporaryModel = require("../database/models/tempBillModel");
const { serverError, resourceError } = require("../utils/error");

const getPerYearBills = async (req, res) => {
  const { _id, defaultHomeID, role } = req.user;

  try {
    const bills = await BillModel.find({
      ownerId: role === "owner" ? _id : req.user.ownerId,
      defaultHomeID,
      billYear: req.params.year,
    });

    let monthlyBills = {};
    bills.forEach(function (bill) {
      if (!monthlyBills[bill.billMonth]) {
        monthlyBills[bill.billMonth] = {
          totalRent: 0,
          payableAmount: 0,
          paidAmount: 0,
        };
      }
      monthlyBills[bill.billMonth].totalRent += bill.totalRent;
      monthlyBills[bill.billMonth].payableAmount += bill.payableAmount;
      monthlyBills[bill.billMonth].paidAmount += bill.paidAmount;
    });

    res.status(200).json(monthlyBills);
  } catch (error) {
    serverError(res, error);
  }
};

const activeRenters = async (req, res) => {
  // let { _id, role, homeId, homeOwner } = req.user;
  const { _id, defaultHomeID, role } = req.user;

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  try {
    //////////////////////////// count monthly paid bills \\\\\\\\\\\\\\\\\\\\\\\\\\\
    const monthlyPaidBills = await BillModel.find({
      ownerId: role === "owner" ? _id : req.user.ownerId,
      defaultHomeID,
      billMonth: currentMonth,
      billYear: currentYear,
    });

    //////////////////////////// count non paid renters \\\\\\\\\\\\\\\\\\\\\\\\\\\
    const paidRenterIds = monthlyPaidBills.map((bill) => bill.renterId);

    //////////////////////////// count Paid renters \\\\\\\\\\\\\\\\\\\\\\\\\\\
    const nonPaidRenters = await RenterModel.find({
      ownerId: role === "owner" ? _id : req.user.ownerId,
      defaultHomeID,
      _id: {
        $nin: paidRenterIds,
      },
      assignedDate: {
        $lt: new Date(`${parseInt(currentYear)}-${parseInt(currentMonth)}-01`),
      },
    });

    //////////////////////////// count All renters \\\\\\\\\\\\\\\\\\\\\\\\\\\
    const allRenters = await RenterModel.find({
      ownerId: role === "owner" ? _id : req.user.ownerId,
      defaultHomeID,
    });

    //////////////////////////// count Active renters \\\\\\\\\\\\\\\\\\\\\\\\\\\
    const activeRenters = await RenterModel.find({
      ownerId: role === "owner" ? _id : req.user.ownerId,
      defaultHomeID,
      apartment: { $ne: null },
    });

    //////////////////////////// count new renters \\\\\\\\\\\\\\\\\\\\\\\\\\\
    const newRenters = await RenterModel.aggregate([
      {
        $match: {
          ownerId: role === "owner" ? _id.toString() : req.user.ownerId,
          defaultHomeID,
        },
      },
      {
        $project: {
          isCurrentMonth: { $eq: [{ $month: "$assignedDate" }, currentMonth] },
        },
      },
      {
        $match: {
          isCurrentMonth: true,
        },
      },
      {
        $count: "newRenters",
      },
    ]);

    const details = {
      activeRenters: activeRenters.length,
      newRenters: newRenters.length === 0 ? 0 : newRenters[0].newRenters,
      inactiveRenters:
        parseInt(allRenters.length) - parseInt(activeRenters.length),
      paidRenters: monthlyPaidBills.length,
      nonPaidRenters: nonPaidRenters.length,
    };
    // console.log(details);
    res.status(200).json(details);
  } catch (error) {
    serverError(res, error);
  }
};

const getPieChartData = async (req, res) => {
  const { _id, defaultHomeID, role } = req.user;
  // const ownerId = "63c77d47acfe53798bd6ce6c";
  // const defaultHomeID = "63c8ef94a26e9c7dd7b0d871";

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  try {
    const payableTotalRent = await ApartmentModel.aggregate([
      {
        $match: {
          ownerId: role === "owner" ? _id.toString() : req.user.ownerId,
          defaultHomeID: defaultHomeID,
          renterId: { $ne: null, $ne: "", $ne: undefined },
          renterName: { $ne: null, $ne: "", $ne: undefined },
        },
      },
      {
        $group: {
          _id: null,
          totalRent: { $sum: "$billDetails.totalRent" },
        },
      },
      {
        $project: {
          _id: 0,
          totalRent: 1,
        },
      },
    ]);

    const totalTemporarayBill = await TemporaryModel.aggregate([
      {
        $match: {
          ownerId: role === "owner" ? _id.toString() : req.user.ownerId,
          defaultHomeID: defaultHomeID,
        },
      },
      {
        $group: {
          _id: null,

          totalTemp: {
            $sum: {
              $sum: ["$electricity_bill", "$others", "$tempDue"],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalTemp: 1,
        },
      },
    ]);

    const monthlyTotalPaid = await BillModel.aggregate([
      {
        $match: {
          ownerId: role === "owner" ? _id.toString() : req.user.ownerId,
          defaultHomeID: defaultHomeID,
          billMonth: { $eq: currentMonth },
          billYear: { $eq: currentYear },
        },
      },
      {
        $group: {
          _id: null,
          paidAmount: { $sum: "$paidAmount" },
        },
      },
      {
        $project: {
          _id: 0,
          paidAmount: 1,
        },
      },
    ]);

    let totalTemp = 0;
    if (totalTemporarayBill.length > 0) {
      totalTemp = totalTemporarayBill[0].totalTemp;
    }

    let totalRent = 0;
    if (payableTotalRent.length > 0) {
      totalRent = payableTotalRent[0].totalRent;
    }

    let paidAmount = 0;
    if (monthlyTotalPaid.length > 0) {
      paidAmount = monthlyTotalPaid[0].paidAmount;
    }

    const payable = parseInt(totalTemp) + parseInt(totalRent);
    const details = {
      payable,
      paid: paidAmount,
      remaining: parseInt(payable) - parseInt(paidAmount),
    };

    res.status(200).json(details);
  } catch (error) {
    serverError(res, error);
  }
};

const getApartmentWidgetData = async (req, res) => {
  // let { _id, role, homeId, homeOwner } = req.user;
  const { _id, defaultHomeID, role } = req.user;
  // const ownerId = "63c77d47acfe53798bd6ce6c";
  // const defaultHomeID = "63c8ef94a26e9c7dd7b0d871";

  try {
    const result = await ApartmentModel.aggregate([
      {
        $match: {
          ownerId: role === "owner" ? _id.toString() : req.user.ownerId,
          defaultHomeID: defaultHomeID,
        },
      },
      {
        $group: {
          _id: "$apartmentDetails.apartmentType",
          count: { $sum: 1 },
          emptyApartments: {
            $sum: {
              // $cond: [{ $eq: ["$renterId", ""] }, 1, 0],
              $cond: [
                {
                  $or: [
                    { $eq: ["$renterId", null] },
                    { $eq: ["$renterId", ""] },
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          apartmentType: "$_id",
          count: 1,
          emptyApartments: 1,
        },
      },
    ]);

    const availableApartments = result.reduce(
      (total, current) => total + current.emptyApartments,
      0
    );

    const familyCount = result.find(
      (obj) => obj.apartmentType === "family"
    )?.count;

    const bachelorCount = result.find(
      (obj) => obj.apartmentType === "bachelor"
    )?.count;

    const nonTypeCount = result.find((obj) => obj.apartmentType === "")?.count;

    const details = {
      totalApartment:
        result.length === 0
          ? 0
          : parseInt(familyCount) +
            parseInt(bachelorCount) +
            parseInt(nonTypeCount),
      availableApartments: result.length === 0 ? 0 : availableApartments,
      familyApartment: result.length === 0 ? 0 : familyCount,
      bachelorApartment: result.length === 0 ? 0 : bachelorCount,
    };
    // console.log(result);
    res.status(200).json(details);
  } catch (error) {
    serverError(res, error);
  }
};

module.exports = {
  getPerYearBills,
  activeRenters,
  getPieChartData,
  getApartmentWidgetData,
};
