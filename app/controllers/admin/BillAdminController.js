const { serverError, resourceError } = require("../../utils/error");

const BillInfo = require("../../database/models/billModel");

const TempBillInfo = require("../../database/models/tempBillModel");

//********* Get All Bills ************\\

const GetBills = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const filter = {};
  // if (username) {
  //   filter.username = { $regex: new RegExp(username, "i") };
  // }

  try {
    const bills = await BillInfo.aggregate([
      { $match: filter },
      { $sort: { createdAt: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: parseInt(limit) },
    ]);

    const count = await BillInfo.find(filter).countDocuments();

    if (bills.length > 0) {
      res.status(200).json({
        bills,
        pagination: {
          totalRecords: Number(count),
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
        },
      });
    } else {
      return resourceError(res, "No Bill found");
    }
  } catch (error) {
    serverError(res, error);
  }
};

//********* Get All temporary Bills ************\\

const GetTemopraryBills = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const filter = {};

  try {
    const tempBills = await TempBillInfo.aggregate([
      { $match: filter },
      { $sort: { updatedAt: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: parseInt(limit) },
    ]);

    const count = await TempBillInfo.find(filter).countDocuments();

    if (tempBills.length > 0) {
      res.status(200).json({
        tempBills,
        pagination: {
          totalRecords: Number(count),
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
        },
      });
    } else {
      return resourceError(res, "No Temporary Bill found");
    }
  } catch (error) {
    serverError(res, error);
  }
};

// Controller function to get monthly created bills per year
const getYearlyBillCreated = async (req, res) => {
  const year = req.query.year; // Get the year from the request query parameter

  // Construct the start and end dates for the specified year
  const startDate = new Date(year, 0, 1); // January 1st of the specified year
  const endDate = new Date(year, 11, 31, 23, 59, 59); // December 31st of the specified year

  try {
    let query = { createdAt: { $gte: startDate, $lte: endDate } };

    // If year is not provided, get data for the entire year
    if (!year) {
      query = {};
    }

    const monthlyData = await BillInfo.find(query);

    // Initialize an object to store monthly totals
    const monthlyTotals = {};

    // Iterate over the monthly data and calculate the totals for each month
    monthlyData.forEach((apartment) => {
      const month = apartment.createdAt.getMonth(); // Get the month index (0-11)
      const monthName = new Date(0, month).toLocaleString("en-US", {
        month: "short",
      }); // Get the month name
      const existingTotal = monthlyTotals[monthName] || 0;
      monthlyTotals[monthName] = existingTotal + 1; // Increment the count for the month
    });

    // Create an object with the monthly totals, including months with no bills
    const monthlyTotalsObject = {};

    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      const monthName = new Date(0, monthIndex).toLocaleString("en-US", {
        month: "short",
      });
      monthlyTotalsObject[monthName.toLowerCase()] =
        monthlyTotals[monthName] || 0;
    }

    res.status(200).json(monthlyTotalsObject);
  } catch (error) {
    serverError(res, error);
  }
};

const getPaidAmountByMonth = async (req, res) => {
  const year = req.query.year;

  const pipeline = [
    {
      $match: {
        billYear: Number(year),
      },
    },
    {
      $group: {
        _id: "$billMonth",
        totalPaidAmount: { $sum: "$paidAmount" },
      },
    },
    {
      $project: {
        _id: 0,
        month: {
          $concat: [
            { $cond: [{ $eq: ["$_id", 1] }, "Jan", ""] },
            { $cond: [{ $eq: ["$_id", 2] }, "Feb", ""] },
            { $cond: [{ $eq: ["$_id", 3] }, "Mar", ""] },
            { $cond: [{ $eq: ["$_id", 4] }, "Apr", ""] },
            { $cond: [{ $eq: ["$_id", 5] }, "May", ""] },
            { $cond: [{ $eq: ["$_id", 6] }, "Jun", ""] },
            { $cond: [{ $eq: ["$_id", 7] }, "Jul", ""] },
            { $cond: [{ $eq: ["$_id", 8] }, "Aug", ""] },
            { $cond: [{ $eq: ["$_id", 9] }, "Sep", ""] },
            { $cond: [{ $eq: ["$_id", 10] }, "Oct", ""] },
            { $cond: [{ $eq: ["$_id", 11] }, "Nov", ""] },
            { $cond: [{ $eq: ["$_id", 12] }, "Dec", ""] },
          ],
        },
        totalPaidAmount: 1,
      },
    },
  ];

  try {
    const result = await BillInfo.aggregate(pipeline);

    // Initialize paidAmountByMonth object with default values for all months
    const paidAmountByMonth = {
      Jan: 0,
      Feb: 0,
      Mar: 0,
      Apr: 0,
      May: 0,
      Jun: 0,
      Jul: 0,
      Aug: 0,
      Sep: 0,
      Oct: 0,
      Nov: 0,
      Dec: 0,
    };

    // Update paidAmountByMonth object with actual paidAmount values
    if (result.length > 0) {
      result.forEach((item) => {
        const monthName = item.month;
        const totalPaidAmount = item.totalPaidAmount;
        paidAmountByMonth[monthName] = totalPaidAmount;
      });
    }
    res.status(200).json(paidAmountByMonth);
  } catch (error) {
    serverError(res, error);
  }
};

module.exports = {
  GetBills,
  GetTemopraryBills,
  getYearlyBillCreated,
  getPaidAmountByMonth,
};
