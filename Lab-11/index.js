const express = require("express");
const pool = require("./database");
const app = express();

app.use(express.json());

// Create a record using POST /assignments,
// body = {
//     "title":"Backend Lab",
//     "deadline":"2026-08-10"
// }
app.post("/assignments", async (req, res) => {
  const { title, deadline } = req.body;

  const result = await pool.query(
    `INSERT INTO assignments
        (title, deadline)
        VALUES ($1,$2)
        RETURNING *`,

    [title, deadline],
  );

  res.status(201).json(result.rows[0]);
});

// Fetch all record using GET /assignments
app.get("/assignments", async (req, res) => {
  const result = await pool.query("SELECT * FROM assignments");
  res.json(result.rows);
});

// Update a record using PATCH /assignments
app.patch("/assignments/:id", async (req, res) => {
  const { id } = req.params;

  const result = await pool.query(
    `UPDATE assignments
        SET submitted=true
        WHERE id=$1
        RETURNING *`,

    [id],
  );

  res.json(result.rows[0]);
});

// Delete a record using PATCH /assignments
app.delete("/assignments/:id", async (req, res) => {
  const { id } = req.params;

  const result = await pool.query(
    `DELETE FROM assignments
         WHERE id = $1
         RETURNING *`,

    [id],
  );

  if (result.rows.length === 0) {
    return res.status(404).json({
      message: "Assignment not found",
    });
  }

  res.json({
    message: "Assignment deleted successfully",
    assignment: result.rows[0],
  });
});


app.listen(3000, () => {
  console.log("The server is running 😀");
});

