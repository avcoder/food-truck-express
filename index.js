const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

// Mock data for food truck orders
let orders = [
  { id: 1, item: "Taco", quantity: 2, customer: "Alice" },
  { id: 2, item: "Burger", quantity: 1, customer: "Bob" },
  { id: 3, item: "Nachos", quantity: 1, customer: "Alice" },
];

app.get("/orders", (req, res) => {
  res.json(orders);
});

app.get("/orders/search", (req, res) => {
  const { customer, item } = req.query;
  console.log("cust: ", customer);
  console.log("item: ", item);
  let filteredOrders = [...orders];

  if (customer) {
    filteredOrders = filteredOrders.filter(
      (order) => order.customer.toLowerCase() === customer.toLowerCase()
    );
  }

  if (item) {
    filteredOrders = filteredOrders.filter(
      (order) => order.item.toLowerCase() === item.toLowerCase()
    );
  }

  res.json(filteredOrders);
});

// GET a single order by ID
app.get("/orders/:id", (req, res) => {
  const orderId = parseInt(req.params.id);
  const order = orders.find((o) => o.id === orderId);

  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ error: "Order not found" });
  }
});

app.post("/orders", (req, res) => {
  console.log("in POST /orders");
  const { item, quantity, customer } = req.body;
  const newOrder = {
    id: orders.length + 1,
    item,
    quantity,
    customer,
  };

  orders = [...orders, newOrder];
  console.log(orders);

  res.status(201).json(newOrder);
});

app.put("/orders/:id", (req, res) => {
  const orderId = parseInt(req.params.id);
  const { item, quantity, customer } = req.body;
  const index = orders.findIndex((o) => o.id === orderId);
  if (index !== -1) {
    orders[index] = { id: orderId, item, quantity, customer };
    res.json(orders[index]);
  } else {
    res.status(404).json({ error: "Order not found" });
  }
});

app.delete("/orders/:id", (req, res) => {
  console.log(orders);
  const orderId = parseInt(req.params.id);
  const index = orders.findIndex((o) => o.id === orderId);

  if (index !== -1) {
    orders.splice(index, 1);
    res.sendStatus(204); // ✅ No Content
  } else {
    res.status(404).json({ error: "Order not found" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
