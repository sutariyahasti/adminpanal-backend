const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  // name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: {
    type: String,
    // required: true,
    // trim: true,
  },
  lastName: {
    type: String,
    // required :true,
  },
  lastLogin: { type: Date, default: null },
});

// Hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
