const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/webp": "webp",
};

//configure le chemin et le nom des fichiers entrants
const storage = multer.diskStorage({
  destination: function (req, files, cb) {
    cb(null, "./uploads/articles/");
  },
  filename: function (req, files, cb) {
    const extension = MIME_TYPES[files.mimetype];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, files.fieldname + "-" + uniqueSuffix + "." + extension);
  },
});

//verifie le type de fichier (images)
const fileFilter = (req, file, cb) => {
  if (files.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("Format non supporté", 400), false);
  }
};

module.exports = multer({ storage: storage }).array("image", 5);
