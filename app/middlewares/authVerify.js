const passport = require("passport");
const AdminModel = require("../database/models/adminModel");

verifyToken = (req, res, next) => {
  passport.authenticate("jwt", (err, user, info) => {
    if (err) {
      console.log(info);
      console.log(err);
      return next(err);
    }
    if (!user) {
      return res.status(400).json({
        message: "Admin Authentication Failed",
      });
    }
    // console.log(req.user);
    req.user = user;

    return next();
  })(req, res, next);
};

isSuperAdmin = (req, res, next) => {
  // console.log(req.user);
  AdminModel.findById(req.user._id).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (
      user.roles.indexOf("admin") !== -1 &&
      user.roles.indexOf("editor") !== -1 &&
      user.roles.indexOf("moderator") !== -1
    ) {
      next();
      return;
    }
    res.status(403).send({ message: "Require Super Admin Role!" });
  });
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

const authVerify = {
  verifyToken,
  isSuperAdmin,
  isAdmin,
  isModerator,
};
module.exports = { authVerify };
