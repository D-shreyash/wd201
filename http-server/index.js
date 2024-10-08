const fs = require("fs");
const http = require("http");
const minimist = require("minimist");

let home = "";
let project = "";
let registrationContent = "";

fs.readFile("home.html", (err, data) => {
  if (err) throw err;
  home = data;
});

fs.readFile("project.html", (err, data) => {
  if (err) throw err;
  project = data;
});

fs.readFile("registration.html", (err, register) => {
  if (err) {
    throw err;
  }
  registrationContent = register;
});

const server = http.createServer((req, res) => {
  let url = req.url;
  res.writeHeader(200, { "content-type": "text/html" });
  switch (url) {
    case "/project":
      res.write(project);
      res.end();
      break;
    case "/registration":
      res.write(registrationContent);
      res.end();
      break;
    default:
      res.write(home);
      res.end();
      break;
  }
});

const args = minimist(process.argv.slice(2));
const port = args.port;

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
