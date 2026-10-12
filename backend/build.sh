#!/usr/bin/env bash
# Render build script: exit on first error.
set -o errexit

pip install -r requirements.txt
python manage.py collectstatic --noinput
python manage.py migrate --noinput

# Create/reset the admin account on every deploy (Render free tier has no
# shell). Set DJANGO_SUPERUSER_USERNAME / _EMAIL / _PASSWORD in the Render
# dashboard; changing the password there and redeploying resets it.
if [[ -n "${DJANGO_SUPERUSER_USERNAME:-}" && -n "${DJANGO_SUPERUSER_PASSWORD:-}" ]]; then
  python manage.py shell -c "
import os
from django.contrib.auth import get_user_model
User = get_user_model()
user, _ = User.objects.get_or_create(
    username=os.environ['DJANGO_SUPERUSER_USERNAME'],
    defaults={'email': os.environ.get('DJANGO_SUPERUSER_EMAIL', '')},
)
user.is_staff = user.is_superuser = True
user.role = 'admin'
user.set_password(os.environ['DJANGO_SUPERUSER_PASSWORD'])
user.save()
print('Admin user ready:', user.username)
"
fi
