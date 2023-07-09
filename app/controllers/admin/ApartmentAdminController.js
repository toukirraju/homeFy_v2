const { serverError, resourceError } = require("../../utils/error");

const ApartmentInfo = require("../../database/models/apartmentModel");

//********* Get All Renters ************\\

const GetApartments = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const filter = {};
  // if (username) {
  //   filter.username = { $regex: new RegExp(username, "i") };
  // }

  try {
    const apartments = await ApartmentInfo.aggregate([
      { $match: filter },
      { $sort: { createdAt: -1 } },
      { $project: { password: 0 } },
      { $skip: (page - 1) * limit },
      { $limit: parseInt(limit) },
    ]);

    const count = await ApartmentInfo.find(filter).countDocuments();

    if (apartments.length > 0) {
      res.status(200).json({
        apartments,
        pagination: {
          totalRecords: Number(count),
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
        },
      });
    } else {
      return resourceError(res, "No Apartment found");
    }
  } catch (error) {
    serverError(res, error);
  }
};

// Controller function to get monthly created apartments per year
const getApartmentsChartData = async (req, res) => {
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

    const monthlyData = await ApartmentInfo.find(query);

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

    // Create an object with the monthly totals, including months with no apartments
    const monthlyTotalsObject = {};

    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      const monthName = new Date(0, monthIndex).toLocaleString("en-US", {
        month: "short",
      });
      monthlyTotalsObject[monthName.toLowerCase()] =
        monthlyTotals[monthName] || 0;
    }

    // Count the number of blocked and not blocked apartments in all documents
    const avilableApartmentCount = await ApartmentInfo.countDocuments({
      isAvailable: true,
    });
    const notAvilableApartmentCount = await ApartmentInfo.countDocuments({
      isAvailable: false,
    });

    res.status(200).json({
      yearlyCreatedApartment: monthlyTotalsObject,
      avilableApartmentCount,
      notAvilableApartmentCount,
    });
  } catch (error) {
    serverError(res, error);
  }
};

module.exports = {
  GetApartments,
  getApartmentsChartData,
};
