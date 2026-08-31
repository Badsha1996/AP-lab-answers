const http = require("http");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT;

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/") res.end("Hello World");
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = { server };