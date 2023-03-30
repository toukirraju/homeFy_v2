const AddressModel = require("../database/models/addressModel");
const { serverError, resourceError } = require("../utils/error");

//////////////////////////// get all posted address  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const getAllAddress = async (req, res) => {
  try {
    const addresses = await AddressModel.find({});

    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllAddress,
};
