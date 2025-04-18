const { Router } = require("express");
const orders = require("../data.js");

const ordersRouter = Router();

ordersRouter.get("/", (req, res) => {
  res.json(orders);
});

ordersRouter.get("/search", (req, res) => {
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
ordersRouter.get("/:id", (req, res) => {
  const orderId = parseInt(req.params.id);
  const order = orders.find((o) => o.id === orderId);

  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ error: "Order not found" });
  }
});

ordersRouter.post("/", (req, res) => {
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

ordersRouter.put("/:id", (req, res) => {
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

ordersRouter.delete("/:id", (req, res) => {
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

module.exports = ordersRouter;
