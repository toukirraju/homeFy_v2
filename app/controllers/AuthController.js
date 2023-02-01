const OwnerInfoModel = require("../database/models/ownerModel");
const RenterInfoModel = require("../database/models/renterModel");
const AdminModel = require("../database/models/adminModel");
// const registerValidator = require("../validator/registerValidator");
// const loginValidator = require("../validator/loginValidator");
const { serverError, resourceError } = require("../utils/error");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//////////////// client register  ////////////
const register = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass;
  const newRenter = new RenterInfoModel(req.body);
  const { username } = req.body;
  try {
    const oldRenter = await RenterInfoModel.findOne({ username });

    if (oldRenter) {
      return resourceError(res, "username is already registered");
    } else {
      const renter = await newRenter.save();
      const token = jwt.sign(
        {
          username: renter.username,
          id: renter._id,
        },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({ user: renter, token: `Bearer ${token}` });
    }
  } catch (error) {
    serverError(res, error);
  }
};

////////////// client Login ////////////////
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // const owner = await OwnerInfoModel.findOne({ username: username });

    // if (owner) {
    //   const validity = await bcrypt.compare(password, owner.password);

    //   if (!validity) {
    //     return resourceError(res, "Password dose not match");
    //   } else {
    //     const token = jwt.sign(
    //       {
    //         username: owner.username,
    //         id: owner._id,
    //         role: owner.role,
    //         ownerId: owner.ownerId,
    //       },
    //       process.env.JWT_KEY,
    //       { expiresIn: "1h" }
    //     );
    //     const { password, ...otherDetails } = owner._doc;
    //     const user = otherDetails;
    //     res.status(200).json({ user, token: `Bearer ${token}` });
    //   }
    // } else

    const renter = await RenterInfoModel.findOne({ username });
    if (renter) {
      const validity = await bcrypt.compare(password, renter.password);

      if (!validity) {
        return resourceError(res, "Incorrect credentials. Try again.");
      } else {
        const token = jwt.sign(
          {
            username: renter.username,
            id: renter._id,
            ownerId: renter.ownerId,
          },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );
        const { password, ...otherDetails } = renter._doc;
        const user = otherDetails;
        res.status(200).json({ user, token: `Bearer ${token}` });
      }
    } else {
      res.status(404).json({ message: "User does not exists" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//********* Home owner sign in ************//
const OwnerLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const owner = await OwnerInfoModel.findOne({ username: username });

    // const renter = await RenterInfoModel.findOne({ username });

    if (owner) {
      const validity = await bcrypt.compare(password, owner.password);

      if (!validity) {
        return resourceError(res, "Incorrect credentials. Try again.");
      } else {
        const token = jwt.sign(
          {
            username: owner.username,
            id: owner._id,
            role: owner.role,
            ownerId: owner.ownerId,
          },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );
        const { password, ...otherDetails } = owner._doc;
        const user = otherDetails;
        res.status(200).json({ user, token: `Bearer ${token}` });
      }
    } else {
      res.status(404).json({ message: "User does not exists" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//********* Home owner sign up ************//

const OwnerRegister = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass;
  const newOwner = new OwnerInfoModel(req.body);
  const { username, role } = req.body;
  try {
    const oldOwner = await OwnerInfoModel.findOne({ username });

    if (oldOwner) {
      return resourceError(res, "username is already registered");
    }

    if (role === "owner" || role === "manager") {
      const owner = await newOwner.save();
      const token = jwt.sign(
        {
          username: owner.username,
          id: owner._id,
        },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({ user: owner, token: `Bearer ${token}` });
    } else {
      return resourceError(res, "Role not defined");
    }
  } catch (error) {
    serverError(res, error);
  }
};

//********* New Admin Create ************//

const adminCreate = async (req, res) => {
  // console.log(req);
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass;
  const newAdmin = new AdminModel({ createdAdmin: req.user._id, ...req.body });
  const { username } = req.body;
  try {
    const existingAdmin = await AdminModel.findOne({ username });
    if (existingAdmin) {
      return resourceError(res, "username is already registered");
    } else {
      const admin = await newAdmin.save();
      // const token = jwt.sign(
      //   {
      //     username: admin.username,
      //     id: admin._id,
      //   },
      //   process.env.JWT_KEY,
      //   { expiresIn: "1h" }
      // );
      // res.status(200).json({ user: admin, token: `Bearer ${token}` });
      res.status(200).json({ message: "admin created", admin });
    }
    // else {
    //   return resourceError(res, "Only super admin can create another admin");
    // }
  } catch (error) {
    serverError(res, error);
  }
};

//********* Admin Login ************//

const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingAdmin = await AdminModel.findOne({ username });
    if (existingAdmin) {
      const validity = await bcrypt.compare(password, existingAdmin.password);

      if (!validity) {
        return resourceError(res, "Incorrect credentials. Try again.");
      } else {
        const token = jwt.sign(
          {
            username: existingAdmin.username,
            id: existingAdmin._id,
            roles: existingAdmin.roles,
            isAdmin: existingAdmin.isAdmin,
            superAdmin: existingAdmin.superAdmin,
          },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );
        const { password, ...otherDetails } = existingAdmin._doc;
        const user = otherDetails;
        res.status(200).json({ user, token: `Bearer ${token}` });
      }
    } else {
      res.status(404).json({ message: "User does not exists" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  adminCreate,
  adminLogin,
  OwnerRegister,
  OwnerLogin,
};
