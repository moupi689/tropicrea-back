const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multerlookbook = require("../middleware/multer-lookbook");

const lookbookCtrl = require("../controllers/lookbookController");

router.get("/", lookbookCtrl.getLookbook);
router.get("/:id", lookbookCtrl.findOneLookbook);
router.post("/", multerlookbook, lookbookCtrl.addToLookbook);
router.delete("/:id", lookbookCtrl.deleteFromLookbook);

module.exports = router;
