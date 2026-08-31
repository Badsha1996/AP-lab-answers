const http = require("http");

const server = http.createServer((req, res)=>{
    res.writeHead(200, {"Content-Type": "application/json"})
    res.end(JSON.stringify({ "version": "1.0.0"}))
})

server.listen(3000)