const AdminModel = require("../database/models/adminModel");
const { serverError, resourceError } = require("../utils/error");

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
  UpdatePersonalProfile,
  UpdateAdminProfile,
  DeleteAdminProfile,
};
