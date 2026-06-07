# Troubleshooting Guide

## Build Errors

### Python Version Issues

**Symptom**: Build fails with "Pillow" or package incompatibility errors

**Solution**:
1. Check `runtime.txt` has: `python-3.11.0`
2. Check render.yaml has: `PYTHON_VERSION: 3.11.0`
3. Clear build cache in Render dashboard
4. Redeploy

### Requirements Not Found

**Symptom**: `Could not open requirements file: [Errno 2]`

**Solution**:
- Ensure `requirements.txt` exists in ROOT directory
- Check file is committed to git: `git ls-files requirements.txt`
- Verify file has correct content

### Build Script Permission Denied

**Symptom**: `Permission denied: ./build.sh`

**Solution**:
```bash
chmod +x build.sh
git add build.sh
git commit -m "Make build.sh executable"
git push
```

## Runtime Errors

### Database Connection Failed

**Symptom**: `OperationalError: could not connect to server`

**Solution**:
1. Check DATABASE_URL is set in environment variables
2. Verify database is in same region as web service
3. Check database status in Render dashboard
4. Restart web service

### Static Files 404

**Symptom**: CSS/JS files return 404 errors

**Solution**:
1. Check build logs - `collectstatic` should run
2. Verify STATIC_ROOT in settings.py
3. Check WhiteNoise is in MIDDLEWARE
4. Redeploy with clear cache

### CORS Errors

**Symptom**: Browser console shows CORS policy errors

**Solution**:
1. Update CORS_ALLOWED_ORIGINS environment variable
2. Add your frontend URL: `https://your-frontend.com`
3. Include protocol (http/https)
4. No trailing slash
5. Restart service

### 500 Internal Server Error

**Symptom**: API returns 500 error

**Solution**:
1. Check logs in Render dashboard
2. Look for specific error message
3. Common causes:
   - Missing environment variable
   - Database not migrated
   - Invalid SECRET_KEY
   - Missing allowed host

## Deployment Issues

### Service Won't Start

**Symptom**: Build succeeds but service fails to start

**Solution**:
1. Check start command is correct:
   ```
   cd backend && gunicorn ricexport.wsgi:application
   ```
2. Verify gunicorn is installed
3. Check logs for specific error
4. Ensure manage.py exists in backend/

### Migrations Not Applied

**Symptom**: Database errors about missing tables

**Solution**:
```bash
# In Render shell:
cd backend
python manage.py migrate
```

Or add to build.sh:
```bash
cd backend
python manage.py migrate --noinput
```

### Environment Variables Not Loading

**Symptom**: Settings using default values

**Solution**:
1. Go to Render Dashboard → Environment tab
2. Verify all required variables are set:
   - SECRET_KEY
   - DEBUG
   - ALLOWED_HOSTS
   - DATABASE_URL
   - CORS_ALLOWED_ORIGINS
3. Restart service after changes

## Frontend Issues

### Cannot Connect to Backend

**Symptom**: Network errors in browser console

**Solution**:
1. Check VITE_API_URL environment variable
2. Verify backend URL is correct
3. Check CORS settings on backend
4. Ensure backend is running

### Build Fails

**Symptom**: Frontend build fails on Render

**Solution**:
1. Check Node version (should be 18+)
2. Verify package.json exists
3. Check build command:
   ```
   npm install && npm run build
   ```
4. Verify publish directory: `dist`

## Common Commands

### Check Logs
```bash
# In Render Dashboard → Service → Logs
# Or via CLI:
render logs
```

### Run Migrations
```bash
# Render Shell:
cd backend
python manage.py migrate
```

### Create Superuser
```bash
# Render Shell:
cd backend
python manage.py createsuperuser
```

### Clear Build Cache
```
Render Dashboard → Manual Deploy → Clear build cache & deploy
```

### Restart Service
```
Render Dashboard → Manual Deploy → Deploy latest commit
```

## Health Checks

### Backend Health Check
```bash
curl https://your-service.onrender.com/api/products/
```

Should return JSON response with products.

### Database Check
```bash
# Render Shell:
cd backend
python manage.py dbshell
```

### Static Files Check
```bash
curl https://your-service.onrender.com/static/admin/css/base.css
```

Should return CSS file.

## Performance Issues

### Slow Cold Starts

**Symptom**: First request after inactivity is very slow

**Cause**: Free tier services sleep after 15 minutes

**Solutions**:
1. Upgrade to paid plan (no sleeping)
2. Use external uptime monitor to ping service
3. Accept cold starts (30-60 seconds)

### High Memory Usage

**Symptom**: Service crashes with memory errors

**Solutions**:
1. Optimize queries (select_related, prefetch_related)
2. Add database indexes
3. Upgrade to larger instance
4. Enable query caching

## Getting Help

### Information to Provide

When asking for help, include:

1. **Build logs** (from Render dashboard)
2. **Runtime logs** (last 100 lines)
3. **Environment variables** (without sensitive values)
4. **Django version**: `Django==5.0.1`
5. **Python version**: `3.11.0`
6. **Specific error message**

### Resources

- Render Docs: https://render.com/docs
- Render Status: https://status.render.com
- Django Docs: https://docs.djangoproject.com
- Stack Overflow: Tag with `django` + `render`

### Contact Support

- Render Support: https://render.com/support
- Community Forum: https://community.render.com

---

Most issues can be resolved by:
1. Checking logs for specific errors
2. Verifying environment variables
3. Clearing build cache
4. Redeploying

Good luck! 🚀
