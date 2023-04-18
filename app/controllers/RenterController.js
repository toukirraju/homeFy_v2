const RenterInfoModel = require("../database/models/renterModel");
const TempBillModel = require("../database/models/tempBillModel");

const { serverError, resourceError } = require("../utils/error");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

//************* Create new renter ***************\\

const createRenter = async (req, res) => {
  const password = "12345";
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  const newRenter = new RenterInfoModel({
    ownerId: req.user._id,
    defaultHomeID: req.user.defaultHomeID,
    houseName: req.user.houseName,

    username: req.body.username,
    phone: req.body.phone,
    password: hashedPass,
    fullname: req.body.fullname,
    permanent_address: req.body.permanent_address,
    street_no: req.body.street_no,
    postcode: req.body.postcode,
    NID_no: req.body.NID_no,

    // apartmentId: "",
    // apartment_number: "",
    // roomNo: "",
    advanceRent: req.body.advanceRent,
  });
  try {
    const renter = await RenterInfoModel.findOne({
      username: req.body.username,
    });

    if (!renter) {
      const renter = await newRenter.save();
      res.status(201).json(renter);
    } else {
      return resourceError(res, "Renter Already Created!");
    }
  } catch (error) {
    serverError(res, error);
  }
};

////********* get Personal Profile ************\\\\
const PersonalProfile = async (req, res) => {
  try {
    const pipeline = [
      //check user
      {
        $match: { _id: mongoose.Types.ObjectId(req.user._id) },
      },
      ////////////////////////////////////////////////////////////////// house model lookup start\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
      // check desired id have any  document on houseinfos model
      {
        $lookup: {
          from: "houseinfos",
          localField: "house",
          foreignField: "_id",
          as: "house",
        },
      },
      //check desired id have not any  document on houseinfos model then it return null
      {
        $addFields: {
          house: {
            $cond: {
              if: { $eq: [{ $ifNull: ["$house", null] }, null] },
              then: [],
              else: "$house",
            },
          },
        },
      },
      // if house lookup and addFields get null then unwind return null to the $group
      {
        $unwind: { path: "$house", preserveNullAndEmptyArrays: true },
      },
      ////////////////////////////////////////////////////////////////// house model lookup end\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

      ////////////////////////////////////////////////////////////////// address model lookup start\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
      // address model will now check with retrived house id
      {
        $lookup: {
          from: "adressmodels",
          localField: "house.address",
          foreignField: "_id",
          as: "address",
        },
      },
      //check desired id have not any  document on address model then it return null
      {
        $addFields: {
          address: {
            $cond: {
              if: { $eq: [{ $ifNull: ["$address", null] }, null] },
              then: [],
              else: "$address",
            },
          },
        },
      },
      // if address lookup and addFields get null then unwind return null to the $group
      {
        $unwind: { path: "$address", preserveNullAndEmptyArrays: true },
      },

      ////////////////////////////////////////////////////////////////// address model lookup end\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

      ////////////////////////////////////////////////////////////////// apartmentmodels model lookup start\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
      // check desired id have any  document on apartmentmodels model
      {
        $lookup: {
          from: "apartmentmodels",
          localField: "apartment",
          foreignField: "_id",
          as: "apartment",
        },
      },
      //check desired id have not any  document on apartmentmodels model then it return null
      {
        $addFields: {
          apartment: {
            $cond: {
              if: { $eq: [{ $ifNull: ["$apartment", null] }, null] },
              then: [],
              else: "$apartment",
            },
          },
        },
      },
      // if apartment lookup and addFields get null then unwind return null to the $group
      {
        $unwind: { path: "$apartment", preserveNullAndEmptyArrays: true },
      },
      ////////////////////////////////////////////////////////////////// apartmentmodels model lookup end\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
      ////////////////////////////////////////////////////////////////// billmodels model lookup start\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
      // check desired id have any  document on billmodels model
      {
        $lookup: {
          from: "billmodels",
          localField: "bills",
          foreignField: "_id",
          as: "bills",
        },
      },
      // if bills lookup and addFields get null then unwind return null to the $group
      {
        $unwind: { path: "$bills", preserveNullAndEmptyArrays: true },
      },
      ////////////////////////////////////////////////////////////////// billmodels model lookup end\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

      // making new group from retrived data
      {
        $group: {
          _id: "$_id",
          fullname: { $first: "$fullname" },
          assignedDate: { $first: "$assignedDate" },
          phone: { $first: "$phone" },
          username: { $first: "$username" },
          permanent_address: { $first: "$permanent_address" },
          street_no: { $first: "$street_no" },
          postcode: { $first: "$postcode" },
          NID_no: { $first: "$NID_no" },
          house: { $first: "$house" },
          houseAddress: { $first: "$address" },
          apartment: { $first: "$apartment" },
          bills: {
            $push: "$bills",
          },
          createdAt: { $first: "$createdAt" },
        },
      },
    ];

    let renter = await RenterInfoModel.aggregate(pipeline);

    if (renter.length > 0) {
      res.status(200).json(renter[0]);
    } else {
      return resourceError(res, "Does not recognize user");
    }
  } catch (error) {
    serverError(res, error);
  }
};
///user own profile update
const updateProfile = async (req, res) => {
  const renterId = req.params.id;
  // const { ownerId } = req.body;
  const { _id } = req.user;

  try {
    const renter = await RenterInfoModel.findById(renterId);
    if (renter._id.toString() == _id) {
      console.log(req.body);
      await renter.updateOne({ $set: req.body });
      res.status(201).json({
        message: "Profile Updated",
      });
    } else {
      return resourceError(res, "Action forbidden");
    }
  } catch (error) {
    serverError(res, error);
  }
};

////********* get Personal Temporary bill ************\\\\
const TemporaryBill = async (req, res) => {
  const { _id, defaultHomeID } = req.user;

  let tempObj = new Object({
    electricity_bill: 0,
    others: 0,
    tempDue: 0,
  });

  const tempBill = await TempBillModel.aggregate([
    {
      $match: {
        $and: [
          {
            ownerId: req.user.ownerId,
            defaultHomeID,
          },
          { _id: _id.toString() },
        ],
      },
    },
  ]);
  try {
    if (tempBill.length != 0) {
      res.status(200).json(tempBill[0]);
    } else {
      res.status(200).json(tempObj);
      // return resourceError(res, "Temporary bill not found");
    }
  } catch (error) {
    serverError(res, error);
  }
};

//************* Get all renter ***************\\
const getAllRenters = async (req, res) => {
  let { _id, defaultHomeID, role } = req.user;
  // adminId: role === "" || role === undefined ? _id : homeId,
  // ownerId: role === "owner" ? _id : ownerId,

  let renters = await RenterInfoModel.find({
    ownerId: role === "owner" ? _id : req.user.ownerId,
    defaultHomeID,
  }).populate([
    {
      path: "apartment",
      model: "ApartmentModel",
    },
    {
      path: "bills",
      model: "BillModel",
      // options: {
      //   limit: pageSize,
      //   skip: (pageNumber - 1) * pageSize,
      // },
    },
  ]);
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

//************* Get Query renter ***************\\
const getQueryRenters = async (req, res) => {
  let { _id, defaultHomeID } = req.user;
  // const {pageSize,pageNumber} = req.query;

  const startRow = req.query.s_page;
  const endRow = req.query.e_page;
  // adminId: role === "" || role === undefined ? _id : homeId,
  // ownerId: role === "owner" ? _id : ownerId,

  let renters = await RenterInfoModel.find({
    ownerId: _id,
    defaultHomeID,
  })
    .limit(endRow)
    .skip((startRow - 1) * endRow)
    .populate([
      {
        path: "apartment",
        model: "ApartmentModel",
      },
      {
        path: "bills",
        model: "BillModel",
        // options: {
        //   limit: endRow,
        //   skip: (startRow - 1) * endRow,
        // },
      },
    ]);
  // console.log(renters);
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

//************* find renter ***************\\
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
        phone: searchId,
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

//
//************* Update a renter by home owner ***************\\
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

//
//************* remove renter from home ***************\\
const removeRenterFromHome = async (req, res) => {
  const renterId = req.params.id;
  // const { ownerId } = req.body;
  const { _id } = req.user;

  try {
    const renter = await RenterInfoModel.findById({ _id: renterId });
    if (renter.ownerId == _id) {
      await renter.updateOne({
        $set: {
          ownerId: "",
          defaultHomeID: "",
          house: null,
          houseName: "",
          apartmentId: "",
          apartment_number: "",
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
  PersonalProfile,
  updateProfile,
  TemporaryBill,
  getAllRenters,
  getQueryRenters,
  findRenter,
  updateRenter,
  removeRenterFromHome,
  deleteRenter,
};
