const router = require("express").Router();
const wishlistController = require("../controllers/wishlistController.js");

router.post("/item/:id", wishlistController.addItemToWishlist);
router.delete("/:wish/:id", wishlistController.deleteItemFromWishlist);
router.get("/:id", wishlistController.getWishlist);
router.delete("/:id", wishlistController.deleteWishlist);

module.exports = router;
