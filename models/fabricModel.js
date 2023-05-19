//creation d'un modèle pour chaque tissu

const mongoose = require("mongoose");

const fabricSchema = mongoose.Schema({
  fabricname: { type: String, required: true },
  tissuename: { type: String },
  tissuepicture: { type: String },
});

module.exports = mongoose.model("fabric", fabricSchema);
