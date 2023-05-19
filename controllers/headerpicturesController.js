const Headerpicture = require("../models/headerpictureModel");

const fs = require("fs");

//demande de l'ensemble des entetes
exports.findAllPictures = (req, res) => {
  res;
  Headerpicture.find()
    .then((pictures) => res.status(200).json(pictures))
    .catch((error) => res.status(400).json({ error }));
};

//demande de l'entête de la catégories de produits
exports.findOnePicture = (req, res) => {
  Headerpicture.findOne({ category: req.params.id })
    .then((picture) => res.status(200).json(picture))
    .catch((error) => res.status(404).json({ error }));
};

//création des entêtes des catégories de produits
exports.createHeaderpicture = (req, res) => {
  //on supprime l'id généré par le navigateur lors de la requete
  delete req.body._id;
  const picture = new Headerpicture({
    category: req.body.category,
    picture: `./${req.file.path}`, //url sur le serveur
  });
  picture
    .save()
    .then(() => res.status(201).json({ message: "Image enregistrée !" }))
    .catch((error) => res.status(400).json({ error }));
};

//suppression d'une entete
exports.deletePicture = (req, res) => {
  Headerpicture.findOne({ _id: req.params.id }).then((image) => {
    let filename = image.picture.split("./uploads/entetes/")[1];
    fs.unlink(`./uploads/entetes/${filename}`, () => {
      Headerpicture.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Image supprimée !" }))
        .catch((error) => res.status(400).json({ error }));
    });
  });
};
