const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
// const nodemailer = require("nodemailer");
// const app = express();
// const dotenv = require("dotenv");
// dotenv.config();
const {
  jwt_token,
  jwt_expries_in,
  mail_host,
  mail_port,
  mail_username,
  mail_password,
} = require("../config");

module.exports.dashboard = (req, res, next) => {
  res.sendFile(__dirname + "/index.html");
  next();
};

module.exports.register = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hasPassword = await bcrypt.hash(req.body.password, salt);
  var newUser = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: hasPassword,
  });
  var errors = [];
  newUser.save((err, registeredUser) => {
    if (err) {
      Object.keys(err.errors).forEach((key) => {
        let obj = {};
        obj[key] = err.errors[key].message;
        errors.push(obj);
      });
      res.status(400).json(errors);
    } else {
      // create payload then Generate an access token
      let payload = {
        id: registeredUser._id,
        user_type_id: req.body.user_type_id || 0,
      };
      const token = jwt.sign(payload, jwt_token, {
        expiresIn: jwt_expries_in,
      });
      res.status(200).json({
        status: "success",
        token,
        data: {
          newUser,
        },
      });
    }
  });
};

module.exports.login = (req, res) => {
  User.findOne({ email: req.body.email }, async (err, user) => {
    if (err) {
      console.log(err);
    } else {
      if (user) {
        const validPass = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!validPass) {
          return res
            .status(401)
            .json([{ status: true, error: "Email or Password is wrong" }]);
        }
        // Create and assign token
        let payload = { id: user._id, user_type_id: user.user_type_id };
        const token = jwt.sign(payload, jwt_token, {
          expiresIn: jwt_expries_in,
        });
        res
          .status(200)
          .header("auth-token", token)
          .send({ status: true, token: token });
      } else {
        res.status(401).send("Invalid Email");
      }
    }
  });
};

module.exports.welcome = (req, res) => {
  // here we get token and we need to verify
  res.status(200).send("Welcome to Dashboard");
};

module.exports.logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};
