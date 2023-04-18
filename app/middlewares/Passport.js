const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const OwnerModel = require("../database/models/ownerModel");
const AdminModel = require("../database/models/adminModel");
const RenterModel = require("../database/models/renterModel");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (payload, done) => {
      //check admin
      if (payload.isAdmin) {
        AdminModel.findOne({ _id: payload.id })
          .then((user) => {
            if (!user) {
              return done(null, false);
            } else {
              return done(null, user);
            }
          })
          .catch((error) => {
            console.log(error);
            return done(error, false);
          });
      } else if (payload.role === "owner") {
        //check owner
        OwnerModel.findOne({ _id: payload.id })
          .then((user) => {
            if (!user) {
              return done(null, false);
            } else {
              return done(null, user);
            }
          })
          .catch((error) => {
            console.log(error);
            return done(error, false);
          });
      } else if (payload.role === "manager") {
        //check manager
        OwnerModel.findOne({ _id: payload.id })
          .then((user) => {
            if (!user) {
              return done(null, false);
            } else {
              return done(null, user);
            }
          })
          .catch((error) => {
            console.log(error);
            return done(error, false);
          });
      } else {
        //check renter
        RenterModel.findOne({ _id: payload.id })
          .then((user) => {
            if (!user) {
              return done(null, false);
            } else {
              return done(null, user);
            }
          })
          .catch((error) => {
            console.log(error);
            return done(error, false);
          });
      }
    })
  );
};
