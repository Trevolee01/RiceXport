# RiceXport Full Stack Setup Guide

Complete setup instructions for the RiceXport platform with Django backend and React frontend.

## Project Structure
```
RiceXport/
├── backend/          # Django REST API
├── frontend/my-app/  # React + Vite frontend
└── SETUP.md         # This file
```

## Backend Setup (Django + JWT)

### 1. Install Python
- Download Python 3.10+ from [python.org](https://www.python.org/downloads/)
- During installation, check "Add Python to PATH"

### 2. Setup Backend
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser (admin account)
python manage.py createsuperuser

# Run server
python manage.py runserver
```

Backend will run at: `http://localhost:8000`

### 3. Access Admin Panel
- URL: `http://localhost:8000/admin/`
- Login with superuser credentials

## Frontend Setup (React + Vite)

### 1. Install Node.js
- Download Node.js 18+ from [nodejs.org](https://nodejs.org/)

### 2. Setup Frontend
```bash
cd frontend/my-app

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend will run at: `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register/` - Register new user
- `POST /api/auth/login/` - Login user  
- `POST /api/auth/token/refresh/` - Refresh JWT token
- `GET /api/auth/profile/` - Get user profile (auth required)
- `PUT /api/auth/profile/update/` - Update profile (auth required)

### Products
- `GET /api/products/` - List all rice products
- `GET /api/products/{id}/` - Get product details
- `GET /api/products/categories/` - Get categories

### Quotes
- `GET /api/quotes/` - List user quotes (auth required)
- `POST /api/quotes/` - Create quote (auth required)
- `GET /api/quotes/{id}/` - Get quote details (auth required)

### Orders
- `GET /api/orders/` - List user orders (auth required)
- `POST /api/orders/` - Create order (auth required)

## Authentication Flow

### Registration
```javascript
const response = await authService.register({
  email: "user@example.com",
  username: "username",
  password: "password123",
  password2: "password123",
  first_name: "John",
  last_name: "Doe",
  company_name: "Company Ltd",
  phone: "+1234567890",
  country: "USA"
});
// Returns: { user, tokens: { access, refresh } }
```

### Login
```javascript
const response = await authService.login({
  email: "user@example.com",
  password: "password123"
});
// Returns: { user, tokens: { access, refresh } }
```

### Using Protected Routes
JWT tokens are automatically added to requests via axios interceptors.
Tokens are stored in localStorage and refreshed automatically when expired.

## Features Implemented

### Backend
✅ Custom User model with email authentication
✅ JWT authentication (access + refresh tokens)
✅ User registration & login
✅ User profile management
✅ Rice products CRUD
✅ Quote request system with auto-calculation
✅ Order management
✅ Admin panel
✅ CORS configuration for frontend

### Frontend
✅ Authentication service with JWT
✅ Automatic token refresh
✅ Protected routes
✅ User dashboard with personalized name
✅ Login/Register pages
✅ Product catalog
✅ Quote request form
✅ Order tracking

## Testing the Integration

### 1. Start Backend
```bash
cd backend
venv\Scripts\activate  # Windows
python manage.py runserver
```

### 2. Start Frontend
```bash
cd frontend/my-app
npm run dev
```

### 3. Test Flow
1. Go to `http://localhost:5173/register`
2. Register a new account
3. Login with your credentials
4. Your dashboard will show your name from registration
5. Browse products, request quotes, place orders

## Troubleshooting

### Backend Issues
- **Module not found**: Make sure virtual environment is activated
- **Database errors**: Run `python manage.py migrate`
- **Port 8000 in use**: Change port with `python manage.py runserver 8001`

### Frontend Issues
- **Module not found**: Run `npm install`
- **CORS errors**: Check backend CORS settings in `settings.py`
- **API connection failed**: Ensure backend is running on port 8000

## Production Deployment

### Backend
1. Set `DEBUG = False` in settings.py
2. Configure proper SECRET_KEY
3. Set up PostgreSQL database
4. Configure static files serving
5. Use gunicorn/uwsgi for WSGI server

### Frontend
1. Build: `npm run build`
2. Deploy dist folder to hosting service
3. Update API_URL in api.ts to production backend URL

## Security Notes

- Change SECRET_KEY in production
- Use environment variables for sensitive data
- Enable HTTPS in production
- Implement rate limiting
- Add input validation
- Regular security updates

## Support

For issues or questions, check:
- Backend logs: Terminal running Django server
- Frontend logs: Browser console (F12)
- Network tab: Check API requests/responses
