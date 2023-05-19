const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; //requete avec headers
    //const token = req.query.q; //token passé dans l'url
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN");
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };

    next();
  } catch (error) {
    let response = req.query.q;
    res.status(401).json({ message: "utilisateur non autorisé", response });
  }
};
