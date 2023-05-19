const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-fabric");
const multermulti = require("../middleware/multer-products");

const productCtrl = require("../controllers/productsController");
const fabricsCtrl = require("../controllers/fabricsController");

router.get("/fabrics", fabricsCtrl.getTissues);
router.post("/fabrics", multer, fabricsCtrl.addTissue);
router.delete("/fabrics/:id", fabricsCtrl.deleteTissue);

router.get("/", productCtrl.findAllProducts);
router.get("/:id", productCtrl.findOneProduct);
router.post("/", multermulti, productCtrl.createProduct);
router.put("/:id", productCtrl.modifyProduct);
router.delete("/:id", productCtrl.deleteProduct);

module.exports = router;
