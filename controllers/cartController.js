const Cart = require("../models/cartModel.js");

//récupération du panier
exports.getCart = (req, res) => {
  Cart.findOne({ user: req.sessionID })
    .then((cart) => {
      if (cart && cart.items.length > 0) {
        res.status(200).json({ cart });
      } else {
        res.json(null);
      }
    })
    .catch((error) => res.status(500).send());
};

//ajout d'un item dans le panier
exports.addItemToCart = (req, res) => {
  Cart.findOne({ user: req.sessionID }).then((cart) => {
    // si panier existe
    if (cart) {
      cart.items.push({
        itemId: req.body._id,
        thumbnail: req.body.thumbnail,
        title: req.body.title,
        size: req.body.size,
        price: req.body.price,
      });
      cart.bill = cart.items.reduce((acc, curr) => {
        return acc + curr.price;
      }, 0);
      cart
        .save()
        .then(() => res.status(201).send(cart))
        .catch((error) => res.status(400).send(error));
    } else {
      //pas de panier trouvé > création d'un panier
      const newCart = new Cart({
        user: req.sessionID,
        items: [
          {
            itemId: req.body._id,
            title: req.body.title,
            price: req.body.price,
          },
        ],
        bill: req.body.price,
      });
      newCart
        .save()
        .then(() => res.status(201).send(newCart))
        .catch((error) => res.status(400).send(error));
    }
  });
};

//suppression d'un item dans le panier
exports.deleteItemFromCart = (req, res) => {
  Cart.findOne({ user: req.sessionID })
    .then((cart) => {
      const itemIndex = cart.items.findIndex(
        (item) => item.itemId == req.params.id
      );
      if (itemIndex > -1) {
        let item = cart.items[itemIndex];

        cart.bill -= item.price;
        if (cart.bill < 0) {
          cart.bill = 0;
        }

        cart.items.splice(itemIndex, 1);
        cart.save();
        res.status(200).send(cart);
      } else {
        res.status(404).send("item not found");
      }
    })

    .catch((error) => {
      res.status(400).send(error);
    });
};

//suppression du panier
exports.deleteCart = (req, res) => {
  Cart.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Panier supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};
