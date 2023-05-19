const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/usersController");

router.post("/signup", userCtrl.signupUser); //appel du controller dans /controllers
router.post("/login", userCtrl.loginUser); //appel du controller dans /controllers
router.get("/logout", userCtrl.logoutUser); //appel du controller dans /controllers

module.exports = router;
