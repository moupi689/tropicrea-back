//on importe mongoose pour la connexion a MongoDB
const mongoose = require("mongoose");

const linksSchema = mongoose.Schema({
  facebook: { type: String, required: true, unique: true },
  instagram: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Links", linksSchema);
