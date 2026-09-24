from django.contrib import admin

from .models import Task


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ("title", "task_type", "assigned_to", "due_date", "completed")
    list_filter = ("task_type", "completed")
