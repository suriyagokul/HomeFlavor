const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Username: {
    type: "string",
    required: true,
  },
  Email: {
    type: "string",
    required: true,
  },
  Password: {
    type: "string",
    required: true,
  },
  ConfirmPassword: {
    type: "string",
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
