const router = require("express").Router();
const { authVerify } = require("../middlewares/authVerify");

const {
  register,
  login,
  adminCreate,
  adminLogin,
  OwnerRegister,
  OwnerLogin,
} = require("../controllers/AuthController");

//client Registration Route
router.post("/register", register);

//client Login Route
router.post("/login", login);

//*********oooooooooo Home owner sign up Route oooooooooo************//
router.post("/owner/signup", OwnerRegister);

//*********oooooooooo Home owner sign in Route oooooooooo************//
router.post("/owner/signin", OwnerLogin);

//*********aaaaaaaaa New Admin Create Route aaaaaaaaa************//
router.post(
  "/admin/create",
  [authVerify.verifyToken, authVerify.isSuperAdmin],
  adminCreate
);

//*********aaaaaaaaa Admin Login Route aaaaaaaaa************//
router.post("/admin/login", adminLogin);

module.exports = router;
