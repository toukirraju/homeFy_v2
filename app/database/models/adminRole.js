const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ["viewer", "editor", "admin"],
  },
  permissions: {
    type: [String],
    required: true,
  },
});

const AdminRole = mongoose.model("AdminRole", roleSchema);

module.exports = AdminRole;
