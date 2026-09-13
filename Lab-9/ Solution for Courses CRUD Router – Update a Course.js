const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const filePath = path.join(__dirname, 'courses.json');

router.put('/:id', (req, res) => {

    const courses = JSON.parse(
        fs.readFileSync(filePath, 'utf8')
    );

    const id = Number(req.params.id);

    const index = courses.findIndex(course => course.id === id);

    courses[index] = {
        ...courses[index],
        ...req.body
    };

    fs.writeFileSync(
        filePath,
        JSON.stringify(courses, null, 2)
    );

    res.json(courses[index]);

});

module.exports = router;
