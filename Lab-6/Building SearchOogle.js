const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const ARTICLES_PATH = path.join(__dirname, "articles.txt");

// Create an HTTP server
const app = http.createServer((req, res) => {
  // Parse the request URL using the URL API
  const url = new URL(req.url, `http://${req.headers.host}`);

  // Handle GET /
  if (req.method === "GET" && url.pathname === "/") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    res.end(`
<!DOCTYPE html>
<html>
<head>
    <title>SearchOogle</title>
</head>
<body>
    <h1>SearchOogle</h1>

    <form action="/search" method="GET">
        <input
            type="text"
            name="q"
            placeholder="Enter a keyword"
            required
        />
        <button type="submit">Search</button>
    </form>
</body>
</html>
        `);

    return;
  }

  // Handle GET /search
  if (req.method === "GET" && url.pathname === "/search") {
    // Get the search keyword and remove leading/trailing whitespace
    const keyword = (url.searchParams.get("q") || "").trim();

    // Read articles.txt asynchronously
    fs.readFile(ARTICLES_PATH, "utf8", (err, data) => {
      // Handle file-reading error
      if (err) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });

        res.end("Unable to read articles");
        return;
      }

      // Search case-insensitively
      const matchingArticles = data
        .split("\n")
        .filter((article) =>
          article.toLowerCase().includes(keyword.toLowerCase()),
        );

      // No matching articles
      if (matchingArticles.length === 0) {
        res.writeHead(200, {
          "Content-Type": "text/html",
        });

        res.end(`
                    <!DOCTYPE html>
                    <html>
                    <body>
                        <h2>No results found</h2>
                    </body>
                    </html>
                                    `);

        return;
      }

      // Create <li> elements for matching articles
      const listItems = matchingArticles
        .map((article) => `<li>${article}</li>`)
        .join("\n");

      res.writeHead(200, {
        "Content-Type": "text/html",
      });

      res.end(`
                    <!DOCTYPE html>
                    <html>
                    <body>
                        <h2>Results for "${keyword}"</h2>
                        <ul>
                            ${listItems}
                        </ul>
                    </body>
                    </html>
                `);
    });

    return;
  }

  // Handle all other routes
  res.writeHead(404, {
    "Content-Type": "text/plain",
  });

  res.end("Not Found");
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = server;
