## Part 2 — Post CRUD API + Prisma Query Operations

In this task, you will extend the existing Prisma + Express application by implementing **Post CRUD APIs** and practicing Prisma query operations.

The User CRUD API is already completed. You only need to implement the logic inside:

```
src/routes/posts.routes.js
```

Request flow:

```
Request → Express Route → Prisma Client → PostgreSQL
```

---

## 1. Database Setup

Update your `.env` file with the PostgreSQL database URL.

Example:

```env
DATABASE_URL="postgresql://<username>@localhost:5432/<database>"
```

Run the following commands:

```bash
npm install
```

```bash
npx prisma migrate reset
```

```bash
npx prisma migrate dev --name init
```

```bash
npx prisma generate
```

Run the seed file:

```bash
npx prisma db seed
```

The seed file will insert sample users and posts into the database.

---

# 2. Implement Post Routes

File:

```
src/routes/posts.routes.js
```

The routes are already created. Implement only the Prisma logic.

---

## Post CRUD Operations

### 1. Create Post

Endpoint:

```
POST /posts
```

Create a new post.

Request:

```json
{
  "imageUrl": "image.png",
  "caption": "My trip",
  "location": "Goa"
}
```

Requirements:

- `imageUrl` is required.
- `caption` and `location` are optional.
- Return the created post.

---

### 2. Get All Posts

Endpoint:

```
GET /posts
```

Return all posts from the database.

---

### 3. Get Post By ID

Endpoint:

```
GET /posts/:id
```

Example:

```
GET /posts/5
```

Return the post if it exists.

If post does not exist:

```json
{
  "error": "Post not found"
}
```

---

### 4. Update Post

Endpoint:

```
PATCH /posts/:id
```

Allowed fields:

```
imageUrl
caption
location
```

Example:

```json
{
  "caption": "Updated caption"
}
```

Return the updated post.

---

### 5. Delete Post

Endpoint:

```
DELETE /posts/:id
```

Delete the post using its id.

Successful response:

```
204 No Content
```

---

# Advanced Prisma Queries

## 1. Search Posts

Endpoint:

```
// GET /posts/search?caption=travel
// GET /posts/search?location=delhi
// GET /posts/search?caption=travel&location=delhi
```

Search posts using:

- caption
- location

Requirements:

- Use `contains`
- Use case-insensitive search
- Combine conditions using `OR`

---

## 2. Filter Posts By ID Range

Endpoint:

```
GET /posts/filter/range?min=5&max=20
```

Return posts where:

```
id >= min
id <= max
```

Use:

```
gte
lte
```

---

## 3. Filter Posts By Date

Endpoint:

```
GET /posts/filter/date?after=2026-01-01
```

Return posts created after the given date.

Use:

```
gt
```

---

## 4. Sort Posts

Endpoint:

```
GET /posts/sort?field=id&order=desc
```

Support sorting by:

```
id
createdAt
```

Use:

```
orderBy
```

---

## 5. Pagination

Endpoint:

```
GET /posts/pagination?page=2&limit=5
```

Implement pagination using:

```
skip
take
```

Formula:

```
skip = (page - 1) * limit
```

---

## Learning Outcomes

After completing this task, you should understand:

- Prisma CRUD operations
- `create`
- `findMany`
- `findUnique`
- `update`
- `delete`
- Filtering using `where`
- Searching using `contains`
- Combining conditions using `OR`
- Comparison operators:
  - `gt`
  - `gte`
  - `lt`
  - `lte`
- Sorting using `orderBy`
- Pagination using `skip` and `take`

---

## Final Checklist

- Database migration completed
- Prisma Client generated
- Seed data inserted
- POST `/posts` works
- GET `/posts` works
- GET `/posts/:id` works
- PATCH `/posts/:id` works
- DELETE `/posts/:id` works
- Search implemented using `contains`
- Range filter implemented using `gte/lte`
- Date filter implemented using `gt`
- Sorting implemented using `orderBy`
- Pagination implemented using `skip/take`