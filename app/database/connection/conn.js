const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const AdminRole = require("../models/adminRole");
const AdminModel = require("../models/adminModel");
const {
  supperAdminInitialization,
} = require("../../utils/supperAdminInitialization");

dotEnv.config({ path: "./config.env" });

const dataBaseUrl = process.env.DATABASE || "mongodb://localhost:27017/h0mify";

mongoose
  .connect(dataBaseUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    //initialized all role on db
    roleInitialized()
      .then(() => {
        //initialized supper admin
        supperAdminInitialization();
      })
      .catch((error) => {
        console.error("Error initializing roles:", error);
      });
    console.log("Database Successfully Connected");
  })
  .catch((err) => {
    console.log("Database is not connected");
  });

//initialized all role on db
function roleInitialized() {
  return new Promise(async (resolve, reject) => {
    try {
      const count = await AdminRole.estimatedDocumentCount();
      if (count === 0) {
        const roles = [
          { name: "viewer", permissions: ["read"] },
          { name: "editor", permissions: ["read", "update"] },
          {
            name: "admin",
            permissions: ["create", "read", "update", "delete"],
          },
        ];

        await Promise.all(
          roles.map((role) => {
            const { name, permissions } = role;
            return new AdminRole({ name, permissions }).save();
          })
        );

        // console.log("Added roles to the collection.");
        console.log("successfully roles are initialized.");
        resolve(); // Resolve the Promise if the operation is successful
      } else {
        resolve(); // Resolve the Promise if there are already roles in the collection
      }
    } catch (err) {
      console.error("Error:", err);
      reject(err); // Reject the Promise if an error occurs
    }
  });
}
