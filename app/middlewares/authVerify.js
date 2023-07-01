const passport = require("passport");
const AdminModel = require("../database/models/adminModel");
const OwnerModel = require("../database/models/ownerModel");
const AdminRole = require("../database/models/adminRole");

// Token verify
verifyToken = (req, res, next) => {
  passport.authenticate("jwt", (err, user, info) => {
    if (err) {
      console.log(info);
      console.log(err);
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        message: "Authentication Failed",
      });
    }
    // console.log(req.user);
    req.user = user;

    return next();
  })(req, res, next);
};

// super admin role verify
isSuperAdmin = async (req, res, next) => {
  try {
    const admin = await AdminModel.findById(req.user._id).populate({
      path: "role",
      model: "AdminRole",
    });

    const role = await AdminRole.findById(admin.role._id);

    if (admin.isAdmin && role && role.name === admin.role.name) {
      next();
      return;
    }

    res.status(403).send({ message: "Require Super Admin Role!" });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

isAdmin = (req, res, next) => {
  // console.log(req);
  AdminModel.findById(req._id).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (
      user.roles.indexOf("editor") !== -1 &&
      user.roles.indexOf("moderator") !== -1
    ) {
      next();
      return;
    }
    res.status(403).send({ message: "Require Admin Role!" });
  });
};

isModerator = (req, res, next) => {
  AdminModel.findById(req._id).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user.roles.indexOf("moderator") !== -1) {
      next();
      return;
    }
    res.status(403).send({ message: "Require Moderator Role!" });
  });
};

isOwner = (req, res, next) => {
  // console.log(req);
  OwnerModel.findById(req.user._id).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user.role === "owner") {
      next();
      return;
    }
    res.status(403).send({ message: "Require Owner Role!" });
  });
};

isManager = (req, res, next) => {
  // console.log(req);
  OwnerModel.findById(req.user._id).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user.role === "manager") {
      next();
      return;
    }
    res.status(403).send({ message: "Require Manager Role!" });
  });
};

const authVerify = {
  verifyToken,
  isSuperAdmin,
  isAdmin,
  isModerator,
  isOwner,
  isManager,
};
module.exports = { authVerify };
