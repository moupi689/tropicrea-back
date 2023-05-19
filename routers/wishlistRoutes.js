const router = require("express").Router();
const wishlistController = require("../controllers/wishlistController.js");

router.post("/item", wishlistController.addItemToWishlist);
router.delete("/item/:id", wishlistController.deleteItemFromWishlist);
router.get("/", wishlistController.getWishlist);
router.delete("/:id", wishlistController.deleteWishlist);

module.exports = router;
