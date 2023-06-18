const express = require("express");
const app = express();
const router = express.Router();
const adminCtrl = require("../controllers/adminController");
const auth = require("../middleware/auth");

router.get("/", adminCtrl.getAdmin);
//router.get("/:id", adminCtrl.deleteAdmin);
router.post("/signup", adminCtrl.signupAdmin);

router.post("/login", adminCtrl.loginAdmin); //appel du controller dans /controllers
router.post("/logout", adminCtrl.logoutAdmin); //appel du controller dans /controllers
router.get("/users/", adminCtrl.findAllUsers); //appel du controller dans /controllers
router.get("/users/:id", adminCtrl.findOneUser); //appel du controller dans /controllers
router.get("/links/", adminCtrl.getLinks); //appel du controller dans /controllers
router.post("/links/", adminCtrl.addLinks); //appel du controller dans /controllers
router.put("/links/:id", adminCtrl.modifyLinks); //appel du controller dans /controllers
router.delete("/users/:id", adminCtrl.deleteUser); //appel du controller dans /controllers

module.exports = router;
