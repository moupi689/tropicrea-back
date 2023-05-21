const router = require("express").Router();
const cartController = require("../controllers/cartController.js");

router.post("/item/:id", cartController.addItemToCart);
router.delete("/:cart/:id", cartController.deleteItemFromCart);
router.get("/:id", cartController.getCart);
router.delete("/:cart", cartController.deleteCart);

module.exports = router;
