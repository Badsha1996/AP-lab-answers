const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const filePath = path.join(__dirname, 'courses.json');

router.delete('/:id', (req, res) => {

    const courses = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const id = Number(req.params.id);

    // Find the course with the given ID.
    const index = courses.findIndex(course => course.id === id);
    const deletedCourse = courses[index];

    // Remove it from the array.
    // Save the updated array back to courses.json.
    courses.splice(index, 1);
    fs.writeFileSync(filePath,JSON.stringify(courses, null, 2));

    // Return the deleted course as a JSON response.
    res.json(deletedCourse);

});

module.exports = router;