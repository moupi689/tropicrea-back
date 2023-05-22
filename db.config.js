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
//const mongoDB = `mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@cluster0.c6uutj6.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect("mongodb://localhost/tropicrea_database", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB ok"))
  .catch(() => console.log("Erreur connexion à MongoDB"));

module.exports = mongoose;
