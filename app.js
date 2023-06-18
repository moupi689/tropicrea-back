//import des modules necessaires
const express = require("express"); //gestion des routes
const cors = require("cors"); //gestion erreurs CORS
const morgan = require("morgan"); // logger de requetes
const path = require("path");
var parseurl = require("parseurl"); //recupére l'url
const session = require("express-session"); //création session utilisateur avec cookie + compte vues
const productsRoutes = require("./routers/productsRoutes"); //routeur pour les produits
const headerpicturesRoutes = require("./routers/headerpicturesRoutes"); //routeur pour les produits
const lookbookRoutes = require("./routers/lookbookRoutes"); //routeur pour les produits
const usersRoutes = require("./routers/usersRoutes"); //routeur pour les users
const adminRoutes = require("./routers/adminRoutes"); //routeur pour l admin
const cartRoutes = require("./routers/cartRoutes"); //routeur pour le panier
const wishlistRoutes = require("./routers/wishlistRoutes"); //routeur pour le panier
const mongoose = require("./db.config"); //connexion a MongoDB via Mongoose
const auth = require("./middleware/auth");
const { send } = require("process");

/*
//connection a mongoDB via mongoose en local ou cloud (atlas)
const mongoose = require("./db.config"); //connexion a MongoDB via Mongoose
const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore({
  uri: process.env.DB_PATH_LOCAL,
  collection: "sessions",
});
*/

//connection à mongoDB avec cluster partégé digitalOcean

const { MongoClient } = require("mongodb");

async function main() {
  const uri =
    "mongodb+srv://doadmin:q20C91vjFim34y75@db-mongodb-nyc3-30974-d2b124af.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=db-mongodb-nyc3-30974";
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Connected successfully. Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

main().catch(console.error);

//initialisation API
const app = express();

//prévention des erreurs CORS
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

//session utilisateur
const oneDay = 1000 * 60 * 60 * 24;

app.use(
  session({
    name: "tropicrea_session",
    secret: "tropicrea",
    //store: store,
    unset: "destroy",
    saveUninitialized: true,
    cookie: { maxAge: oneDay, sameSite: "lax", httpOnly: false },
    resave: false,
  })
);

/*app.use(function (req, res, next) {
  if (!req.session.views) {
    req.session.views = {};
  }

  // recupere path url
  var pathname = parseurl(req).pathname;

  // compte les visites
  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1;

  next();
});*/

//static files
app.use("/uploads", express.static("uploads"));

app.use(morgan("dev"));
app.use(express.json()); //pour les req JSON
app.use(express.urlencoded({ extended: true })); //pour les req string ou array

//routes
app.use("/api/products", productsRoutes);
app.use("/api/headerpictures", headerpicturesRoutes);
app.use("/api/lookbook", lookbookRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/admin", adminRoutes);

module.exports = app;
