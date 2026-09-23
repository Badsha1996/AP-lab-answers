const express = require("express")
const app = express()

// Execute these commands in order
// 1. npm install

// 2. npx prisma init

// 3. Add below code in schema.prisma 
//  model User {
//   id        Int      @id @default(autoincrement())
//   username  String   @unique
//   email     String   @unique
//   fullName  String
//   bio       String?
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
// } 

// model Post {
//   id        Int      @id @default(autoincrement())
//   imageUrl  String
//   caption   String?
//   location  String?
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
// }

// 4. npx prisma format

// 5. npx prisma validate

// 6. Now go to your postgres and create a new table using pgadmin query tool
// ****IMPORTANT : IF you have assignments table from prevoius LAB-11, 
// drop that table first using "DROP TABLE assignments" Command;

// CREATE TABLE Assignments (
//     id SERIAL PRIMARY KEY,
//     title VARCHAR(200) NOT NULL,
//     deadline DATE,
//     submitted BOOLEAN DEFAULT FALSE
// );


// 7. npx prisma db pull

// 8. npx prisma migrate dev --name init

// 9. npx prisma migrate reset

// 10. npx prisma migrate dev --name init

// 11. npx prisma generate (THIS IS WHAT YOU USE INSIDE YOUR CODE)

app.listen(3000, ()=>{
    console.log("server is running!!")
})