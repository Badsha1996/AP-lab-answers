const http = require("http");

const server = http.createServer((req, res) => {

  // Only POST requests are allowed
  if (req.method !== "POST") {
    res.writeHead(400, {
      "Content-Type": "application/json"
    });

    res.end(JSON.stringify({
      status: "failed"
    }));

    return;
  }

  let body = "";

  // Receive the request body
  req.on("data", (chunk) => {
    body += chunk;
  });

  // Body has been completely received
  req.on("end", () => {

    let student;

    // Try to parse JSON
    try {
      student = JSON.parse(body);
    } catch (error) {
      res.writeHead(400, {
        "Content-Type": "application/json"
      });

      res.end(JSON.stringify({
        status: "failed"
      }));

      return;
    }

    // Validate name
    const validName =
      typeof student.name === "string" &&
      student.name.trim() !== "";

    // Validate GPA
    const validGpa =
      typeof student.gpa === "number" &&
      student.gpa >= 0 &&
      student.gpa <= 4;

    // If validation fails
    if (!validName || !validGpa) {
      res.writeHead(400, {
        "Content-Type": "application/json"
      });

      res.end(JSON.stringify({
        status: "failed"
      }));

      return;
    }

    // Valid student data
    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    res.end(JSON.stringify({
      status: "success"
    }));
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});