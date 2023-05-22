/*********demarrage du serveur********/
//     npm run.dev (developpement)   //
//         npm run start (prod)      //
/*************************************/

//import des modules necessaires

const http = require("http");
const app = require("./app");

const hostname = process.env.SERVER_HOSTNAME;
const port = process.env.SERVER_PORT || process.env.PORT;

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
