const AdminModel = require("../database/models/adminModel");
const AdminRole = require("../database/models/adminRole");
const bcrypt = require("bcrypt");

async function supperAdminInitialization() {
  const password = process.env.SUPPER_PASSWORD;
  const role = process.env.SUPPER_ROLE;
  const supperAdminUsername = process.env.SUPPER_USERNAME;
  const supperAdminFirstname = process.env.SUPPER_FIRSTNAME;
  const supperAdminLastname = process.env.SUPPER_LASTNAME;
  const supperAdminPhone = process.env.SUPPER_PHONE;

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  try {
    const adminRole = await AdminRole.findOne({ name: role });
    const count = await AdminModel.estimatedDocumentCount();
    if (count === 0) {
      const newAdmin = new AdminModel({
        username: supperAdminUsername,
        password: hashedPass,
        firstname: supperAdminFirstname,
        lastname: supperAdminLastname,
        fullName: supperAdminFirstname + " " + supperAdminLastname,
        phone: supperAdminPhone,
        role: adminRole._id,
        isAdmin: true,
        superAdmin: true,
      });

      newAdmin.save();
      console.log("Supper admin created.");
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

module.exports = {
  supperAdminInitialization,
};
