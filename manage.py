#!/usr/bin/env python
"""
Root-level manage.py that delegates to backend/manage.py
This allows Render to find manage.py at the project root.
"""
import os
import sys

# Change to backend directory where the actual manage.py lives
backend_dir = os.path.join(os.path.dirname(__file__), 'backend')
os.chdir(backend_dir)

# Add backend to path
sys.path.insert(0, backend_dir)

# Now execute the actual manage.py
exec(open(os.path.join(backend_dir, 'manage.py')).read())
