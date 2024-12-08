const http = require("http");
const { readFileSync } = require("fs");
const lookup = require("mime-types").lookup;

const home = readFileSync("./index.html");
const style = readFileSync("./style.css");
const pic = readFileSync("./cactus_img.jpg");

const server = http.createServer((req, res) => {
  const url = req.url;
  console.log(url);

  if (url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(home);
    res.end();
  } else if (url === "/style.css") {
    const contentType = lookup("style.css") || "text/css";
    res.writeHead(200, { "content-type": contentType });
    res.write(style);
    res.end();
  } else if (url === "/cactus_img.jpg") {
    const contentType = lookup("cactus_img.jpg") || "image/jpeg";
    res.writeHead(200, { "content-type": contentType });
    res.write(pic);
    res.end();
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write("<h1>Page Not Found</h1>");
    res.end();
  }
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
