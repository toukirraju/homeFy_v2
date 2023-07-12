const router = require("express").Router();
const { authVerify } = require("../../middlewares/authVerify");

const {
  getDashboardWidgets,
} = require("../../controllers/admin/AdminDashboardController");

//********* Get All houses ************//
router.get("/widgets", [authVerify.verifyToken], getDashboardWidgets);

module.exports = router;
