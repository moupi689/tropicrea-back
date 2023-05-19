const Fabric = require("../models/fabricModel");

const fs = require("fs");

//demande des tissus selon la matière
exports.getTissues = (req, res) => {
  Fabric.find()
    .then((tissues) => res.status(200).json(tissues))
    .catch((error) => res.status(404).json({ error }));
};

//création des panels de tissus
exports.addTissue = (req, res) => {
  //on supprime l'id généré par le navigateur lors de la requete
  delete req.body._id;
  const tissues = new Fabric({
    fabricname: req.body.fabricname,
    tissuename: req.body.tissuename,
    tissuepicture: `./${req.file.path}`,
  });
  tissues
    .save()
    .then(() => res.status(201).json({ message: "Tissu enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

//suppression d'un tissu
exports.deleteTissue = (req, res) => {
  Fabric.findOne({ _id: req.params.id }).then((image) => {
    let filename = image.tissuepicture.split("./uploads/tissus/")[1];
    fs.unlink(`./uploads/tissus/${filename}`, () => {
      Fabric.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Image supprimée !" }))
        .catch((error) => res.status(400).json({ error }));
    });
  });
};
