const http = require("http");
const dotenv = require("dotenv");

dotenv.config();

// Store the time when the server starts 
const serverStartTime = Date.now();

// Write your code below:
const app = http.createServer((req, res)=>{
    const elapsedTime = Date.now() - serverStartTime;
    if(elapsedTime <= 20000){
        res.writeHead(200, {"Content-type":"text/plain"})
        res.end("Congratulations! Your coupon code is FLASH20")
    }else{
        res.writeHead(408, {"Content-type":"text/plain"})
        res.end("Sorry! The flash sale has ended.")
    }
})


const PORT = process.env.PORT;

// Uncomment below line: app should listen to the PORT
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
