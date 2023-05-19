const router = require("express").Router();
const cartController = require("../controllers/cartController.js");

router.post("/item", cartController.addItemToCart);
router.delete("/item/:id", cartController.deleteItemFromCart);
router.get("/", cartController.getCart);
router.delete("/:id", cartController.deleteCart);

module.exports = router;
