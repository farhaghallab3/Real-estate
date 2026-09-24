"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information see:
https://docs.djangoproject.com/en/stable/topics/http/urls/
"""

from django.contrib import admin
from django.urls import include, path

from .views import health_check

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/health/", health_check, name="health-check"),
    path("api/leads/", include("leads.urls")),
]
