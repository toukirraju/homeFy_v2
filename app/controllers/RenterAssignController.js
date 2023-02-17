const ApartmentModel = require("../database/models/apartmentModel");
const RenterModel = require("../database/models/renterModel");

const { serverError, resourceError } = require("../utils/error");

const assignRenter = async (req, res) => {
  const { renterId, renterName, apartmentId } = req.body;
  const { _id, defaultHomeID } = req.user;
  //update apartment

  const apartment = await ApartmentModel.findById(apartmentId);
  const renter = await RenterModel.findById({ _id: renterId });
  try {
    if (!apartment) return resourceError(res, "Apartment not found");
    if (!renter) return resourceError(res, "Renter not found");
    if (apartment.ownerId === _id.toString()) {
      await apartment.updateOne({
        $set: {
          isAvailable: false,
          renterId,
          renterName,
        },
      });
    } else {
      return resourceError(res, "Action forbidden");
    }

    if (renter.apartmentId === "" && renter.apartment === null) {
      await renter.updateOne({
        $set: {
          ownerId: _id,
          defaultHomeID: defaultHomeID,
          apartmentId: req.body.apartmentId,
          apartment_number: req.body.apartment_number,
          roomNumber: req.body.roomNumber,
          apartment: req.body.apartmentId,
          assignedDate: new Date(),
        },
      });
      res.status(200).json({
        message: "successfully assigned",
      });
    } else {
      return resourceError(res, "Action forbidden");
    }
  } catch (error) {
    serverError(res, error);
  }
  // try {
  //   const apartmentInfo = await ApartmentModel.findOne({
  //     ownerId: _id,
  //     defaultHomeID,
  //   });
  //   if (apartmentInfo) {
  //     let apartmentData;
  //     apartmentInfo.allApartments.filter((apartment) => {
  //       if (apartment._id == apartmentId) {
  //         return (apartmentData = apartment);
  //       }
  //     });

  //     if (apartmentData !== undefined) {
  //       apartmentData.isAvailable = false;
  //       apartmentData.renterId = renterId;
  //       apartmentData.renterName = renterName;

  //       await apartmentInfo.save();
  //     } else {
  //       return resourceError(res, "id dosen't match");
  //     }
  //   }
  // } catch (error) {
  //   serverError(res, error);
  // }

  //update renter

  // try {
  //   const renter = await RenterModel.findById({ _id: renterId });
  //   // if (renter.ownerId === ownerId) {
  //   await renter.updateOne({
  //     $set: {
  //       ownerId: ownerId,
  //       defaultHomeID: defaultHomeID,
  //       apartmentId: req.body.apartmentId,
  //       apartment_number: req.body.apartment_number,
  //       roomNumber: req.body.roomNumber,
  //       assignedDate: new Date(),
  //       apartment: req.body.apartmentId,
  //     },
  //   });
  //   res.status(200).json({
  //     message: "successfully assigned",
  //   });
  //   // } else {
  //   //   return resourceError(res, "Action forbidden");
  //   // }
  // } catch (error) {
  //   serverError(res, error);
  // }
};

const removeAssignedRenter = async (req, res) => {
  const { ownerId, renterId, apartmentId } = req.body;
  const { _id, defaultHomeID } = req.user;
  //update apartment

  const apartment = await ApartmentModel.findById(apartmentId);
  const renter = await RenterModel.findById({ _id: renterId });
  try {
    if (!apartment) return resourceError(res, "Apartment not found");
    if (!renter) return resourceError(res, "Renter not found");
    if (apartment.ownerId == _id) {
      await apartment.updateOne({
        $set: {
          isAvailable: true,
          renterId: "",
          renterName: "",
        },
      });
    } else {
      return resourceError(res, "Action forbidden");
    }

    if (renter.ownerId == _id) {
      await renter.updateOne({
        $set: {
          apartmentId: "",
          apartment_number: "",
          roomNumber: "",
          apartment: null,
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
