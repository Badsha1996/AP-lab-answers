const userService = require("../services/users.service");

async function create(req, res) {
  try {
    const { username, email, fullName, bio } = req.body;

    if (!username || !email || !fullName) {
      return res.status(400).json({
        error: "username, email and fullname are required",
      });
    }

    const user = await userService.createUser({
      username,
      email,
      fullName,
      bio,
    });

    res.status(201).json(user);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({
        error: "username or email already taken",
      });
    }

    console.error(error);

    res.status(500).json({
      error: "Internal server error",
    });
  }
}

async function list(req, res) {
  try {
    const users = await userService.listUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Internal server error",
    });
  }
}

async function getOne(req, res) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: "Invalid user id",
      });
    }

    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Internal server error",
    });
  }
}

async function update(req, res) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: "Invalid user id",
      });
    }

    const { fullName, bio } = req.body;

    const data = {};

    if (fullName !== undefined) {
      data.fullName = fullName;
    }

    if (bio !== undefined) {
      data.bio = bio;
    }

    const user = await userService.updateUser(id, data);

    res.status(200).json(user);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        error: "User not found",
      });
    }

    console.error(error);

    res.status(500).json({
      error: "Internal server error",
    });
  }
}

async function remove(req, res) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: "Invalid user id",
      });
    }

    await userService.deleteUser(id);

    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        error: "User not found",
      });
    }

    console.error(error);

    res.status(500).json({
      error: "Internal server error",
    });
  }
}

module.exports = {
  create,
  list,
  getOne,
  update,
  remove,
};
