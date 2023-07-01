const OwnerInfoModel = require("../database/models/ownerModel");
const RenterInfoModel = require("../database/models/renterModel");
const AdminModel = require("../database/models/adminModel");
const { serverError, resourceError } = require("../utils/error");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { encryptData } = require("../utils/encryptionDecryption");

//////////////// client register  ////////////
const register = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass;
  const newRenter = new RenterInfoModel(req.body);

  try {
    const [isOwnerUsernameExist, isRenterUsernameExist, isAdminUsernameExist] =
      await Promise.all([
        OwnerInfoModel.findOne({ username: req.body.username }),
        RenterInfoModel.findOne({
          $or: [{ username: req.body.username }, { phone: req.body.phone }],
        }),
        AdminModel.findOne({ username: req.body.username }),
      ]);

    if (isRenterUsernameExist || isOwnerUsernameExist || isAdminUsernameExist) {
      return resourceError(res, "username already taken. Try new one");
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
  const { password } = req.body;

  try {
    // const renter = await RenterInfoModel.findOne({ username });
    let query = {};
    let username = req.body.username;
    if (/^\d+$/.test(username)) {
      // if (username.charAt(0) === "0") {
      //   username = username.substr(1); // Remove first character
      // }
      query.phone = username;
      // query.phone = req.body.username;
    } else if (
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(username)
    ) {
      query.username = username;
    } else {
      query.username = username;
    }

    const renter = await RenterInfoModel.findOne(query);
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
  req.body.fullname = `${req.body.firstname} ${req.body.lastname}`;
  const newOwner = new OwnerInfoModel(req.body);
  const { username, role } = req.body;
  try {
    // const isOwnerUsernameExist = await OwnerInfoModel.findOne({ username });
    // const isRenterUsernameExist = await RenterInfoModel.findOne({ username });
    // const isAdminUsernameExist = await AdminModel.findOne({ username });
    const [isOwnerUsernameExist, isRenterUsernameExist, isAdminUsernameExist] =
      await Promise.all([
        OwnerInfoModel.findOne({ username: req.body.username }),
        RenterInfoModel.findOne({ username: req.body.username }),
        AdminModel.findOne({ username: req.body.username }),
      ]);

    if (isRenterUsernameExist || isOwnerUsernameExist || isAdminUsernameExist) {
      return resourceError(res, "username already taken. Try new one");
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
      // res.status(200).json({ message: "Registration Complete" });
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

  try {
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
    const existingAdmin = await AdminModel.findOne({ username }).populate({
      path: "role",
      model: "AdminRole",
    });
    if (existingAdmin) {
      const validity = await bcrypt.compare(password, existingAdmin.password);

      if (!validity) {
        return resourceError(res, "Incorrect credentials. Try again.");
      } else {
        const token = jwt.sign(
          {
            username: existingAdmin.username,
            id: existingAdmin._id,
            role: existingAdmin.role,
            isAdmin: existingAdmin.isAdmin,
            superAdmin: existingAdmin.superAdmin,
          },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );
        const { password, ...otherDetails } = existingAdmin._doc;
        const user = otherDetails;
        //encrypted all data
        const encryptedData = encryptData(
          { user, token: `Bearer ${token}` },
          process.env.SECRET
        );
        res.status(200).json(encryptedData);
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
