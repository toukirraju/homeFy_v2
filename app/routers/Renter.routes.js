const router = require("express").Router();
const authenticate = require("../middlewares/authenticate");

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
  removeRenterFormHome,
} = require("../controllers/RenterController");

//create renter Route
router.post("/create", authenticate, createRenter);
//get all renter Route
router.get("/getAll", authenticate, getAllRenters);
//find renter Route
router.get("/find/:searchId", authenticate, findRenter);
//update renter Route
router.put("/update/:id", authenticate, updateRenter);
//remove renter Route
router.put("/remove/:id", authenticate, removeRenterFormHome);
//delete renter Route
router.delete("/delete/:id", authenticate, deleteRenter);

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
////\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//

//assign renter Route
router.post("/assign", authenticate, assignRenter);
//unassign renter Route
router.post("/unassign", authenticate, removeAssignedRenter);

module.exports = router;
