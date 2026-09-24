"""Production settings (used on Render via DJANGO_SETTINGS_MODULE)."""

from .base import *  # noqa: F401,F403
from .base import MIDDLEWARE, env

DEBUG = False

# Render sets RENDER_EXTERNAL_HOSTNAME automatically; DJANGO_ALLOWED_HOSTS
# can add custom domains (comma-separated).
ALLOWED_HOSTS = env.list("DJANGO_ALLOWED_HOSTS", default=[])
_render_host = env("RENDER_EXTERNAL_HOSTNAME", default=None)
if _render_host:
    ALLOWED_HOSTS.append(_render_host)

CSRF_TRUSTED_ORIGINS = [f"https://{host}" for host in ALLOWED_HOSTS if "." in host]

# Serve static files (admin, Swagger UI) directly from the app.
MIDDLEWARE = list(MIDDLEWARE)
MIDDLEWARE.insert(1, "whitenoise.middleware.WhiteNoiseMiddleware")
STORAGES = {
    "default": {"BACKEND": "django.core.files.storage.FileSystemStorage"},
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage"
    },
}

# Render terminates TLS at its proxy.
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
