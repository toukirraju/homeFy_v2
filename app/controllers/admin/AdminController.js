const AdminModel = require("../../database/models/adminModel");
const AdminRole = require("../../database/models/adminRole");
const OwnerInfoModel = require("../../database/models/ownerModel");
const RenterInfoModel = require("../../database/models/renterModel");
const { serverError, resourceError } = require("../../utils/error");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//********* Get All Admins ************\\

const GetAllAdmins = async (req, res) => {
  // let { _id } = req.user;

  let admins = await AdminModel.find({
    // ownerId: _id,
  });
  try {
    if (admins) {
      admins = admins.map((admin) => {
        const { password, ...otherDetails } = admin._doc;
        return otherDetails;
      });
      res.status(200).json(admins);
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
  const { _id } = req.user;
  try {
    const admin = await AdminModel.findById({ _id: id });

    if (admin) {
      if (admin.createdAdmin === _id.toString()) {
        await admin.updateOne({ $set: req.body });
        res.status(200).json({ message: "Profile updated" });
      } else {
        return resourceError(res, "Action forbidden");
      }
    } else {
      return resourceError(res, "Does not recognize user");
    }
  } catch (error) {
    serverError(res, error);
  }
};

//********* Delete Admin Profile ************\\

const DeleteAdminProfile = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.user;

  try {
    const admin = await AdminModel.findById(id);
    if (admin) {
      if (admin.createdAdmin === _id.toString()) {
        await admin.deleteOne();
        res.status(201).json({
          message: "admin deleted!",
        });
      } else {
        return resourceError(res, "Action forbidden");
      }
    } else {
      return resourceError(res, "user not found");
    }
  } catch (error) {
    serverError(res, error);
  }

  try {
    const admin = await AdminModel.findById({ _id: req.body._id });

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

module.exports = {
  GetAllAdmins,
  createSubAdmin,
  UpdatePersonalProfile,
  UpdateAdminProfile,
  DeleteAdminProfile,
};
