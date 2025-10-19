// server.js - Completed Express server for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());

// ---------------------------
// Custom Middleware
// ---------------------------

// Logger Middleware
app.use((req, res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.originalUrl}`);
  next();
});

// Authentication Middleware
const authenticate = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== '12345') {
    return res.status(401).json({ error: 'Unauthorized: Invalid or missing API key' });
  }
  next();
};

// Validation Middleware
const validateProduct = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;
  if (!name || !description || !price || !category || typeof inStock !== 'boolean') {
    return res.status(400).json({
      error: 'Validation Error: All fields (name, description, price, category, inStock) are required, and inStock must be a boolean.'
    });
  }
  next();
};

// ---------------------------
// In-Memory Database
// ---------------------------
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// ---------------------------
// Routes
// ---------------------------

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// GET /api/products - Get all products (with filtering, pagination, search)
app.get('/api/products', (req, res) => {
  let results = [...products];
  const { category, search, page = 1, limit = 5 } = req.query;

  // Filtering by category
  if (category) {
    results = results.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  // Searching by name
  if (search) {
    results = results.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginatedResults = results.slice(startIndex, endIndex);

  res.json({
    totalProducts: results.length,
    currentPage: parseInt(page),
    totalPages: Math.ceil(results.length / limit),
    products: paginatedResults
  });
});

// GET /api/products/:id - Get a specific product
app.get('/api/products/:id', (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    const error = new Error('Product not found');
    error.status = 404;
    return next(error);
  }
  res.json(product);
});

// POST /api/products - Create a new product
app.post('/api/products', authenticate, validateProduct, (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    category,
    inStock
  };
  products.push(newProduct);
  res.status(201).json({ message: 'Product created successfully', product: newProduct });
});

// PUT /api/products/:id - Update a product
app.put('/api/products/:id', authenticate, validateProduct, (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    const error = new Error('Product not found');
    error.status = 404;
    return next(error);
  }
  products[index] = { id: req.params.id, ...req.body };
  res.json({ message: 'Product updated successfully', product: products[index] });
});

// DELETE /api/products/:id - Delete a product
app.delete('/api/products/:id', authenticate, (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    const error = new Error('Product not found');
    error.status = 404;
    return next(error);
  }
  const deleted = products.splice(index, 1);
  res.json({ message: 'Product deleted successfully', deleted });
});

// GET /api/products/stats - Get product statistics
app.get('/api/products/stats', (req, res) => {
  const categoryCounts = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});
  res.json({ totalProducts: products.length, countByCategory: categoryCounts });
});

// ---------------------------
// Global Error Handler
// ---------------------------
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// ---------------------------
// Start Server
// ---------------------------
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export app for testing
module.exports = app;
