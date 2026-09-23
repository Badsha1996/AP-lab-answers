const express = require("express")
const app = express()

app.use(express.json())

app.get("/", (req, res)=>{
    res.send("Lets Learn Prisma")
})

app.listen(3000, ()=>{
    console.log("server is running!!")
})