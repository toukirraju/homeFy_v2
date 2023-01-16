const HouseInfo = require("../database/models/houseInfoModel");
const { serverError, resourceError } = require("../utils/error");

const getHouseDetails = async (req, res) => {
  // const { ownerId } = req.body;

  const { id } = req.params;

  try {
    const house = await HouseInfo.findById({ _id: id });
    // console.log(house);
    const demoHouse = new HouseInfo({
      _id: id,
      houseName: "House name",
      houseNo: "House number",
      village: "Village",
      district: "District",
      division: "Division",
    });
    if (house) {
      // await house.updateOne({ $set: demoHouse });
      res.status(200).json(house);
    } else {
      // try {
      //   await demoHouse.save();
      res.status(200).json(demoHouse);

      // } catch (error) {
      //   serverError(res, error);
      // }
      // resourceError(res, "please update house info");
    }
  } catch (error) {
    serverError(res, error);
  }
};

const UpdateHouseDetails = async (req, res) => {
  // const { ownerId } = req.body;
  // console.log(req.body);
  // const { id } = req.params;
  try {
    const house = await HouseInfo.findById({ _id: req.body._id });

    const newHouse = new HouseInfo({
      _id: req.body._id,
      desc: req.body.desc,
      ownerName: req.body.ownerName,
      ownerPhone: req.body.ownerPhone,
      houseName: req.body.houseName,
      houseNo: req.body.houseNo,
      village: req.body.village,
      district: req.body.district,
      division: req.body.division,
    });
    if (house) {
      await house.updateOne({ $set: req.body });
      res.status(200).json(newHouse);
    } else {
      try {
        await newHouse.save();
        res.status(200).json(newHouse);
      } catch (error) {
        serverError(res, error);
      }
    }
  } catch (error) {
    serverError(res, error);
  }
};

module.exports = { UpdateHouseDetails, getHouseDetails };
