/*********demarrage en local (terminal)*********/
//                                             //
//  brew services start mongodb-community@6.0  //
//  brew services stop mongodb-community@6.0   //
//        check: brew services list            //
//                                             //
/***********************************************/

//import de mongoose pour la connexion à MongoDB
const mongoose = require("mongoose");

//mongoDB atlas (cloud)
const mongoDB =
  "mongodb+srv://admin:admin2k@cluster0.xiyyyzx.mongodb.net/?retryWrites=true&w=majority";

//mongoDB (local)
//const mongoDB = "mongodb://localhost/tropicrea_database";

mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB ok"))
  .catch(() => console.log("Erreur connexion à MongoDB"));

module.exports = mongoose;
