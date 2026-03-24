const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Get products
app.get('/products', (req, res) => {
  const data = JSON.parse(fs.readFileSync('db.json'));
  res.json(data.products);
});

// Add product
app.post('/add-product', (req, res) => {
  const data = JSON.parse(fs.readFileSync('db.json'));
  data.products.push(req.body);
  fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
  res.json({ message: "Product Added" });
});

// Place order
app.post('/order', (req, res) => {
  const data = JSON.parse(fs.readFileSync('db.json'));
  data.orders.push(req.body);
  fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
  res.json({ message: "Order Placed" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
