
# Execute these commands in order
* 1. npm install

* 2. npx prisma init

* 3. Add below code in schema.prisma
```js
  model User {
   id        Int      @id @default(autoincrement())
   username  String   @unique
   email     String   @unique
   fullName  String
   bio       String?
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
 }

 model Post {
   id        Int      @id @default(autoincrement())
   imageUrl  String
   caption   String?
   location  String?
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
 }
```
* 4. npx prisma format

* 5. npx prisma validate

* 8. npx prisma migrate dev --name init

* 9. npx prisma migrate reset (IF YOU GOT ANY ERROR)

* 10. npx prisma migrate dev --name init

* 11. npx prisma generate (THIS IS WHAT YOU USE INSIDE YOUR CODE)

