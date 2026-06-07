#!/usr/bin/env python
"""
Root-level manage.py that delegates to backend/manage.py
This allows Render to find manage.py at the project root.
"""
import os
import sys

if __name__ == '__main__':
    # Change to backend directory where the actual manage.py lives
    backend_dir = os.path.join(os.path.dirname(__file__), 'backend')
    os.chdir(backend_dir)

    # Add backend to path
    sys.path.insert(0, backend_dir)

    # Set Django settings module
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ricexport.settings')

    # Import and execute Django's management
    from django.core.management import execute_from_command_line
    execute_from_command_line(sys.argv)
