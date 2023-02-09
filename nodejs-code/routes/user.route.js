const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { verifyUserToken, deleteToken } = require("../middleware/auth");

router.get("/", userController.dashboard);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/welcome", verifyUserToken, userController.welcome);
router.post("/logout", verifyUserToken, userController.logout);

module.exports = router;
