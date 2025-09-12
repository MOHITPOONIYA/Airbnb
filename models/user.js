const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
