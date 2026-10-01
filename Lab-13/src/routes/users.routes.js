const express = require("express");
const router = express.Router();
const prisma = require("../db");

router.post("/", async (req, res) => {
  try {
    const { username, email, fullName, bio, isPrivate } = req.body;

    if (!username || !email || !fullName)
      return res.status(400).json({ error: "Required fields missing" });

    const exists = await prisma.user.findFirst({
      where: { OR: [{ username }, { email }] }
    });

    if (exists)
      return res.status(409).json({ error: "User already exists" });

    const user = await prisma.user.create({
      data: { username, email, fullName, bio, isPrivate }
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.params.id) }
    });

    if (!user)
      return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.patch("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user)
      return res.status(404).json({ error: "User not found" });

    const updated = await prisma.user.update({
      where: { id },
      data: {
        fullName: req.body.fullName,
        bio: req.body.bio,
        isPrivate: req.body.isPrivate
      }
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message});
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user)
      return res.status(404).json({ error: "User not found" });

    await prisma.user.delete({ where: { id } });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;