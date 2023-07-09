const { serverError, resourceError } = require("../../utils/error");

const OwnerInfo = require("../../database/models/ownerModel");

//********* Get All Owners ************\\

const GetOwners = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const filter = {};
  // if (username) {
  //   filter.username = { $regex: new RegExp(username, "i") };
  // }

  try {
    const owners = await OwnerInfo.aggregate([
      { $match: filter },
      { $sort: { createdAt: -1 } },
      { $project: { password: 0 } },
      { $skip: (page - 1) * limit },
      { $limit: parseInt(limit) },
    ]);

    const count = await OwnerInfo.find(filter).countDocuments();

    if (owners.length > 0) {
      res.status(200).json({
        owners,
        pagination: {
          totalRecords: Number(count),
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
        },
      });
    } else {
      return resourceError(res, "No owner found");
    }
  } catch (error) {
    serverError(res, error);
  }
};

// Controller function to get monthly created owners per year
const getOwnersData = async (req, res) => {
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

    const monthlyData = await OwnerInfo.find(query);

    // Initialize an object to store monthly totals
    const monthlyTotals = {};

    // Iterate over the monthly data and calculate the totals for each month
    monthlyData.forEach((owner) => {
      const month = owner.createdAt.getMonth(); // Get the month index (0-11)
      const monthName = new Date(0, month).toLocaleString("en-US", {
        month: "short",
      }); // Get the month name
      const existingTotal = monthlyTotals[monthName] || 0;
      monthlyTotals[monthName] = existingTotal + 1; // Increment the count for the month
    });

    // Create an object with the monthly totals, including months with no owners
    const monthlyTotalsObject = {};

    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      const monthName = new Date(0, monthIndex).toLocaleString("en-US", {
        month: "short",
      });
      monthlyTotalsObject[monthName.toLowerCase()] =
        monthlyTotals[monthName] || 0;
    }

    // Count the number of blocked and not blocked owners in all documents
    const blockedOwnerCount = await OwnerInfo.countDocuments({
      isBlocked: true,
    });
    const notBlockedOwnerCount = await OwnerInfo.countDocuments({
      isBlocked: false,
    });
    // Count the number of owner and manager in all documents
    const ownersCount = await OwnerInfo.countDocuments({
      role: "owner",
    });
    const managersCount = await OwnerInfo.countDocuments({ role: "manager" });
    const premiumOwner = await OwnerInfo.countDocuments({ isHomifyPlus: true });

    res.status(200).json({
      yearlyCreatedOwner: monthlyTotalsObject,
      ownersCount,
      managersCount,
      premiumOwner,
      blockedOwnerCount,
      notBlockedOwnerCount,
    });
  } catch (error) {
    serverError(res, error);
  }
};

module.exports = {
  GetOwners,
  getOwnersData,
};
