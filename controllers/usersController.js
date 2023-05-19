const bcrypt = require("bcrypt");
const User = require("../models/userModel");

//inscription utilisateur

exports.signupUser = (req, res) => {
  //validation données reçues
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Données manquantes" });
  }
  //verification de l'unicité de l'inscription
  User.findOne({ email: req.body.email }).then((user) => {
    if (user !== null) {
      res
        .status(409)
        .json({ message: `L'utilisateur ${req.body.email} existe déjà` });
    } else {
      const user = new User({
        email: req.body.email,
        name: req.body.name,
        firstname: req.body.firstname,
        phone: req.body.phone,
      });

      user
        .save()
        .then((user) => {
          session = req.session;
          session.id = req.body.email;
          res.status(201).json({
            message: "Utilisateur enregistré",
            userId: user._id,
            sessionId: session.id,
            email: user.email,
            name: user.name,
            firstname: user.firstname,
            phone: user.phone,
          });
        })

        .catch((error) =>
          res
            .status(500)
            .json({ message: "Erreur signup de l'utilisateur", error })
        );
    }
  });
};

//login utilisateur

exports.loginUser = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      //on vérifie si le login (email) est correct
      if (user === null) {
        res.status(401).json({ message: "utilisateur non trouvé" });
      } else {
        session = req.session;
        session.id = req.body.email;
        res.status(200).send({ userId: user._id, sessionId: session.id });
      }
    })
    .catch((err) => res.status(500).json({ err }));
};

//logout

exports.logoutUser = (req, res, next) => {
  req.session.destroy();
  res.send({ message: "utilisateur déconnecté" });
};
