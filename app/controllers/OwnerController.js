const OwnerModel = require("../database/models/ownerModel");
const HouseModel = require("../database/models/houseInfoModel");
const AddressModel = require("../database/models/addressModel");
const { serverError, resourceError } = require("../utils/error");

////********* get Personal Profile ************\\\\
const PersonalProfile = async (req, res) => {
  try {
    let owner = await OwnerModel.findById({ _id: req.user._id });

    if (owner) {
      const { password, ...otherDetails } = owner._doc;
      res.status(200).json(otherDetails);
    } else {
      return resourceError(res, "Does not recognize user");
    }
  } catch (error) {
    serverError(res, error);
  }
};

////********* Update Owner Personal Profile ************\\\\
const UpdateOwnerPersonalProfile = async (req, res) => {
  try {
    const owner = await OwnerModel.findById({ _id: req.user._id });

    if (owner) {
      const result = await owner.updateOne({ $set: req.body });
      result && res.status(200).json({ message: "Profile updated" });
    } else {
      return resourceError(res, "Does not recognize user");
    }
  } catch (error) {
    serverError(res, error);
  }
};

////********* Create new home ************\\\\
const CreateHouse = async (req, res) => {
  const newHouse = new HouseModel({
    ownerId: req.user._id,
    ownerName: req.user.firstname + " " + req.user.lastname,
    ownerPhone: req.user.phone,

    ...req.body,
  });

  const newAddress = new AddressModel({
    ownerId: req.user._id,

    house: newHouse._id,
    ...req.body,
  });

  // Associate the new house with the new address
  newHouse.address = newAddress._id;

  try {
    if (req.user.role === "owner") {
      // console.log(newHouse);
      // console.log(newAddress);

      // Save both the new house and new address to the database
      await Promise.all([newHouse.save(), newAddress.save()]);
      // const house = await newHouse.save();
      res.status(200).json({ message: "new house created" });
    } else {
      return resourceError(res, "Only Owner can create new house");
    }
  } catch (error) {
    serverError(res, error);
  }
};

////********* Get All Houses ************\\\\
const GetAllHouses = async (req, res) => {
  try {
    let houses = await HouseModel.find({
      ownerId: req.user._id.toString(),
    }).populate([
      {
        path: "address",
        model: "AdressModel",
      },
    ]);
    if (houses) {
      res.status(200).json(houses);
    } else {
      return resourceError(res, "House not created");
    }
  } catch (error) {
    serverError(res, error);
  }
};

////********* Update House info ************\\\\
const UpdateHouseInfo = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.user;
  try {
    const house = await HouseModel.findById({ _id: id });
    if (house) {
      const address = await AddressModel.findOne({ house: id });
      if (house.ownerId === _id.toString()) {
        await house.updateOne({
          $set: {
            houseName: req.body.houseName,
            houseNo: req.body.houseNo,
            number_of_floors: req.body.number_of_floors,
            number_of_apartments: req.body.number_of_apartments,
            streetNo: req.body.streetNo,
          },
        });
        await address.updateOne({
          $set: {
            address_display_name: req.body.address_display_name,
            state: req.body.state,
            state_district: req.body.state_district,
            postCode: req.body.postCode,
            lat: req.body.lat,
            lon: req.body.lon,
            country: req.body.address?.country,
            country_code: req.body.address?.country_code,
            place_id: req.body.place_id,
          },
        });
        res.status(200).json({ message: "House info updated" });
      } else {
        return resourceError(res, "Action forbidden");
      }
    } else {
      return resourceError(res, "House does not found!");
    }
  } catch (error) {
    serverError(res, error);
  }
};

////********* Update House Documents ************\\\\
const UpdateHouseDocuments = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.user;
  try {
    const house = await HouseModel.findById({ _id: id });

    if (house) {
      if (house.ownerId === _id.toString()) {
        await house.updateOne({ $set: req.body });
        res.status(200).json({ message: "House Documents updated" });
      } else {
        return resourceError(res, "Action forbidden");
      }
    } else {
      return resourceError(res, "House does not found!");
    }
  } catch (error) {
    serverError(res, error);
  }
};

////********* Delete House ************\\\\
const DeleteHouse = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.user;

  try {
    const house = await HouseModel.findById(id);
    if (house) {
      if (house.ownerId === _id.toString() && !house.isVerified) {
        await house.deleteOne();
        res.status(201).json({
          message: "house deleted!",
        });
      } else {
        return resourceError(
          res,
          "For deleting this house..Please, contact with admin"
        );
      }
    } else {
      return resourceError(res, "House not found");
    }
  } catch (error) {
    serverError(res, error);
  }
};

////********* Make Default House ************\\\\
const DefaultHouse = async (req, res) => {
  const id = req.params.id; //house id
  const { _id } = req.user; //owner id

  try {
    const house = await HouseModel.findById({ _id: id });
    const owner = await OwnerModel.findById({ _id: req.user._id });

    if (owner.defaultHomeID ? owner.defaultHomeID === id.toString() : false) {
      //already default this home
      res.status(200).json({ message: "This house already default" });
    } else {
      //need to default this house
      if (house) {
        if (house.ownerId === _id.toString()) {
          //owner matched
          if (owner.defaultHomeID) {
            const oldDefaultHouse = await HouseModel.findById({
              _id: owner.defaultHomeID,
            });
            if (oldDefaultHouse) {
              await oldDefaultHouse.updateOne({ $set: { isDefault: false } });
            }
          }

          await owner.updateOne({
            $set: { defaultHomeID: id, houseName: house.houseName },
          });
          await house.updateOne({ $set: { isDefault: true } });
          res.status(200).json({ message: "This house is default now" });
        } else {
          //owner not match
          return resourceError(res, "Owner does not match!");
        }
      } else {
        //house not found
        return resourceError(res, "House not found");
      }
    }
  } catch (error) {
    serverError(res, error);
  }
};

////********* Search Manager ************\\\\
const SearchManager = async (req, res) => {
  try {
    const manager = await OwnerModel.findOne({ username: req.params.username });
    if (!manager) {
      return resourceError(res, "Manager not found!");
      // res.status(200).json({ message: "manager not found" });
    }
    if (manager.role === "manager") {
      const { password, ...otherDetails } = manager._doc;
      const user = otherDetails;
      res.status(200).json(user);
    } else {
      return resourceError(res, "This user is not a manager");
    }
  } catch (error) {
    serverError(res, error);
  }
};

////********* Assign manager role ************\\\\
const AssignRole = async (req, res) => {
  let { srcId } = req.params;

  try {
    const manager = await OwnerModel.findById({ _id: srcId });
    if (manager) {
      // console.log(!manager.ownerId);
      if (manager.ownerId === undefined || manager.ownerId === "") {
        //he is available for assigned house
        // here req.body pass defaultHomeID & houseName value from owner dropdown home list
        await manager.updateOne({
          $set: {
            ownerId: req.user._id,
            isOwner: false,
            defaultHomeID: req.body.defaultHomeID,
            houseName: req.body.houseName,
          },
        });
        res.status(200).json({ message: "Manager role assigned" });
      } else {
        //he is already assigned a house
        return resourceError(res, "Manager is already assigned in a house");
      }
    } else {
      //manager id not found
      return resourceError(res, "Manager id not found.");
    }
  } catch (error) {
    serverError(res, error);
  }
};

////********* Get Assigned manager ************\\\\
const GetAllAssignedManager = async (req, res) => {
  try {
    let managers = await OwnerModel.find({ ownerId: req.user._id.toString() });
    if (managers) {
      managers = managers.map((manager) => {
        const { password, ...otherDetails } = manager._doc;
        return otherDetails;
      });
      res.status(200).json(managers);
    } else {
      return resourceError(res, "Manager not created");
    }
  } catch (error) {
    serverError(res, error);
  }
};

////********* Remove manager role ************\\\\
const RemoveRole = async (req, res) => {
  let { id } = req.params;
  const manager = await OwnerModel.findById({ _id: id });
  if (manager) {
    if (manager.ownerId === req.user._id.toString()) {
      await manager.updateOne({
        $set: { ownerId: "", defaultHomeID: "", houseName: "" },
      });
      res.status(200).json({
        message: "Role removed",
      });
    } else {
      return resourceError(res, "Action forbidden!");
    }
  } else {
    //manager not found
    return resourceError(res, "Manager not found!");
  }
};

module.exports = {
  PersonalProfile,
  UpdateOwnerPersonalProfile,
  CreateHouse,
  GetAllHouses,
  UpdateHouseInfo,
  UpdateHouseDocuments,
  DeleteHouse,
  DefaultHouse,
  SearchManager,
  AssignRole,
  GetAllAssignedManager,
  RemoveRole,
};
