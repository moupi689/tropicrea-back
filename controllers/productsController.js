//on importe le schema de données crée avec mongoose
const Product = require("../models/productModel");

const fs = require("fs");

//demande de l'ensemble des produits
exports.findAllProducts = (req, res) => {
  res;
  Product.find()
    .then((products) => res.status(200).json(products))
    .catch((error) => res.status(400).json({ error }));
};

//demande d'un produit selon son id
exports.findOneProduct = (req, res) => {
  Product.findOne({ title: req.params.id })
    .then((product) => res.status(200).json(product))
    .catch((error) => res.status(404).json({ error }));
};

//création d'un nouvel article dans la BdD
exports.createProduct = (req, res) => {
  //on supprime l'id généré par le navigateur lors de la requete
  delete req.body._id;

  let images = [];

  req.files.forEach((file) => {
    images.push(file.path);
  });

  const product = new Product({
    ...req.body,
    pictures: {
      picture1: images[0],
      picture2: images[1],
      picture3: images[2],
      picture4: images[3],
    },
  });
  product
    .save()
    .then(() => res.status(201).json({ message: "Article enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

//modification d'un produit dans la BdD
exports.modifyProduct = (req, res) => {
  //on modifie l'ID généré par mongoose par celui de la requete (provenant de MongoDB)

  Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Article modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

//suppression d'un produit
exports.deleteProduct = (req, res) => {
  Product.findOne({ _id: req.params.id }).then((item) => {
    let pictures = item.pictures;
    let picsarray = Object.values(pictures);

    try {
      picsarray.forEach((path) => fs.existsSync(path) && fs.unlinkSync(path));
      // success
      Product.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Article supprimé !" }))
        .catch((error) => res.status(400).json({ error }));
    } catch (err) {
      console.error(err);
    }
  });
};
