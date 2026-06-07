# Deployment Guide for RiceXport

## Deploying to Render

### Prerequisites
- GitHub account with your code pushed to a repository
- Render account (sign up at https://render.com)

### Backend Deployment (Django API)

#### Option 1: Using render.yaml (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Add Render deployment configuration"
   git push origin main
   ```

2. **Connect to Render**
   - Go to https://dashboard.render.com
   - Click "New +" and select "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect `render.yaml` and create:
     - Web Service (Django backend)
     - PostgreSQL Database

3. **Set Environment Variables** (already configured in render.yaml)
   - `SECRET_KEY` - Auto-generated
   - `DEBUG` - Set to `False`
   - `ALLOWED_HOSTS` - Set to `.onrender.com`
   - `CORS_ALLOWED_ORIGINS` - Update with your frontend URL
   - `DATABASE_URL` - Auto-configured from database

#### Option 2: Manual Setup

1. **Create PostgreSQL Database**
   - In Render Dashboard, click "New +" → "PostgreSQL"
   - Name: `ricexport-db`
   - Region: Oregon (or closest to you)
   - Create database

2. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `ricexport-backend`
     - **Region**: Oregon
     - **Branch**: main
     - **Root Directory**: Leave empty
     - **Runtime**: Python 3
     - **Build Command**: `./build.sh`
     - **Start Command**: `cd backend && gunicorn ricexport.wsgi:application`

3. **Add Environment Variables**
   - Go to "Environment" tab
   - Add:
     ```
     SECRET_KEY=<generate-random-string>
     DEBUG=False
     ALLOWED_HOSTS=.onrender.com
     DATABASE_URL=<from-your-database>
     CORS_ALLOWED_ORIGINS=https://your-frontend.onrender.com
     ```

4. **Deploy**
   - Click "Manual Deploy" → "Deploy latest commit"
   - Wait for build to complete
   - Your API will be available at: `https://ricexport-backend.onrender.com`

### Frontend Deployment (React/Vite)

#### Deploy to Render

1. **Create Static Site**
   - In Render Dashboard, click "New +" → "Static Site"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `ricexport-frontend`
     - **Branch**: main
     - **Root Directory**: `frontend/my-app`
     - **Build Command**: `npm install && npm run build`
     - **Publish Directory**: `frontend/my-app/dist`

2. **Add Environment Variables**
   - Go to "Environment" tab
   - Add:
     ```
     VITE_API_URL=https://ricexport-backend.onrender.com
     ```

3. **Update API URL in Frontend**
   - Open `frontend/my-app/src/services/api.ts`
   - Update the baseURL:
     ```typescript
     const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
     ```

4. **Deploy**
   - Click "Manual Deploy" → "Deploy latest commit"
   - Your frontend will be available at: `https://ricexport-frontend.onrender.com`

#### Alternative: Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd frontend/my-app
   vercel
   ```

3. **Set Environment Variables in Vercel Dashboard**
   - `VITE_API_URL=https://ricexport-backend.onrender.com`

### Post-Deployment Steps

1. **Update CORS Settings**
   - Update the `CORS_ALLOWED_ORIGINS` environment variable in your backend with your actual frontend URL

2. **Create Superuser** (for admin access)
   - In Render Dashboard, go to your backend service
   - Open "Shell" tab
   - Run:
     ```bash
     cd backend
     python manage.py createsuperuser
     ```

3. **Test the Application**
   - Visit your frontend URL
   - Try signing up and logging in
   - Check that all features work

### Monitoring and Logs

- **Backend Logs**: Render Dashboard → Your Service → "Logs" tab
- **Database**: Render Dashboard → Your Database → "Info" tab
- **Metrics**: Check CPU, Memory, and Request metrics in Render

### Troubleshooting

#### Build Fails
- Check logs in Render Dashboard
- Ensure `requirements.txt` is in root directory
- Ensure `build.sh` has execute permissions

#### Database Connection Issues
- Verify `DATABASE_URL` is set correctly
- Check database is in same region as web service
- Ensure migrations ran successfully

#### CORS Errors
- Update `CORS_ALLOWED_ORIGINS` with correct frontend URL
- Ensure protocol (http/https) matches

#### Static Files Not Loading
- Verify `STATIC_ROOT` is set correctly
- Check that `collectstatic` ran in build command
- Ensure WhiteNoise is configured

### Free Tier Limitations

Render's free tier includes:
- 750 hours/month for web services
- Services spin down after 15 minutes of inactivity
- First request after spin down may be slow (cold start)
- 90 days of PostgreSQL storage retention

### Upgrading to Production

For production use, consider upgrading to paid plans for:
- No cold starts
- Better performance
- More database storage
- Background workers
- Custom domains with SSL

### Environment Variables Reference

**Backend**:
- `SECRET_KEY` - Django secret key (required)
- `DEBUG` - Debug mode (False for production)
- `ALLOWED_HOSTS` - Comma-separated list of allowed hosts
- `DATABASE_URL` - PostgreSQL connection string
- `CORS_ALLOWED_ORIGINS` - Comma-separated list of allowed origins

**Frontend**:
- `VITE_API_URL` - Backend API URL

### Commands Reference

```bash
# Local development
cd backend
python manage.py runserver

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Collect static files
python manage.py collectstatic --no-input

# Frontend development
cd frontend/my-app
npm run dev

# Frontend build
npm run build
```

### Support

For issues with deployment:
- Render Documentation: https://render.com/docs
- Django Deployment: https://docs.djangoproject.com/en/5.0/howto/deployment/
- Vite Deployment: https://vitejs.dev/guide/static-deploy.html
