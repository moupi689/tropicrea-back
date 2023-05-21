const Wishlist = require("../models/wishlistModel.js");

//récupération de la wishlist
exports.getWishlist = (req, res) => {
  Wishlist.findOne({ user: req.params.id })
    .then((wish) => {
      if (wish && wish.items.length > 0) {
        res.status(200).json({ wish });
      } else {
        res.json(null);
      }
    })
    .catch((error) => res.status(500).send());
};

//ajout d'un item dans la wishlist
exports.addItemToWishlist = (req, res) => {
  Wishlist.findOne({ user: req.params.id }).then((wish) => {
    // si panier existe
    if (wish) {
      wish.items.push({
        itemId: req.body._id,
        thumbnail: req.body.thumbnail,
        title: req.body.title,
      });
      wish
        .save()
        .then(() => res.status(201).send(wish))
        .catch((error) => res.status(400).send(error));
    } else {
      //pas de panier trouvé > création d'un panier
      const newWish = new Wishlist({
        user: req.params.id,
        items: [
          {
            itemId: req.body._id,
            title: req.body.title,
          },
        ],
      });
      newWish
        .save()
        .then(() => res.status(201).send(newWish))
        .catch((error) => res.status(400).send(error));
    }
  });
};

//suppression d'un item dans le panier
exports.deleteItemFromWishlist = (req, res) => {
  Wishlist.findOne({ _id: req.params.wish })
    .then((wish) => {
      const itemIndex = wish.items.findIndex(
        (item) => item._id == req.params.id
      );
      if (itemIndex > -1) {
        let item = wish.items[itemIndex];

        wish.items.splice(itemIndex, 1);
        wish.save();
        res.status(200).send(wish);
      } else {
        res.status(404).send("item not found");
      }
    })

    .catch((error) => {
      res.status(400).send(error);
    });
};

//suppression du panier
exports.deleteWishlist = (req, res) => {
  Wishlist.deleteOne({ _id: req.params.wish })
    .then(() => res.status(200).json({ message: "Wishlist supprimée !" }))
    .catch((error) => res.status(400).json({ error }));
};
