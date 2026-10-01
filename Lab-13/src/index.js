const express = require("express");
const app = express();
const userRouter = require("./routes/users.routes");
const postRouter = require("./routes/posts.routes");
app.use(express.json());

app.use("/users" , userRouter);
app.use("/posts", postRouter);

app.get("/health" , (req,res) =>{
    res.json({status: "ok"});
})

app.listen(3000,()=>{
    console.log("Server is running at 3000");
})