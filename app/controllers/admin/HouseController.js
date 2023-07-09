const { serverError, resourceError } = require("../../utils/error");

const HouseInfo = require("../../database/models/houseInfoModel");

//********* Get All Houses ************\\

const GetHouses = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const filter = {};
  // if (username) {
  //   filter.username = { $regex: new RegExp(username, "i") };
  // }

  try {
    const houses = await HouseInfo.aggregate([
      { $match: filter },
      { $sort: { createdAt: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: parseInt(limit) },
      // Populate the role field using the AdminRole model
      {
        $lookup: {
          from: "adressmodels",
          localField: "address",
          foreignField: "_id",
          as: "address",
        },
      },
      // Unwind the role array to get a single object
      { $unwind: "$address" },
    ]);

    const count = await HouseInfo.find(filter).countDocuments();

    if (houses.length > 0) {
      res.status(200).json({
        houses,
        pagination: {
          totalRecords: Number(count),
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
        },
      });
    } else {
      return resourceError(res, "No house found");
    }
  } catch (error) {
    serverError(res, error);
  }
};

// Controller function to get monthly created houses per year
const getMonthlyCreatedHouses = async (req, res) => {
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

    const monthlyData = await HouseInfo.find(query);

    // Initialize an object to store monthly totals
    const monthlyTotals = {};

    // Iterate over the monthly data and calculate the totals for each month
    monthlyData.forEach((house) => {
      const month = house.createdAt.getMonth(); // Get the month index (0-11)
      const monthName = new Date(0, month).toLocaleString("en-US", {
        month: "short",
      }); // Get the month name
      const existingTotal = monthlyTotals[monthName] || 0;
      monthlyTotals[monthName] = existingTotal + 1; // Increment the count for the month
    });

    // Create an object with the monthly totals, including months with no houses
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

// Controller function to get yearly regional houses
const getRegionalHouses = async (req, res) => {
  const year = req.query.year; // Get the year from the request query parameter

  try {
    let query = {};

    // If year is provided, filter the data by year
    if (year) {
      const startDate = new Date(year, 0, 1); // January 1st of the specified year
      const endDate = new Date(year, 11, 31, 23, 59, 59); // December 31st of the specified year
      query.createdAt = { $gte: startDate, $lte: endDate };
    }

    const houseData = await HouseInfo.find(query)
      .populate({
        path: "address",
        model: "AdressModel",
        // select: "state",
      })
      .exec();

    // Initialize an object to store state totals
    const stateTotals = {};

    // Calculate the totals for each state
    houseData.forEach((house) => {
      const state = house.address.state;
      stateTotals[state] = (stateTotals[state] || 0) + 1; // Increment the count for the state
    });

    res.status(200).json(stateTotals);
  } catch (error) {
    serverError(res, error);
  }
};

// Controller function to count verified and not verified houses
const countVerifiedHouses = async (req, res) => {
  try {
    const verifiedCount = await HouseInfo.countDocuments({ isVerified: true });
    const notVerifiedCount = await HouseInfo.countDocuments({
      isVerified: false,
    });

    res
      .status(200)
      .json({ verified: verifiedCount, notVerified: notVerifiedCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  GetHouses,
  getMonthlyCreatedHouses,
  getRegionalHouses,
  countVerifiedHouses,
};
