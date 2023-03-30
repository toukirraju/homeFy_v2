const router = require("express").Router();
const { getAllAddress } = require("../controllers/MapController");

router.get("/address", getAllAddress);

module.exports = router;
