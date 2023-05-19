const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-entetes");

const productCtrl = require("../controllers/headerpicturesController");

router.get("/", productCtrl.findAllPictures);
router.get("/:id", productCtrl.findOnePicture);
router.post("/", multer, productCtrl.createHeaderpicture);
router.delete("/:id", productCtrl.deletePicture);

module.exports = router;
