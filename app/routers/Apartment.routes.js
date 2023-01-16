const router = require("express").Router();
const authenticate = require("../middlewares/authenticate");

const {
  createMultipleApartment,
  getAllApartments,
  updateApartmentInfo,
  removeApartment,
} = require("../controllers/ApartmentController");

//apartment create Route
router.post("/create", authenticate, createMultipleApartment);

//get all apartments  Route
router.get("/", authenticate, getAllApartments);

//apartment update Route
router.post("/update", authenticate, updateApartmentInfo);

//apartment remove Route
router.delete("/:id", authenticate, removeApartment);

module.exports = router;
