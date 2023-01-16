const router = require("express").Router();
const authenticate = require("../middlewares/authenticate");

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
router.post("/create", authenticate, createBill);
//delete bill Route
router.delete("/delete/:id", authenticate, deleteBill);
//get monthly bills Route
router.get("/:month/:year", authenticate, monthlyBill);

//create user temporary bill Route
router.post("/temp/create", authenticate, createUserTempBill);
//get all temp bills Route
router.get("/temp", authenticate, allTempBills);
//get user temp bill Route
router.get("/temp/r/:id", authenticate, userTempBill);
//update user temporary bill Route
router.post("/temp/update", authenticate, updateTempBill);
//delete temporay bill Route
router.delete("/temp/delete/:id", authenticate, deleteTempBill);

//get payable renter Route
router.get("/payable/:month/:year", authenticate, payableRenters);

module.exports = router;
