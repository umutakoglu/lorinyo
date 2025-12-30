# Backend API Endpoints

## Base URL
```
http://localhost:3001/api
```

## Authentication

### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "phone": "+90 555 123 4567"
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Get Profile
```http
GET /api/auth/profile
Authorization: Bearer <token>
```

### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Doe",
  "phone": "+90 555 999 8888"
}
```

### Change Password
```http
POST /api/auth/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "oldPassword": "oldpass123",
  "newPassword": "newpass456"
}
```

## Products

### List Products
```http
GET /api/products?page=1&limit=20&search=kablosuz&categoryId=xxx&minPrice=100&maxPrice=1000
```

### Get Product by Slug
```http
GET /api/products/premium-kablosuz-kulaklik-p1
```

### Create Product (Admin)
```http
POST /api/products
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "Premium Kablosuz Kulaklık",
  "sku": "PRD-001",
  "description": "Yüksek kaliteli ses...",
  "price": 1299,
  "originalPrice": 1999,
  "stock": 50,
  "categoryId": "category-id",
  "brand": "TechSound"
}
```

### Update Product (Admin)
```http
PUT /api/products/:id
Authorization: Bearer <admin-token>
```

### Delete Product (Admin)
```http
DELETE /api/products/:id
Authorization: Bearer <admin-token>
```

## Categories

### List Categories
```http
GET /api/categories
```

### Get Category
```http
GET /api/categories/elektronik
```

### Create Category (Admin)
```http
POST /api/categories
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "Elektronik",
  "description": "Elektronik ürünler",
  "image": "/categories/electronics.jpg"
}
```

## Cart

### Get Cart
```http
GET /api/cart
Authorization: Bearer <token>
```

### Add to Cart
```http
POST /api/cart
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "product-id",
  "quantity": 1
}
```

### Update Quantity
```http
PUT /api/cart/:itemId
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantity": 3
}
```

### Remove from Cart
```http
DELETE /api/cart/:itemId
Authorization: Bearer <token>
```

### Clear Cart
```http
DELETE /api/cart
Authorization: Bearer <token>
```

## Response Format

### Success Response
```json
{
  "data": {...},
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

### Error Response
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

## Status Codes
- `200` OK
- `201` Created
- `204` No Content
- `400` Bad Request
- `401` Unauthorized
- `403` Forbidden
- `404` Not Found
- `409` Conflict
- `500` Internal Server Error
