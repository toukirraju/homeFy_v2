const router = require("express").Router();
const { authVerify } = require("../../middlewares/authVerify");

const {
  GetOwners,
  getOwnersData,
} = require("../../controllers/admin/OwnerAdminController");

//********* Get All houses ************//
router.get("/", [authVerify.verifyToken], GetOwners);

router.get("/charts", [authVerify.verifyToken], getOwnersData);

module.exports = router;
