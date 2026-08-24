const fs = require("fs");
const path = require("path");
const readline = require("readline");

const STUDENTS_FILE_PATH = path.join(__dirname, "students.txt");
const PROMPT = "Enter New Student Name: ";

const readLineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const data = fs.readFileSync(STUDENTS_FILE_PATH, "utf8");
console.log("Current Students:");
console.log(data);

readLineInterface.question(PROMPT, (input) => {
    fs.appendFileSync(STUDENTS_FILE_PATH, input + "\n");

    console.log("Student Added Successfully!");
    readLineInterface.close();
});