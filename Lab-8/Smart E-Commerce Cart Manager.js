const express = require("express");
const app = express();
app.use(express.json());

let shoppingCart = [];
const MAX_ITEMS_IN_CART = 10;

function calculateTotalCost(req, res, next) {
  const { name, price, quantity } = req.body;

  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "Invalid item name" });
  }
  if (typeof price !== "number" || isNaN(price) || price <= 0) {
    return res.status(400).json({ error: "Invalid price" });
  }
  if (typeof quantity !== "number" || !Number.isInteger(quantity) || quantity <= 0) {
    return res.status(400).json({ error: "Invalid quantity" });
  }

  req.body.totalCost = price * quantity;
  next();
}

app.post("/cart/items", calculateTotalCost, (req, res) => {
  if (shoppingCart.length >= MAX_ITEMS_IN_CART) {
    return res.status(400).json({ error: "Cart is full" });
  }

  const { name, price, quantity, totalCost } = req.body;
  const newItem = { name, price, quantity, totalCost };
  shoppingCart.push(newItem);

  res.status(201).json(newItem);
});

app.get("/cart", (req, res) => {
  res.status(200).json(shoppingCart);
});

if (require.main === module) {
  app.listen(3000);
}

module.exports = app;