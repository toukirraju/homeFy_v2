const router = require("express").Router();
const { authVerify } = require("../middlewares/authVerify");

const {
  register,
  login,
  adminCreate,
  adminLogin,
} = require("../controllers/AuthController");

//Registration Route
router.post("/register", register);

//Login Route
router.post("/login", login);

//********* New Admin Create Route ************//
router.post(
  "/admin/create",
  [authVerify.verifyToken, authVerify.isSuperAdmin],
  adminCreate
);

//********* Admin Login Route************//
router.post("/admin/login", adminLogin);

module.exports = router;
