const router = require("express").Router();
const { authVerify } = require("../../middlewares/authVerify");

const {
  GetBills,
  getYearlyBillCreated,
  getPaidAmountByMonth,
  GetTemopraryBills,
} = require("../../controllers/admin/BillAdminController");

//********* Get All houses ************//
router.get("/", [authVerify.verifyToken], GetBills);
router.get("/temp", [authVerify.verifyToken], GetTemopraryBills);

router.get("/count", [authVerify.verifyToken], getYearlyBillCreated);
router.get("/yearly-paid", [authVerify.verifyToken], getPaidAmountByMonth);

module.exports = router;
