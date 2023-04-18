const ApartmentModel = require("../database/models/apartmentModel");
const { serverError, resourceError } = require("../utils/error");

const createMultipleApartment = async (req, res) => {
  let { numOfFloors } = req.body;
  const { _id, defaultHomeID } = req.user;
  try {
    const apartmentsInfo = await ApartmentModel.find({
      ownerId: _id,
      defaultHomeID,
    });
    if (apartmentsInfo.length === 0) {
      for (let index = 0; index < numOfFloors; index++) {
        const apartmentData = new ApartmentModel({
          ownerName: req.user.firstname + " " + req.user.lastname,
          ownerId: req.user._id,
          defaultHomeID: req.user.defaultHomeID,
          houseName: req.user.houseName,
          apartmentDetails: {
            floor: index + 1,
            apartmentName: `Apartment${index + 1}`,
            apartment_number: `${index + 1}`,
            apartmentType: "",
            roomNumber: `Room${index + 1}`,
            number_of_bed_room: 0,
            number_of_kitchen: 0,
            number_of_baths: 0,
            number_of_balcony: 0,
            apartment_length: 0,
          },
          billDetails: {
            rent: 0,
            gas_bill: 0,
            water_bill: 0,
            electricity_bill: 0,
            service_charge: 0,
            others: 0,
            totalRent: 0,
          },
          renterId: "",
          renterName: "",
        });
        await apartmentData.save();
        // console.log(apartmentData);
      }
      res.status(200).json({ message: "Multiple apartment created" });
    } else {
      const apartmentData = new ApartmentModel({
        ownerName: req.user.firstname + " " + req.user.lastname,
        ownerId: req.user._id,
        defaultHomeID: req.user.defaultHomeID,
        houseName: req.user.houseName,
        apartmentDetails: {
          floor: numOfFloors,
          apartmentName: `Apartment${numOfFloors}`,
          apartment_number: `${numOfFloors}`,
          apartmentType: "",
          roomNumber: `Room${numOfFloors}`,
          number_of_bed_room: 0,
          number_of_kitchen: 0,
          number_of_baths: 0,
          number_of_balcony: 0,
          apartment_length: 0,
        },
        billDetails: {
          rent: 0,
          gas_bill: 0,
          water_bill: 0,
          electricity_bill: 0,
          service_charge: 0,
          others: 0,
          totalRent: 0,
        },
        renterId: "",
        renterName: "",
      });
      await apartmentData.save();
      // console.log(apartmentData);
      res.status(200).json(apartmentData);
    }
  } catch (error) {
    serverError(res, error);
  }
};

const getAllApartments = async (req, res) => {
  const { _id, defaultHomeID, role } = req.user;
  const apartments = await ApartmentModel.find({
    ownerId: role === "owner" ? _id : req.user.ownerId,
    defaultHomeID,
  }).sort({ "apartmentDetails.floor": 1 });
  try {
    if (apartments) {
      const groupByApartments = (arr, property) => {
        let grouped = [];
        for (let i = 0; i < arr.length; i++) {
          let p = arr[i].apartmentDetails[property];
          if (!grouped[p]) {
            grouped[p] = []; //if property are not an grouped array then it will create new array
          }
          grouped[p].push(arr[i]); //property's are push on their own named array
        }
        return grouped;
      };
      const filtered = groupByApartments(apartments, "floor").filter(function (
        el
      ) {
        return el != null;
      });
      res.status(200).json(apartments);
    } else {
      return resourceError(res, "No apartment found");
    }
  } catch (error) {
    serverError(res, error);
  }
};

const updateApartmentInfo = async (req, res) => {
  //only owner can update apartment
  const { _id } = req.user;
  const apartment = await ApartmentModel.findById(req.body._id);

  try {
    if (apartment.ownerId == _id) {
      await apartment.updateOne({
        $set: {
          apartmentDetails: {
            apartmentName: req.body.apartmentDetails.apartmentName,
            apartment_number: req.body.apartmentDetails.apartment_number,
            apartmentType: req.body.apartmentDetails.apartmentType,
            roomNumber: req.body.apartmentDetails.roomNumber,
            floor: req.body.apartmentDetails.floor,
            number_of_bed_room: req.body.apartmentDetails.number_of_bed_room,
            number_of_kitchen: req.body.apartmentDetails.number_of_kitchen,
            number_of_baths: req.body.apartmentDetails.number_of_baths,
            number_of_balcony: req.body.apartmentDetails.number_of_balcony,
            apartment_length: req.body.apartmentDetails.apartment_length,
          },

          billDetails: {
            // ...req.body,
            rent: req.body.billDetails.rent,
            gas_bill: req.body.billDetails.gas_bill,
            water_bill: req.body.billDetails.water_bill,
            service_charge: req.body.billDetails.service_charge,
            others: req.body.billDetails.others,
            totalRent:
              parseInt(req.body.billDetails.rent) +
              parseInt(req.body.billDetails.gas_bill) +
              parseInt(req.body.billDetails.water_bill) +
              parseInt(req.body.billDetails.service_charge) +
              parseInt(req.body.billDetails.others),
          },
        },
      });
      res.status(201).json({
        message: "apartment updated",
      });
    } else {
      return resourceError(res, "Action forbidden");
    }
  } catch (error) {
    serverError(res, error);
  }
};

const removeApartment = async (req, res) => {
  const id = req.params.id;

  try {
    const apartment = await ApartmentModel.findById(id);
    if (apartment.ownerId === req.user._id.toString()) {
      await apartment.deleteOne();
      res.status(201).json({
        message: "successfully apartment deleted",
      });
    } else {
      return resourceError(res, "Action forbidden");
    }
  } catch (error) {
    serverError(res, error);
  }
};

module.exports = {
  createMultipleApartment,
  getAllApartments,
  updateApartmentInfo,
  removeApartment,
};
