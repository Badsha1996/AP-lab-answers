const express = require("express");
const router = express.Router();
const prisma = require("../db");

// POST /posts
router.post("/", async (req, res) => {
  try {
    const { imageUrl, caption, location } = req.body;

    if (!imageUrl)
      return res.status(400).json({ error: "imageUrl is required" });

    const post = await prisma.post.create({
      data: { imageUrl, caption, location }
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET /posts
router.get("/", async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// --------------------------------------------------
// Advanced Prisma Queries
// --------------------------------------------------

// Search posts by caption or location
// Example:
// GET /posts/search?caption=travel
// GET /posts/search?location=delhi
// GET /posts/search?caption=travel&location=delhi
router.get("/search", async (req, res) => {
  try {
    const { caption, location } = req.query;

    if (!caption && !location)
      return res.status(400).json({ error: "caption or location is required" });

    const conditions = [];

    if (caption)
      conditions.push({ caption: { contains: caption, mode: "insensitive" } });

    if (location)
      conditions.push({ location: { contains: location, mode: "insensitive" } });

    const posts = await prisma.post.findMany({
      where: { OR: conditions }
    });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Filter posts by ID range
// Example:
// GET /posts/filter/range?min=5&max=20
router.get("/filter/range", async (req, res) => {
  try {
    const min = Number(req.query.min);
    const max = Number(req.query.max);

    if (!Number.isInteger(min) || !Number.isInteger(max))
      return res.status(400).json({ error: "min and max must be integers" });

    const posts = await prisma.post.findMany({
      where: {
        id: { gte: min, lte: max }
      }
    });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Filter posts created after a date
// Example:
// GET /posts/filter/date?after=2026-01-01
router.get("/filter/date", async (req, res) => {
  try {
    const after = new Date(req.query.after);

    if (!req.query.after || isNaN(after.getTime()))
      return res.status(400).json({ error: "after must be a valid date" });

    const posts = await prisma.post.findMany({
      where: {
        createdAt: { gt: after }
      }
    });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Sort posts
// Example:
// GET /posts/sort?field=id&order=desc
router.get("/sort", async (req, res) => {
  try {
    const field = req.query.field || "id";
    const order = req.query.order || "asc";

    if (!["id", "createdAt"].includes(field))
      return res.status(400).json({ error: "field must be id or createdAt" });

    if (!["asc", "desc"].includes(order))
      return res.status(400).json({ error: "order must be asc or desc" });

    const posts = await prisma.post.findMany({
      orderBy: { [field]: order }
    });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Pagination
// Example:
// GET /posts/pagination?page=2&limit=5
router.get("/pagination", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    if (!Number.isInteger(page) || !Number.isInteger(limit) || page < 1 || limit < 1)
      return res.status(400).json({ error: "page and limit must be positive integers" });

    const posts = await prisma.post.findMany({
      skip: (page - 1) * limit, // start 
      take: limit,              // till how
      orderBy: { id: "asc" }
    });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// GET /posts/:id
router.get("/:id", async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(req.params.id) }
    });

    if (!post)
      return res.status(404).json({ error: "Post not found" });

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// PATCH /posts/:id
router.patch("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const post = await prisma.post.findUnique({ where: { id } });

    if (!post)
      return res.status(404).json({ error: "Post not found" });

    const updated = await prisma.post.update({
      where: { id },
      data: {
        imageUrl: req.body.imageUrl,
        caption: req.body.caption,
        location: req.body.location
      }
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// DELETE /posts/:id
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const post = await prisma.post.findUnique({ where: { id } });

    if (!post)
      return res.status(404).json({ error: "Post not found" });

    await prisma.post.delete({ where: { id } });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
