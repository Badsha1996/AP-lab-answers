const express = require("express");
const pool = require("./database");
const app = express();

app.use(express.json());

// POST   /assignments
// body = {
//     "title":"Backend Lab",
//     "deadline":"2026-08-10"
// }

// GET    /assignments

// PATCH  /assignments/:id

// DELETE a record using PATCH /assignments

// GET    /assignments?submitted=true

app.listen(3000, () => {
  console.log("The server is running 😀");
});
