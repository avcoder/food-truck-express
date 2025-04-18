const express = require("express");
const bodyParser = require("body-parser");
const ordersRouter = require("./routes/ordersRouter");
const morgan = require("morgan");

const app = express();

app.use(morgan("combined"));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("🚚 Welcome to the Food Truck!");
});

app.get("/hours/contact", (req, res) => {
  res.send("🕒 We are open from 11am to 7pm!");
});

app.get("/contact", (req, res) => {
  res.send(
    "<p style='background-color: yellow'>📞 Contact us at 555-FOOD or hello@foodtruck.com</p>"
  );
});

app.get("/menu", (req, res) => {
  res.send(`
  <html>
    <head>
      <title>Menu</title>
    </head>
    <body>
      <h1>🥙 Our Menu</h1>
      <ul>
        <li>Tacos</li>
        <li>Quesadillas</li>
        <li>Smoothies</li>
      </ul>
    </body>
  </html>`);
});

app.get("/api/user", async (req, res) => {
  try {
    const response = await fetch("https://randomuser.me/api/?results=3");
    const data = await response.json();
    const people = data.results;
    console.log(people);

    res.json(people);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

app.use("/orders", ordersRouter);

app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
