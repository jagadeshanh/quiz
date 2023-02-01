var mongoose = require("../database/db");
var uniqueValidator = require("mongoose-unique-validator");

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  return re.test(email);
};

var validPhone = function (phone) {
  var ph = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return ph.test(phone);
};

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Your name is required"],
    minlength: [3, "Minimum name length 3 characters"],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    index: true,
    unique: true,
    required: [true, "Email address is required"],
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  phone: {
    type: String,
    unique: true,
    required: [true, "User phone number required"],
    validate: [validPhone, "Please fill a valid phone"],
    match: [
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
      "Please fill a valid phone",
    ],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
    max: 100,
  },
});

userSchema.plugin(uniqueValidator);

var User = mongoose.model("User", userSchema);

module.exports = { User };
