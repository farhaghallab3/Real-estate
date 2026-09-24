from django.conf import settings
from django.db import models

from leads.models import Lead
from properties.models import Property


class Task(models.Model):
    class TaskType(models.TextChoices):
        CALL = "call", "Call"
        EMAIL = "email", "Email"
        VIEWING = "viewing", "Viewing"
        FOLLOW_UP = "follow_up", "Follow up"
        DOCUMENT = "document", "Document"

    title = models.CharField(max_length=255)
    task_type = models.CharField(max_length=20, choices=TaskType.choices)
    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="tasks"
    )
    lead = models.ForeignKey(
        Lead,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="tasks",
    )
    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="tasks",
    )
    due_date = models.DateTimeField()
    completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["due_date"]

    def __str__(self):
        return self.title
