const router = require("express").Router();
const { authVerify } = require("../../middlewares/authVerify");

const {
  GetApartments,
  getApartmentsChartData,
} = require("../../controllers/admin/ApartmentAdminController");

//********* Get All houses ************//
router.get("/", [authVerify.verifyToken], GetApartments);

router.get("/charts", [authVerify.verifyToken], getApartmentsChartData);

module.exports = router;
