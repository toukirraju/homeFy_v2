const ApartmentModel = require("../database/models/apartmentModel");
const RenterModel = require("../database/models/renterModel");

const { serverError, resourceError } = require("../utils/error");

const assignRenter = async (req, res) => {
  const { ownerId, renterId } = req.body;
  //update apartment

  try {
    const apartmentInfo = await ApartmentModel.findOne({
      ownerId: req.body.ownerId,
    });
    if (apartmentInfo) {
      let apartmentData;
      apartmentInfo.allApartments.filter((i) => {
        if (i._id == req.body.apartmentId) {
          return (apartmentData = i);
        }
      });

      if (apartmentData !== undefined) {
        apartmentData.isAvailable = false;
        apartmentData.renterId = req.body.renterId;
        apartmentData.renterName = req.body.renterName;

        await apartmentInfo.save();
      } else {
        return resourceError(res, "id dosen't match");
      }
    }
  } catch (error) {
    serverError(res, error);
  }

  //update renter

  try {
    const renter = await RenterModel.findById({ _id: renterId });
    // if (renter.ownerId === ownerId) {
    await renter.updateOne({
      $set: {
        ownerId: req.body.ownerId,
        apartmentId: req.body.apartmentId,
        apartNo: req.body.apartNo,
        roomNo: req.body.roomNo,
      },
    });
    res.status(200).json({
      message: "successfully assigned",
    });
    // } else {
    //   return resourceError(res, "Action forbidden");
    // }
  } catch (error) {
    serverError(res, error);
  }
};

const removeAssignedRenter = async (req, res) => {
  const { ownerId, renterId } = req.body;
  //update apartment
  try {
    const apartmentInfo = await ApartmentModel.findOne({
      ownerId: req.body.ownerId,
    });
    if (apartmentInfo) {
      let apartmentData;
      apartmentInfo.allApartments.filter((i) => {
        if (i._id == req.body.apartmentId) {
          return (apartmentData = i);
        }
      });

      if (apartmentData !== undefined) {
        apartmentData.isAvailable = true;
        apartmentData.renterId = "";
        apartmentData.renterName = "";

        await apartmentInfo.save();
      } else {
        return resourceError(res, "id dosen't match");
      }
    }
  } catch (error) {
    serverError(res, error);
  }

  //update renter

  try {
    const renter = await RenterModel.findById({ _id: renterId });
    if (renter.ownerId === ownerId) {
      await renter.updateOne({
        $set: {
          apartmentId: "",
          apartNo: "",
          roomNo: "",
        },
      });
      res.status(200).json({
        message: "successfully unassigned",
      });
    } else {
      return resourceError(res, "Action forbidden");
    }
  } catch (error) {
    serverError(res, error);
  }
};

module.exports = {
  assignRenter,
  removeAssignedRenter,
};
