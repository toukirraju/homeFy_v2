const AdminModel = require("../../database/models/adminModel");
const AdminRole = require("../../database/models/adminRole");
const OwnerInfoModel = require("../../database/models/ownerModel");
const RenterInfoModel = require("../../database/models/renterModel");
const { serverError, resourceError } = require("../../utils/error");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//********* Get All Admins ************\\

const GetAdmins = async (req, res) => {
  const { page = 1, limit = 10, username } = req.query;

  const filter = {};
  if (username) {
    filter.username = { $regex: new RegExp(username, "i") };
  }

  try {
    const admins = await AdminModel.aggregate([
      { $match: filter },
      { $project: { password: 0 } },
      { $sort: { createdAt: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: parseInt(limit) },
      // Populate the role field using the AdminRole model
      {
        $lookup: {
          from: "adminroles",
          localField: "role",
          foreignField: "_id",
          as: "role",
        },
      },
      // Unwind the role array to get a single object
      { $unwind: "$role" },
    ]);

    const count = await AdminModel.find(filter).countDocuments();

    if (admins.length > 0) {
      res.status(200).json({
        admins,
        pagination: {
          totalRecords: Number(count),
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
        },
      });
    } else {
      return resourceError(res, "No admin found");
    }
  } catch (error) {
    serverError(res, error);
  }
};

//********* New Admin Create ************//

const createSubAdmin = async (req, res) => {
  const { username, password, firstname, lastname, phone, role } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  try {
    const adminRole = await AdminRole.findOne({ name: role });

    if (!adminRole) {
      return resourceError(res, "Role not defined!");
    }

    const newAdmin = new AdminModel({
      username,
      password: hashedPass,
      firstname,
      lastname,
      fullName: firstname + " " + lastname,
      phone,
      role: adminRole._id,
    });
    const [isOwnerUsernameExist, isRenterUsernameExist, isAdminUsernameExist] =
      await Promise.all([
        OwnerInfoModel.findOne({ username: req.body.username }),
        RenterInfoModel.findOne({ username: req.body.username }),
        AdminModel.findOne({ username: req.body.username }),
      ]);

    if (isRenterUsernameExist || isOwnerUsernameExist || isAdminUsernameExist) {
      return resourceError(res, "username already taken. Try new one");
    } else {
      const admin = await newAdmin.save();
      res.status(200).json({ message: "admin created", admin });
    }
    // else {
    //   return resourceError(res, "Only super admin can create another admin");
    // }
  } catch (error) {
    serverError(res, error);
  }
};

//********* Update Personal Profile ************\\

const UpdatePersonalProfile = async (req, res) => {
  try {
    const admin = await AdminModel.findById({ _id: req.user._id });

    if (admin) {
      await admin.updateOne({ $set: req.body });
      res.status(200).json({ message: "Profile updated" });
    } else {
      return resourceError(res, "Does not recognize user");
    }
  } catch (error) {
    serverError(res, error);
  }
};

//********* Update Admin Profile ************\\

const UpdateAdminProfile = async (req, res) => {
  const id = req.params.id;
  try {
    const filter = { _id: id };
    const update = {
      $set: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        fullName: `${req.body.firstname} ${req.body.lastname}`,
        address: req.body.address,
        country: req.body.country,
        country_code: req.body.country_code,
        postcode: req.body.postcode,
        state: req.body.state,
        state_district: req.body.state_district,
        nid: req.body.nid,
      },
    };
    const options = { returnDocument: "after" };

    const result = await AdminModel.findByIdAndUpdate(filter, update, options);
    result && res.status(200).json(result);
  } catch (error) {
    serverError(res, error);
  }
};

//********* Delete Admin Profile ************\\

const DeleteAdminProfile = async (req, res) => {
  const id = req.params.id;

  try {
    const adminDeleted = await AdminModel.findByIdAndDelete(id);
    if (adminDeleted) {
      res.status(201).json({
        message: "admin deleted!",
      });
    } else {
      return resourceError(res, "Action forbidden");
    }
  } catch (error) {
    serverError(res, error);
  }
};

module.exports = {
  GetAdmins,
  createSubAdmin,
  UpdatePersonalProfile,
  UpdateAdminProfile,
  DeleteAdminProfile,
};
