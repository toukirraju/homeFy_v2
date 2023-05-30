const router = require("express").Router();
const authenticate = require("../middlewares/authenticate");
const { authVerify } = require("../middlewares/authVerify");
const {
  assignRenter,
  removeAssignedRenter,
} = require("../controllers/RenterAssignController");
const {
  createRenter,
  getAllRenters,
  updateRenter,
  deleteRenter,
  findRenter,
  removeRenterFromHome,
  getQueryRenters,
  PersonalProfile,
  TemporaryBill,
  updateProfile,
  forgotPassword,
  resetPassword,
} = require("../controllers/RenterController");

//create renter Route
router.post(
  "/create",
  [authVerify.verifyToken, authVerify.isOwner],
  createRenter
);
//get all renter Route
router.get("/getAll", [authVerify.verifyToken], getAllRenters);

//get renter personal profile Route
router.get("/profile", [authVerify.verifyToken], PersonalProfile);
//get renter personal profile Route
router.patch("/profile/:id", [authVerify.verifyToken], updateProfile);

//get renter personal profile Route
router.get("/temp-bill", [authVerify.verifyToken], TemporaryBill);

//get all renter Route
router.get("/all", [authVerify.verifyToken], getQueryRenters);
//find renter Route
router.get("/find/:searchId", [authVerify.verifyToken], findRenter);
//update renter Route
router.patch(
  "/update/:id",
  [authVerify.verifyToken, authVerify.isOwner],
  updateRenter
);
//remove renter Route
router.patch(
  "/remove/:id",
  [authVerify.verifyToken, authVerify.isOwner],
  removeRenterFromHome
);
//delete renter Route
router.delete(
  "/delete/:id",
  [authVerify.verifyToken, authVerify.isOwner],
  deleteRenter
);

//************* Forgot password request by email (renter) ***************\\
router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:id/:token", resetPassword);

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
////\\//\\//\\//\\//\\   Renter Assigning Routes  //\\//\\//\\//\\//\\//\\//
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

//assign renter Route
router.patch(
  "/assign",
  [authVerify.verifyToken, authVerify.isOwner],
  assignRenter
);
//unassign renter Route
router.patch(
  "/unassign",
  [authVerify.verifyToken, authVerify.isOwner],
  removeAssignedRenter
);

module.exports = router;
