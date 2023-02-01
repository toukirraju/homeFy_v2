const router = require("express").Router();
const { authVerify } = require("../middlewares/authVerify");

const {
  UpdatePersonalProfile,
  UpdateAdminProfile,
  DeleteAdminProfile,
  GetAllAdmins,
} = require("../controllers/AdminController");

//********* Get All Admins ************//
router.get("/all", GetAllAdmins);

//********* Update Personal Profile ************//
router.put("/personal/update", [authVerify.verifyToken], UpdatePersonalProfile);

//********* Update Admin Profile ************//
router.put(
  "/update/:id",
  [authVerify.verifyToken, authVerify.isSuperAdmin],
  UpdateAdminProfile
);

//********* Delete Admin Profile ************//
router.delete(
  "/delete/:id",
  [authVerify.verifyToken, authVerify.isSuperAdmin],
  DeleteAdminProfile
);

module.exports = router;
