const fs = require('fs');

const path = require('path');

const filePath = path.join(__dirname, 'huge_data.txt');

const reader = fs.createReadStream(filePath, 'utf-8');

let lineCount = 0;

reader.on('data', (chunk) => {
    lineCount += chunk.split('\n').length - 1;
});

reader.on('end', () => {
    console.log('Total lines:', lineCount);
});

// DO NOT MODIFY BELOW THIS LINE
module.exports = { reader };