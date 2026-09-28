const express = require("express");

const {
  create,
  list,
  getOne,
  update,
  remove,
} = require("../controllers/users.controller");

const router = express.Router();

router.post("/", create);
router.get("/", list);
router.get("/:id", getOne);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
