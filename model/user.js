const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: [true, " please provide  user name"],
  },
  email: {
    type: "string",
    required: [true, " please provide email "],

    minlengeth: 3,
    minlengeth: 50,

    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    ],
    unique: [true, "user alrady exist"],
  },

  password: {
    type: "string",
    required: [true, " please provide password "],

    minlengeth: 3,
    minlengeth: 12,
  },
});
//pre mehthod before insert
UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  const passoward = await bcrypt.hash(this.password, salt);
  this.password = passoward;
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRETE,
    { expiresIn: "30d" }
  );
};
UserSchema.methods.CheckPassword = async function (credentials) {
  return await bcrypt.compare(credentials, this.password);
};

module.exports = mongoose.model("User", UserSchema);
