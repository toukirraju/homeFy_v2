const ApartmentModel = require("../database/models/apartmentModel");
const RenterModel = require("../database/models/renterModel");

const { serverError, resourceError } = require("../utils/error");

const assignRenter = async (req, res) => {
  const { renterId, renterName, apartmentId } = req.body;
  const { _id, defaultHomeID } = req.user;

  try {
    // update apartment
    const filterApartment = { _id: apartmentId };
    const updateApartment = {
      $set: {
        isAvailable: false,
        renterId,
        renterName,
      },
    };
    const apartmentOptions = { returnDocument: "after" };
    const updatedApartment = await ApartmentModel.findOneAndUpdate(
      filterApartment,
      updateApartment,
      apartmentOptions
    );

    // update renter
    const filterRenter = { _id: renterId };
    const updateRenter = {
      $set: {
        ownerId: _id,
        defaultHomeID: defaultHomeID,
        house: defaultHomeID,
        apartmentId: req.body.apartmentId,
        apartment_number: req.body.apartment_number,
        roomNumber: req.body.roomNumber,
        apartment: req.body.apartmentId,
        assignedDate: new Date(),
      },
    };
    const RenterOptions = { returnDocument: "after" };
    const updatedRenter = await RenterModel.findOneAndUpdate(
      filterRenter,
      updateRenter,
      RenterOptions
    );

    if (!updatedApartment) return resourceError(res, "Apartment not updated");
    if (!updatedRenter) return resourceError(res, "Renter not updated");

    res.status(200).json({ updatedRenter, updatedApartment });
  } catch (error) {
    serverError(res, error);
  }
};

const removeAssignedRenter = async (req, res) => {
  const { ownerId, renterId, apartmentId } = req.body;
  const { _id, defaultHomeID } = req.user;
  //update apartment

  const apartment = await ApartmentModel.findById(apartmentId);
  const renter = await RenterModel.findById({ _id: renterId });
  try {
    // update apartment
    const filterApartment = { _id: apartmentId };
    const updateApartment = {
      $set: {
        isAvailable: true,
        renterId: "",
        renterName: "",
      },
    };
    const apartmentOptions = { returnDocument: "after" };
    const updatedApartment = await ApartmentModel.findOneAndUpdate(
      filterApartment,
      updateApartment,
      apartmentOptions
    );

    // update renter
    const filterRenter = { _id: renterId };
    const updateRenter = {
      $set: {
        apartmentId: "",
        apartment_number: "",
        roomNumber: "",
        apartment: null,
      },
    };
    const RenterOptions = { returnDocument: "after" };
    const updatedRenter = await RenterModel.findOneAndUpdate(
      filterRenter,
      updateRenter,
      RenterOptions
    );

    if (!updatedApartment) return resourceError(res, "Apartment not updated");
    if (!updatedRenter) return resourceError(res, "Renter not updated");

    res.status(200).json({ updatedRenter, updatedApartment });

    // if (apartment.ownerId == _id) {
    //   await apartment.updateOne({
    //     $set: {
    //       isAvailable: true,
    //       renterId: "",
    //       renterName: "",
    //     },
    //   });
    // } else {
    //   return resourceError(res, "Action forbidden");
    // }

    // if (renter.ownerId == _id) {
    //   await renter.updateOne({
    //     $set: {
    //       apartmentId: "",
    //       apartment_number: "",
    //       roomNumber: "",
    //       apartment: null,
    //     },
    //   });
    //   res.status(200).json({
    //     message: "successfully unassigned",
    //   });
    // } else {
    //   return resourceError(res, "Action forbidden");
    // }
  } catch (error) {
    serverError(res, error);
  }
};

module.exports = {
  assignRenter,
  removeAssignedRenter,
};
