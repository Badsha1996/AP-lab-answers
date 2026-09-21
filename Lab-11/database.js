// ************ MOVE THESE CREDENTIAL TO .env ************
// DB_HOST=localhost
// DB_PORT=5432
// DB_USER=postgres
// DB_PASSWORD=yourpassword
// DB_NAME=assignment_portal

// ************ Run this quary to query tool ************
// CREATE TABLE assignments (
//     id SERIAL PRIMARY KEY,
//     title VARCHAR(200) NOT NULL,
//     deadline DATE,
//     submitted BOOLEAN DEFAULT FALSE
// );

const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: ``,
  database: "postgres",
});

module.exports = pool;
