/*********demarrage du serveur********/
//     npm run.dev (developpement)   //
//         npm run start (prod)      //
/*************************************/

//import des modules necessaires

const http = require("http");
const app = require("./app");

const hostname = "127.0.0.1";
const port = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
