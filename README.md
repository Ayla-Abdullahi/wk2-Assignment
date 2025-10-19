Project Overview

This project implements a RESTful API using Express.js, focusing on routing, middleware, authentication, validation, error handling, and advanced query features such as filtering, pagination, and search.
All product data is stored in-memory (no external database).

📂 Project Structure
wk2-Assignment/
├── middleware/
│   ├── auth.js
│   ├── logger.js
│   └── errorHandler.js
├── routes/
│   └── productRoutes.js
├── utils/
│   └── customErrors.js
├── server.js
├── package.json
├── Week2-Assignment.md
└── README.md

⚙️ Installation and Setup
1️⃣ Prerequisites

Node.js v18 or higher

npm (Node Package Manager)

Postman (for API testing)

2️⃣ Install dependencies
npm install

3️⃣ Run the server (development mode)
npm run dev

4️⃣ Run the server (production mode)
npm start


The server runs at:

http://localhost:3000

🔑 Authentication

All API routes (except /) are protected by an API key.

Header Required:
Header Key	Value	Type
x-api-key	12345	string

Example (Postman Headers):

x-api-key: 12345


If the key is missing or incorrect, you will receive:

{
  "error": "Unauthorized: Invalid or missing API key"
}

🛍️ Product Resource

Each product has the following fields:

Field	Type	Description
id	string	Unique identifier (auto-generated)
name	string	Product name
description	string	Short description
price	number	Product price
category	string	Product category (e.g. electronics, kitchen)
inStock	boolean	Availability status
📡 API Endpoints
1️⃣ GET /api/products

Description: Retrieve all products (supports filtering, pagination, and search).

Query Parameters:

Parameter	Description	Example
category	Filter by category	/api/products?category=electronics
page	Page number	/api/products?page=2
limit	Items per page	/api/products?limit=5
search	Search by name	/api/products?search=laptop

Response:

[
  {
    "id": "1",
    "name": "Laptop",
    "description": "High-performance laptop with 16GB RAM",
    "price": 1200,
    "category": "electronics",
    "inStock": true
  }
]

2️⃣ GET /api/products/:id

Description: Retrieve a single product by ID.

Example Request:
GET /api/products/1

Response:

{
  "id": "1",
  "name": "Laptop",
  "description": "High-performance laptop with 16GB RAM",
  "price": 1200,
  "category": "electronics",
  "inStock": true
}

3️⃣ POST /api/products

Description: Create a new product.

Example Request Body:

{
  "name": "Car",
  "description": "Audi",
  "price": 3000000,
  "category": "vehicle",
  "inStock": true
}


Response:

{
  "message": "Product created successfully",
  "product": {
    "id": "4",
    "name": "Car",
    "description": "Audi",
    "price": 3000000,
    "category": "vehicle",
    "inStock": true
  }
}

4️⃣ PUT /api/products/:id

Description: Update an existing product.

Example Request Body:

{
  "name": "Car",
  "description": "Audi A4 2024",
  "price": 3200000,
  "category": "vehicle",
  "inStock": true
}


Response:

{
  "message": "Product updated successfully",
  "product": {
    "id": "3",
    "name": "Car",
    "description": "Audi A4 2024",
    "price": 3200000,
    "category": "vehicle",
    "inStock": true
  }
}

5️⃣ DELETE /api/products/:id

Description: Delete a product by ID.

Example:
DELETE /api/products/3

Response:

{
  "message": "Product deleted successfully"
}

🧩 Middleware Implemented
Middleware	Purpose
logger.js	Logs request method, URL, and timestamp
auth.js	Validates x-api-key header
validation.js	Validates product creation/update data
errorHandler.js	Handles all application errors globally
⚠️ Error Handling

Example Error Response:

{
  "error": "Product not found"
}


HTTP Status Codes Used:

200 – OK

201 – Created

400 – Bad Request

401 – Unauthorized

404 – Not Found

500 – Internal Server Error

🧠 Advanced Features

✅ Filtering – /api/products?category=electronics
✅ Pagination – /api/products?page=2&limit=5
✅ Search – /api/products?search=phone
✅ Statistics – /api/products/stats (optional extra route showing count per category)

👨‍💻 Author

Name: Ayla Abdullahi
Course: MERN STACK
Week: 2 – Express.js RESTful API
Instructor: (Sir. Dedan Okware)