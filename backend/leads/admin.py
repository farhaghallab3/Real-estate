from django.contrib import admin

from .models import Lead, LeadProperty


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ("name", "status", "assigned_to", "created_at")
    list_filter = ("status", "assigned_to")
    search_fields = ("name", "email", "phone")


@admin.register(LeadProperty)
class LeadPropertyAdmin(admin.ModelAdmin):
    list_display = ("lead", "property", "status", "created_at")
    list_filter = ("status",)
