"""
WSGI config for ricexport project.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ricexport.settings')

application = get_wsgi_application()
