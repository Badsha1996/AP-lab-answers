const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  // Check if the request is GET /history
  if (req.method === "GET" && req.url === "/history") {
    const pathToFile = path.join(__dirname, "chat.txt");
    // Read chat.txt asynchronously
    fs.readFile(pathToFile, "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });

        res.end("Unable to load chat history");
        return;
      }
      res.statusCode = 200;
      console.log(data);
      res.end(data);
    });

    return;
  }

  // Handle all other routes
  res.writeHead(404, {
    "Content-Type": "text/plain",
  });

  res.end("Route Not Found");
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
