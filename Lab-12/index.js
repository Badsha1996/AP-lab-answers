require("dotenv/config");

const express = require("express");
const usersRouter = require("./routes/users.route");
const app = express();

// Parses JSON request bodies, otherwise req.body is undefined on POST/PATCH
app.use(express.json());

app.use("/users", usersRouter);

app.listen(3000, () => {
  console.log("server is running!!");
});
