from django.contrib import admin

from .models import Viewing


@admin.register(Viewing)
class ViewingAdmin(admin.ModelAdmin):
    list_display = ("lead", "property", "assigned_to", "start_time", "status")
