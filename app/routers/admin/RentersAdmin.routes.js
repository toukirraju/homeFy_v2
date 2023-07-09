const router = require("express").Router();
const { authVerify } = require("../../middlewares/authVerify");

const {
  GetRenters,
  getRentersChartData,
} = require("../../controllers/admin/RenterAdminController");

//********* Get All houses ************//
router.get("/", [authVerify.verifyToken], GetRenters);

router.get("/charts", [authVerify.verifyToken], getRentersChartData);

module.exports = router;
