from django.contrib import admin

from .models import Property, PropertyImage


class PropertyImageInline(admin.TabularInline):
    model = PropertyImage
    extra = 0
    readonly_fields = ["uploaded_at"]


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ["title", "city", "price", "status", "assigned_to"]
    list_filter = ["status", "property_type", "city"]
    search_fields = ["title", "address", "city"]
    inlines = [PropertyImageInline]
