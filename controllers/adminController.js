const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const Links = require("../models/linksModel");
const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();

/********** enregistrement admin **************/

exports.signupAdmin = (req, res) => {
  //validation données reçues
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Données manquantes" });
  }
  //verification de l'unicité de l'inscription
  Admin.findOne({ email: email }).then((user) => {
    if (user !== null) {
      return res.status(409).json({ message: "Compte admin existant" });
    }
  });
  //inscription administrateur
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const admin = new Admin({
        email: req.body.email,
        password: hash,
      });
      admin
        .save()
        .then(() =>
          res.status(201).json({ message: "Admin enregistré", email, hash })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) =>
      res.status(500).json({ message: "Erreur signup admin", error })
    );
};

/********** login admin **************/

exports.loginAdmin = (req, res, next) => {
  //validation données reçues
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Données manquantes" });
  }
  //récupération compte
  Admin.findOne({ email: req.body.email })
    .then((admin) => {
      //on vérifie si le login (email) est correct
      if (admin === null) {
        res.status(401).json({ message: "Non trouvé" });
      } else {
        //on vérifie si le mot de passe est correct
        bcrypt
          .compare(req.body.password, admin.password)
          .then((valid) => {
            if (!valid) {
              res
                .status(401)
                .json({ message: "identifiant ou mot de passe incorrect" });
            } else {
              const token = jwt.sign({ userId: admin._id }, "RANDOM_TOKEN", {
                expiresIn: 1800, //30mn
              });
              res.status(200).json({
                userId: admin._id,
                token: token,
              });
            }
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      }
    })
    .catch((err) => res.status(500).json({ err }));
};

/********** deconnexion admin **************/

exports.logoutAdmin = (req, res, next) => {
  req.session.destroy();
  res.send({ message: "session admin terminée" });
};

/********** recup compte admin **************/

exports.getAdmin = (req, res) => {
  Admin.find()
    .then((admin) => res.status(200).json(admin))
    .catch((error) =>
      res.status(500).json({ message: "Erreur de recupération admin", error })
    );
};

/********** delete compte admin **************/

exports.deleteAdmin = (req, res) => {
  Admin.deleteOne()
    .then((admin) => res.status(200).json(admin))
    .catch((error) =>
      res.status(500).json({ message: "Compte admin supprimé", error })
    );
};

/********** liste des utilisateurs **************/

exports.findAllUsers = (req, res) => {
  User.find()
    .then((users) => res.status(200).json(users))
    .catch((error) =>
      res
        .status(500)
        .json({ message: "Erreur de recupération des utilisateurs", error })
    );
};

/********** recupérer un utilisateur par son email **************/

exports.findOneUser = (req, res) => {
  User.findOne({ email: req.params.id })
    .then((user) => {
      return res.json(user);
    })

    .catch(() =>
      res
        .status(500)
        .json({ message: "Erreur de récupération de l'utilisateur", error })
    );
};

/********** supprimer un utilisateur **************/

exports.deleteUser = (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Utilisateur supprimé" }))
    .catch((error) =>
      res
        .status(500)
        .json({ message: "Erreur de suppression de l'utilisateur", error })
    );
};

/********** récupérer les liens externes **************/

exports.getLinks = (req, res) => {
  Links.find()
    .then((links) => res.status(200).json(links))
    .catch((error) =>
      res
        .status(500)
        .json({ message: "Erreur de recupération des liens externes", error })
    );
};

/********** upload des liens externes **************/

exports.addLinks = (req, res) => {
  //on supprime l'id généré par le navigateur lors de la requete
  delete req.body._id;
  const product = new Links({ ...req.body });
  product
    .save()
    .then(() => res.status(201).json({ message: "Liens enregistrés !" }))
    .catch((error) => res.status(400).json({ error }));
};

/********** modifier les liens externes **************/

exports.modifyLinks = (req, res) => {
  //on modifie l'ID généré par mongoose par celui de la requete (provenant de MongoDB)
  Links.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Liens modifiés !" }))
    .catch((error) => res.status(400).json({ error }));
};
