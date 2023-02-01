const router = require("express").Router();
const { authVerify } = require("../middlewares/authVerify");
const {
  createMultipleApartment,
  getAllApartments,
  updateApartmentInfo,
  removeApartment,
} = require("../controllers/ApartmentController");

//apartment create Route
router.post(
  "/create",
  [authVerify.verifyToken, authVerify.isOwner],
  createMultipleApartment
);

//get all apartments  Route
router.get("/", [authVerify.verifyToken], getAllApartments);

//apartment update Route
router.post(
  "/update",
  [authVerify.verifyToken, authVerify.isOwner],
  updateApartmentInfo
);

//apartment remove Route
router.delete(
  "/:id",
  [authVerify.verifyToken, authVerify.isOwner],
  removeApartment
);

module.exports = router;
