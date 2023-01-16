const ApartmentModel = require("../database/models/apartmentModel");
const { serverError, resourceError } = require("../utils/error");

const createMultipleApartment = async (req, res) => {
  let { ownerName, ownerId, numOfFloors } = req.body;

  const apartmentsArray = Array.from({ length: numOfFloors }, (_, index) => ({
    level: index + 1,
    apartNo: `A${index + 1}`,
    roomNo: `R${index + 1}`,
    rent: 0,
    gasbill: 0,
    waterbill: 0,
    c_service: 0,
    f_bill: 0,
    totalRent: 0,
    renterId: "",
    renterName: "",
  }));

  let apartmentData = new ApartmentModel({
    ownerName,
    ownerId,
    allApartments: apartmentsArray,
  });

  const apartmentsInfo = await ApartmentModel.findOne({ ownerId });

  try {
    if (apartmentsInfo) {
      if (apartmentsInfo.allApartments.length === 0) {
        //create multiple apartments
        for (let i = 0; i < numOfFloors; i++) {
          let multiObject = new Object({
            level: i + 1,
            apartNo: `A${i + 1}`,
            roomNo: `R${i + 1}`,
            rent: 0,
            gasbill: 0,
            waterbill: 0,
            c_service: 0,
            f_bill: 0,
            totalRent: 0,
            renterId: "",
            renterName: "",
          });
          apartmentsInfo.allApartments.push(multiObject);
        }
        await apartmentsInfo.save();
        res.status(200).json(apartmentsInfo);
      } else {
        //create single apartments
        let singleObj = new Object({
          level: numOfFloors,
          apartNo: `A${numOfFloors}`,
          roomNo: `R${numOfFloors}`,
          rent: 0,
          gasbill: 0,
          waterbill: 0,
          c_service: 0,
          f_bill: 0,
          totalRent: 0,
          renterId: "",
          renterName: "",
        });

        apartmentsInfo.allApartments.push(singleObj);
        await apartmentsInfo.save();
        res.status(200).json(
          // {message: "Create successfully"}
          apartmentsInfo
        );
      }
    } else {
      //create multiple apartments
      await apartmentData.save();
      res.status(200).json(
        // {message: "Create successfully"}
        apartmentsInfo
      );
    }
  } catch (error) {
    serverError(res, error);
  }
};

const getAllApartments = async (req, res) => {
  //   ownerId: role === "" || role === undefined ? _id : homeId,
  const { _id } = req.user;
  const apartmentsInfo = await ApartmentModel.findOne({
    ownerId: _id,
  });

  try {
    if (apartmentsInfo) {
      if (apartmentsInfo.allApartments.length !== 0) {
        const groupByApartments = (arr, property) => {
          let grouped = [];
          for (let i = 0; i < arr.length; i++) {
            let p = arr[i][property];
            if (!grouped[p]) {
              grouped[p] = [];
            }
            grouped[p].push(arr[i]);
          }
          return grouped;
        };
        // console.log();
        const filtered = groupByApartments(
          apartmentsInfo.allApartments,
          "level"
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
  const { _id } = req.user;
  const apartmentInfo = await ApartmentModel.findOne({
    ownerId: _id,
  });

  try {
    if (apartmentInfo) {
      let apartmentData;

      apartmentInfo.allApartments.filter((i, index) => {
        if (i._id == req.body._id) {
          return (apartmentData = i);
        }
      });
      if (apartmentData !== undefined) {
        apartmentData.apartNo = req.body.apartNo;
        apartmentData.roomNo = req.body.roomNo;
        apartmentData.rent = req.body.rent;
        apartmentData.f_bill = req.body.f_bill;
        apartmentData.gasbill = req.body.gasbill;
        apartmentData.waterbill = req.body.waterbill;
        apartmentData.c_service = req.body.c_service;
        apartmentData.totalRent =
          parseInt(req.body.rent) +
          parseInt(req.body.f_bill) +
          parseInt(req.body.gasbill) +
          parseInt(req.body.waterbill) +
          parseInt(req.body.c_service);

        await apartmentInfo.save();
        res.status(200).json({
          message: "Update successfully",
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
