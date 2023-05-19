const mongoose = require("mongoose");

const lookbookSchema = mongoose.Schema({
  picture: { type: String, required: true },
});

module.exports = mongoose.model("lookbook", lookbookSchema);
