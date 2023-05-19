const Lookbook = require("../models/lookbookModel");

const fs = require("fs");

//fetch du lookbook
exports.getLookbook = (req, res) => {
  res;
  Lookbook.find()
    .then((lookbook) => res.status(200).json(lookbook))
    .catch((error) => res.status(400).json({ error }));
};

//fetch d'une image du lookbook'
exports.findOneLookbook = (req, res) => {
  Lookbook.findOne({ title: req.params.id })
    .then((product) => res.status(200).json(product))
    .catch((error) => res.status(404).json({ error }));
};

//upload dans le lookbook
exports.addToLookbook = (req, res) => {
  //on supprime l'id généré par le navigateur lors de la requete
  delete req.body._id;

  const lookbook = new Lookbook({
    picture: `./${req.file.path}`,
  });

  lookbook
    .save()
    .then(() => res.status(201).json({ message: "Image enregistrée !" }))
    .catch((error) => res.status(400).json({ error }));
};

//suppression d'une image
exports.deleteFromLookbook = (req, res) => {
  Lookbook.findOne({ _id: req.params.id }).then((image) => {
    let filename = image.picture.split("./uploads/lookbook/")[1];
    fs.unlink(`./uploads/lookbook/${filename}`, () => {
      Lookbook.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Image supprimée !" }))
        .catch((error) => res.status(400).json({ error }));
    });
  });
};
