const router = require("express").Router();
const { authVerify } = require("../../middlewares/authVerify");

const {
  GetHouses,
  getMonthlyCreatedHouses,
  getRegionalHouses,
  countVerifiedHouses,
} = require("../../controllers/admin/HouseController");

//********* Get All houses ************//
router.get("/", [authVerify.verifyToken], GetHouses);

router.get("/createdAt", [authVerify.verifyToken], getMonthlyCreatedHouses);
router.get("/regionalHouse", [authVerify.verifyToken], getRegionalHouses);
router.get("/verifiedHouse", [authVerify.verifyToken], countVerifiedHouses);

module.exports = router;
