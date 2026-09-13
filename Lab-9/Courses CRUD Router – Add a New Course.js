const express = require("express");
const path = require("path");
const fs = require("fs")

const router = express.Router();

router.post("/", (req, res)=>{
    const filePath = path.join(__dirname, "courses.json")
    const course = JSON.parse(
        fs.readFileSync(filePath, 'utf8')
    )
    course.push(req.body)
    
    fs.writeFileSync(filePath,JSON.stringify(course));

    res.status(201).json(req.body);
})

// TODO:
// Create a POST / route.
// Read courses.json.
// Add the new course from req.body.
// Save the updated courses back to the file.
// Return the newly added course with status 201.
module.exports = router;