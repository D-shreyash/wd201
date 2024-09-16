const fs = require("fs");
const http = require("http");

let home = "";
let project = "";

fs.readFile("home.html", (err, data) => {
  if (err) throw err;
  home = data;
});

fs.readFile("project.html", (err, data) => {
  if (err) throw err;
  project = data;
});

const server = http.createServer((req, res) => {
  let url = req.url;
  res.writeHeader(200, { "content-type": "text/html" });
  switch (url) {
    case "/project":
      res.write(project);
      res.end();
      break;
    default:
      res.write(home);
      res.end();
      break;
  }
});

server.listen(3000);
