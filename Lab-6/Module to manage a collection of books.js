const http = require("http");
const dotenv = require("dotenv");

dotenv.config();

const books = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear"
  },
  {
    id: 2,
    title: "The Alchemist",
    author: "Paulo Coelho"
  },
  {
    id: 3,
    title: "Clean Code",
    author: "Robert C. Martin"
  }
];

const server = http.createServer((req, res) => {

  res.setHeader("Content-Type", "application/json");

    // Write your routing logic here
    if(req.url === "/books") {
      res.statusCode = 200
      res.end(JSON.stringify(books))
      return
    }

    if(req.url.startsWith("/books/")){
      const strid = req.url.split("/")[2]
      const id = Number(strid)

      
      if(Number.isNaN(id)) {
        res.statusCode = 400
        res.end(JSON.stringify({
          "error": "Invalid book ID"
        }))
        return
      }

      const book = books.find((book)=>book.id===id)
      if(!book){
        res.statusCode = 404
        res.end(JSON.stringify({"error": "Book not found"}))
        return
      }

      res.statusCode = 200
      res.end(JSON.stringify(book))
      return
    }

    res.statusCode = 404
    res.end(JSON.stringify({
        "error": "Route not found"
    }))
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { server };