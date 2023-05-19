//creation d'un modèle pour chaque produit

const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  gender: { type: String, required: true },
  category: { type: String, required: true },
  fabric: { type: String, required: true },
  tissue: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  pictures: {
    picture1: { type: String, required: true },
    picture2: { type: String },
    picture3: { type: String },
    picture4: { type: String },
  },
  price: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
  isNewItem: { type: Boolean, required: true },
});

module.exports = mongoose.model("product", productSchema);
