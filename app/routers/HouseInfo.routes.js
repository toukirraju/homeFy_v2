const router = require("express").Router();

const {
  UpdateHouseDetails,
  getHouseDetails,
} = require("../controllers/HouseInfoController");

//get houseinfo Route
router.get("/info/:id", getHouseDetails);

//update houseinfo Route
router.post("/info", UpdateHouseDetails);

module.exports = router;
