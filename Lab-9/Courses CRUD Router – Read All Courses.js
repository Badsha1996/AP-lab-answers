// const express = require('express');
// const fs = require('fs');
// const path = require('path');

// const router = express.Router();

// const filePath = path.join(__dirname, 'courses.json');

// router.get('/', (req, res) => {
//     fs.readFile(filePath, 'utf8', (err, data) => {
//         if (err) {
//             return res.status(500).json({
//                 error: 'Unable to read course data'
//             });
//         }

//         try {
//             const courses = JSON.parse(data);

//             return res.status(200).json(courses);
//         } catch (error) {
//             return res.status(500).json({
//                 error: 'Unable to read course data'
//             });
//         }
//     });
// });

// module.exports = router;

const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const filePath = path.join(__dirname, 'courses.json');

router.get('/', (req, res) => {

    const courses = JSON.parse(
        fs.readFileSync(filePath, 'utf8')
    );

    res.json(courses);

});

module.exports = router;