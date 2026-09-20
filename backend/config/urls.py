"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information see:
https://docs.djangoproject.com/en/stable/topics/http/urls/
"""

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

from .views import health_check

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/health/", health_check, name="health-check"),
    path("api/leads/", include("leads.urls")),
    path("api/properties/", include("properties.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
