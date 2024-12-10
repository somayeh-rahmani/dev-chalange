const http = require("http");
const { readFile } = require("fs");
const path = require("path");
const lookup = require("mime-types").lookup;

// Read files into an object
const files = {
  "/": "./index.html",
  "/product": "./product.html",
  "/productStyle": "./static/productStyle.css",
  "/style": "./static/style.css",
  "/productLogic": "./static/productLogic",
  "/cactus_img": "./cactus_img.jpeg",
};

// Function to read a file based on the filename
function serveFile(filePath, res) {
  const contentType = lookup(filePath) || "application/octet-stream";

  readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write("<h1>File Not Found</h1>");
      res.end();
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.write(data);
      res.end();
    }
  });
}

// Create the server
const server = http.createServer((req, res) => {
  const url = req.url;
  console.log(url);

  if (files[url]) {
    serveFile(files[url], res);
  } else if (url.startsWith("/static/")) {
    const filePath = path.join(__dirname, url);
    serveFile(filePath, res);
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write("<h1>Page Not Found</h1>");
    res.end();
  }
});

// Start the server
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
