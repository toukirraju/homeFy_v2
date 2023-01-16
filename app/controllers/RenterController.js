const RenterInfoModel = require("../database/models/renterModel");
const { serverError, resourceError } = require("../utils/error");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// Create new renter

const createRenter = async (req, res) => {
  const password = "12345";
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  const newRenter = new RenterInfoModel({
    ownerId: req.body.ownerId,
    username: req.body.username,
    phoneNo: req.body.phoneNo,
    password: hashedPass,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    livesin: req.body.livesin,
    nid: req.body.nid,
    apartmentId: "",
    apartNo: "",
    roomNo: "",
    advanceRent: req.body.advanceRent,
  });
  try {
    const renter = await RenterInfoModel.findOne({
      username: req.body.username,
    });

    if (!renter) {
      await newRenter.save();
      res.status(201).json({
        message: "Successfully Created",
      });
    } else {
      return resourceError(res, "Renter Already Created!");
    }
  } catch (error) {
    serverError(res, error);
  }
};

// Get all renter

const getAllRenters = async (req, res) => {
  let { _id } = req.user;
  // adminId: role === "" || role === undefined ? _id : homeId,
  // ownerId: role === "owner" ? _id : ownerId,

  let renters = await RenterInfoModel.find({
    ownerId: _id,
  });
  try {
    if (renters) {
      renters = renters.map((renter) => {
        const { password, ...otherDetails } = renter._doc;
        return otherDetails;
      });
      res.status(200).json(renters);
    } else {
      return resourceError(res, "No renter found");
    }
  } catch (error) {
    serverError(res, error);
  }
};

// find renter

const findRenter = async (req, res) => {
  // let { _id } = req.user;
  const { searchId } = req.params;
  let renter = await RenterInfoModel.findOne({
    // username: searchId,
    // phoneNo: searchId,
    $or: [
      {
        username: searchId,
      },
      {
        phoneNo: searchId,
      },
    ],
  });
  try {
    if (renter) {
      if (
        renter.ownerId === "" ||
        renter.ownerId === null ||
        renter.ownerId === undefined
      ) {
        // renter = renter.map((renter) => {
        const { password, ...otherDetails } = renter._doc;
        //   return otherDetails;
        // });
        res.status(200).json(otherDetails);
      } else {
        return resourceError(res, "Renter is already assigned");
      }
    } else {
      return resourceError(res, "No renter found");
    }
  } catch (error) {
    serverError(res, error);
  }
};

// Update a renter

const updateRenter = async (req, res) => {
  const renterId = req.params.id;
  // const { ownerId } = req.body;
  const { _id } = req.user;

  try {
    const renter = await RenterInfoModel.findById(renterId);
    if (renter.ownerId == _id) {
      await renter.updateOne({ $set: req.body });
      res.status(201).json({
        message: "Renter Updated",
      });
    } else {
      return resourceError(res, "Action forbidden");
    }
  } catch (error) {
    serverError(res, error);
  }
};

//remove renter form home

const removeRenterFormHome = async (req, res) => {
  const renterId = req.params.id;
  // const { ownerId } = req.body;
  const { _id } = req.user;

  try {
    const renter = await RenterInfoModel.findById({ _id: renterId });
    if (renter.ownerId == _id) {
      await renter.updateOne({
        $set: {
          ownerId: "",
          apartmentId: "",
          apartNo: "",
          roomNo: "",
          advanceRent: 0,
        },
      });
      res.status(200).json({
        message: "successfully removed",
      });
    } else {
      return resourceError(res, "Action forbidden");
    }
  } catch (error) {
    serverError(res, error);
  }
};
//delete Renter

const deleteRenter = async (req, res) => {
  const id = req.params.id;
  const { ownerId } = req.body;

  try {
    const renter = await RenterInfoModel.findById(id);
    if (renter.ownerId === ownerId) {
      await renter.deleteOne();
      res.status(201).json({
        message: "Renter deleted successfully",
      });
    } else {
      return resourceError(res, "Action forbidden");
    }
  } catch (error) {
    serverError(res, error);
  }
};

module.exports = {
  createRenter,
  getAllRenters,
  findRenter,
  updateRenter,
  removeRenterFormHome,
  deleteRenter,
};
