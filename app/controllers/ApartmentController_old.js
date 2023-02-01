const ApartmentModel = require("../database/models/apartmentModel");
const { serverError, resourceError } = require("../utils/error");

const createMultipleApartment = async (req, res) => {
  let { numOfFloors } = req.body;

  //this array used only 1st time when multiple apartment need to create
  const apartmentsArray = Array.from({ length: numOfFloors }, (_, index) => ({
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
  }));
  //mongodb schema instance
  let apartmentData = new ApartmentModel({
    ownerName: req.user.firstname + " " + req.user.lastname,
    ownerId: req.user._id,
    defaultHomeID: req.user.defaultHomeID,
    houseName: req.user.houseName,
    allApartments: apartmentsArray,
  });

  try {
    const apartmentsInfo = await ApartmentModel.findOne({
      ownerId: req.user._id,
      defaultHomeID: req.user.defaultHomeID,
    });
    if (apartmentsInfo) {
      //if apartment already created in the user id's
      //then check allApartments array is empty or not?
      if (apartmentsInfo.allApartments.length === 0) {
        // if empty then it enter this section

        for (let i = 0; i < numOfFloors; i++) {
          //create multiple apartments
          let multiObject = new Object({
            apartmentDetails: {
              floor: i + 1,
              apartmentName: `Apartment${i + 1}`,
              apartment_number: `${i + 1}`,
              apartmentType: "",
              roomNumber: `Room${i + 1}`,
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
          apartmentsInfo.allApartments.push(multiObject); //push on allApartment array
        }
        await apartmentsInfo.save();
        res.status(200).json({ message: "Create successfully" });
      } else {
        // if not empty then it will enter else section
        //and create single apartments
        let singleObj = new Object({
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

        apartmentsInfo.allApartments.push(singleObj); //signle object push on existing allApartments arry
        await apartmentsInfo.save();
        res.status(200).json({ message: "Create successfully" });
      }
    } else {
      //if apartment not created in requested user id's
      //then it will create multiple apartments 1st time
      await apartmentData.save();
      res.status(200).json({ message: "Create successfully" });
    }
  } catch (error) {
    serverError(res, error);
  }
};

const getAllApartments = async (req, res) => {
  //   ownerId: role === "" || role === undefined ? _id : homeId,
  const { _id, defaultHomeID } = req.user;
  const apartmentsInfo = await ApartmentModel.findOne({
    ownerId: _id,
    defaultHomeID,
  });

  try {
    if (apartmentsInfo) {
      if (apartmentsInfo.allApartments.length !== 0) {
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
        const filtered = groupByApartments(
          apartmentsInfo.allApartments,
          "floor"
        ).filter(function (el) {
          return el != null;
        });
        res.status(200).json(filtered);
      } else {
        return resourceError(res, "Please create apartment");
      }
    } else {
      return resourceError(res, "Apartment not found");
    }
  } catch (error) {
    serverError(res, error);
  }
};

const updateApartmentInfo = async (req, res) => {
  //only owner can update apartment
  const { _id } = req.user;
  const apartmentInfo = await ApartmentModel.findOne({
    ownerId: _id,
  });

  try {
    if (apartmentInfo) {
      let apartmentData;

      apartmentInfo.allApartments.filter((apartment, index) => {
        if (apartment._id == req.body._id) {
          return (apartmentData = apartment);
        }
      });
      if (apartmentData !== undefined) {
        // apartmentDetails:
        apartmentData.apartmentDetails.apartmentName =
          req.body.apartmentDetails.apartmentName;
        apartmentData.apartmentDetails.apartment_number =
          req.body.apartmentDetails.apartment_number;
        apartmentData.apartmentDetails.apartmentType =
          req.body.apartmentDetails.apartmentType;
        apartmentData.apartmentDetails.roomNumber =
          req.body.apartmentDetails.roomNumber;
        apartmentData.apartmentDetails.number_of_bed_room =
          req.body.apartmentDetails.number_of_bed_room;
        apartmentData.apartmentDetails.number_of_kitchen =
          req.body.apartmentDetails.number_of_kitchen;
        apartmentData.apartmentDetails.number_of_baths =
          req.body.apartmentDetails.number_of_baths;
        apartmentData.apartmentDetails.number_of_balcony =
          req.body.apartmentDetails.number_of_balcony;
        apartmentData.apartmentDetails.apartment_length =
          req.body.apartmentDetails.apartment_length;

        // billDetails:
        apartmentData.billDetails.rent = req.body.billDetails.rent;
        apartmentData.billDetails.gas_bill = req.body.billDetails.gas_bill;
        apartmentData.billDetails.water_bill = req.body.billDetails.water_bill;
        apartmentData.billDetails.service_charge =
          req.body.billDetails.service_charge;
        apartmentData.billDetails.others = req.body.billDetails.others;
        apartmentData.billDetails.totalRent =
          parseInt(req.body.billDetails.rent) +
          parseInt(req.body.billDetails.gas_bill) +
          parseInt(req.body.billDetails.water_bill) +
          parseInt(req.body.billDetails.service_charge) +
          parseInt(req.body.billDetails.others);

        // apartmentData.apartNo = req.body.apartNo;
        // apartmentData.roomNo = req.body.roomNo;
        // apartmentData.rent = req.body.rent;
        // apartmentData.f_bill = req.body.f_bill;
        // apartmentData.gasbill = req.body.gasbill;
        // apartmentData.waterbill = req.body.waterbill;
        // apartmentData.c_service = req.body.c_service;
        // apartmentData.totalRent =
        //   parseInt(req.body.rent) +
        //   parseInt(req.body.f_bill) +
        //   parseInt(req.body.gasbill) +
        //   parseInt(req.body.waterbill) +
        //   parseInt(req.body.c_service);

        const update = await apartmentInfo.save();
        res.status(200).json({
          update,
          // message: "Update successfully",
        });
      } else {
        return resourceError(res, "id dosen't match");
      }
    } else {
      return resourceError(res, "Somthing went wrong");
    }
  } catch (error) {
    serverError(res, error);
  }
};

const removeApartment = (req, res) => {
  ApartmentModel.updateMany(
    {},
    { $pull: { allApartments: { _id: req.params.id } } }
  )
    .then((result) => {
      if (result.modifiedCount) {
        res.status(200).json({
          message: "Successfully Removed Apartment",
        });
      } else {
        return resourceError(res, "Somthing went wrong");
      }
    })
    .catch((error) => serverError(res, error));
};

module.exports = {
  createMultipleApartment,
  getAllApartments,
  updateApartmentInfo,
  removeApartment,
};
