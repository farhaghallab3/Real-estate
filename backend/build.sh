#!/usr/bin/env bash
# Render build script: exit on first error.
set -o errexit

pip install -r requirements.txt
python manage.py collectstatic --noinput
python manage.py migrate --noinput

# Optional: create an admin on first deploy (Render free tier has no shell).
# Set DJANGO_SUPERUSER_USERNAME / _EMAIL / _PASSWORD in the Render dashboard;
# it is skipped if the user already exists.
if [[ -n "${DJANGO_SUPERUSER_USERNAME:-}" ]]; then
  python manage.py createsuperuser --noinput || true
fi
