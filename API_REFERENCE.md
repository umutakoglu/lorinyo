# Quick Reference: API Endpoints & Usage Examples

## Authentication

### Register New User

```bash
POST http://localhost:3001/api/auth/register
Content-Type: application/json

{
  "email": "vendor@example.com",
  "password": "SecurePassword123!",
  "firstName": "John",
  "lastName": "Doe",
  "role": "VENDOR"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-here",
    "email": "vendor@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "VENDOR"
  }
}
```

### Login

```bash
POST http://localhost:3001/api/auth/login
Content-Type: application/json

{
  "email": "vendor@example.com",
  "password": "SecurePassword123!"
}
```

### Get Current User Profile

```bash
GET http://localhost:3001/api/auth/me
Authorization: Bearer {your-jwt-token}
```

## Audit Logs

### Query Audit Logs (Admin/Vendor only)

```bash
GET http://localhost:3001/api/audit?userId={userId}&entity=Product&page=1&limit=50
Authorization: Bearer {your-jwt-token}
```

### Get Entity History

```bash
GET http://localhost:3001/api/audit/entity?entity=Product&entityId={product-id}
Authorization: Bearer {your-jwt-token}
```

### Get My Activity

```bash
GET http://localhost:3001/api/audit/my-activity?limit=100
Authorization: Bearer {your-jwt-token}
```

---

## Usage with JavaScript/TypeScript

### Using Fetch API

```typescript
const API_URL = 'http://localhost:3001/api';

// Register
const register = async () => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'test@example.com',
      password: 'Password123!',
      role: 'VENDOR',
    }),
  });
  
  const data = await response.json();
  localStorage.setItem('token', data.accessToken);
  return data;
};

// Login
const login = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  
  const data = await response.json();
  localStorage.setItem('token', data.accessToken);
  return data;
};

// Authenticated request
const getProfile = async () => {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${API_URL}/auth/me`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  return response.json();
};
```

### Using Axios

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

// Add token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Usage
const { data } = await api.post('/auth/login', {
  email: 'test@example.com',
  password: 'Password123!',
});

localStorage.setItem('token', data.accessToken);
```

---

## Role-Based Access

### Roles
- **ADMIN** - Full system access
- **VENDOR** - Manage own products, orders, and integrations
- **CUSTOMER** - View products, create orders

### Protected Endpoints
- Some endpoints require specific roles
- Include JWT token in `Authorization` header
- Server will return `403 Forbidden` if role is insufficient

---

## Testing with Postman/Insomnia

1. **Register a user** → Save the `accessToken`
2. **Create an environment variable** `token` with the value
3. **Use in headers** → `Authorization: Bearer {{token}}`
4. **Test protected endpoints**

---

## Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (e.g., email already exists)
- `500` - Internal Server Error

---

## Next Steps

Once products, orders, and marketplace modules are implemented, this guide will be extended with:
- Product CRUD endpoints
- Bulk upload endpoints
- Marketplace sync endpoints
- Order management endpoints
- Cargo integration endpoints
