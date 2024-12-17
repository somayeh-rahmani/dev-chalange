const http = require("http");
const { readFile } = require("fs/promises");
const path = require("path");
const lookup = require("mime-types").lookup;

// Create the server
const server = http.createServer(async (req, res) => {
  const url = req.url;

  if (url === "/") {
    const content = await readFile("./index.html", "utf8");
    res.writeHead(200, { "content-type": "text/html" });
    res.write(content);
    res.end();
    return;
  }

  if (url === "/index.html" || url === "/index") {
    const content = await readFile("./index.html", "utf8");
    res.writeHead(200, { "content-type": "text/html" });
    res.write(content);
    res.end();
    return;
  }

  if (url === "/product" || url === "/product.html") {
    const content = await readFile("./product.html", "utf8");
    res.writeHead(200, { "content-type": "text/html" });
    res.write(content);
    res.end();
    return;
  }

  if (url.startsWith("/static")) {
    const filePath = path.join("./static", url);
    const content = await readFile(filePath);
    res.writeHead(200, { "content-type": lookup(filePath) });
    res.write(content);
    res.end();
    return;
  }
});

// Start the server
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
