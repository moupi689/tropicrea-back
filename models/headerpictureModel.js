//creation d'un modèle pour chaque entête de catégorie de produit

const mongoose = require("mongoose");

const headerpictureSchema = mongoose.Schema({
  category: { type: String, required: true },
  picture: { type: String, required: true },
});

module.exports = mongoose.model("headerpicture", headerpictureSchema);
