const router = require("express").Router();
const authenticate = require("../middlewares/authenticate");

const { authVerify } = require("../middlewares/authVerify");

const {
  createBill,
  deleteBill,
  monthlyBill,
  allTempBills,
  userTempBill,
  createUserTempBill,
  updateTempBill,
  payableRenters,
  deleteTempBill,
} = require("../controllers/billController");

//create bill Route
router.post("/create", [authVerify.verifyToken], createBill);
//delete bill Route
router.delete(
  "/delete/:id",
  [authVerify.verifyToken, authVerify.isOwner],
  deleteBill
);
//get monthly bills Route
router.get("/:month/:year", [authVerify.verifyToken], monthlyBill);

//create user temporary bill Route
router.post(
  "/temp/create",
  [authVerify.verifyToken, authVerify.isOwner],
  createUserTempBill
);
//get all temp bills Route
router.get("/temp", [authVerify.verifyToken], allTempBills);
//get user temp bill Route
router.get("/temp/r/:id", [authVerify.verifyToken], userTempBill);
//update user temporary bill Route
router.post(
  "/temp/update",
  [authVerify.verifyToken, authVerify.isOwner],
  updateTempBill
);
//delete temporay bill Route
router.delete(
  "/temp/delete/:id",
  [authVerify.verifyToken, authVerify.isOwner],
  deleteTempBill
);

//get payable renter Route
router.get("/payable/:month/:year", [authVerify.verifyToken], payableRenters);

module.exports = router;
