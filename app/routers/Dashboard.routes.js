const {
  getPerYearBills,
  activeRenters,
  getPieChartData,
  getApartmentWidgetData,
} = require("../controllers/DashboardController");
const { authVerify } = require("../middlewares/authVerify");

const router = require("express").Router();

//get Yearly bills Route
router.get("/bills/:year", [authVerify.verifyToken], getPerYearBills);

//get renter activity Route
router.get("/activity", [authVerify.verifyToken], activeRenters);

//get Pie chart data Route
router.get("/pie", [authVerify.verifyToken], getPieChartData);

//get apartment widget Route
router.get("/widget", [authVerify.verifyToken], getApartmentWidgetData);

module.exports = router;
