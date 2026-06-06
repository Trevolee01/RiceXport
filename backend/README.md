# RiceXport Backend API

Django REST API with JWT authentication for the RiceXport platform.

## Features

- JWT Authentication (Access & Refresh tokens)
- User Registration & Login
- User Profile Management
- Rice Products CRUD
- Quote Requests
- Order Management
- Admin Panel

## Setup Instructions

### 1. Install Python
Download and install Python 3.10+ from [python.org](https://www.python.org/downloads/)

### 2. Create Virtual Environment
```bash
cd backend
python -m venv venv
```

### 3. Activate Virtual Environment
**Windows:**
```bash
venv\Scripts\activate
```

**Mac/Linux:**
```bash
source venv/bin/activate
```

### 4. Install Dependencies
```bash
pip install -r requirements.txt
```

### 5. Run Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### 6. Create Superuser (Admin)
```bash
python manage.py createsuperuser
```

### 7. Run Development Server
```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000/`

## API Endpoints

### Authentication
- `POST /api/auth/register/` - Register new user
- `POST /api/auth/login/` - Login user
- `POST /api/auth/token/refresh/` - Refresh access token
- `GET /api/auth/profile/` - Get user profile (requires auth)
- `PUT /api/auth/profile/update/` - Update user profile (requires auth)

### Products
- `GET /api/products/` - List all products
- `GET /api/products/{id}/` - Get product details
- `GET /api/products/categories/` - Get all categories

### Quotes
- `GET /api/quotes/` - List user quotes (requires auth)
- `POST /api/quotes/` - Create quote request (requires auth)
- `GET /api/quotes/{id}/` - Get quote details (requires auth)
- `PUT /api/quotes/{id}/` - Update quote (requires auth)
- `DELETE /api/quotes/{id}/` - Delete quote (requires auth)

### Orders
- `GET /api/orders/` - List user orders (requires auth)
- `POST /api/orders/` - Create order (requires auth)
- `GET /api/orders/{id}/` - Get order details (requires auth)

## Authentication

Include JWT token in request headers:
```
Authorization: Bearer <access_token>
```

## Admin Panel

Access at `http://localhost:8000/admin/`

## Environment Variables

Create a `.env` file in the backend directory:
```
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```
