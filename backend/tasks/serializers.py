from django.contrib.auth import get_user_model
from rest_framework import serializers

from leads.models import Lead
from leads.serializers import LeadBriefSerializer
from properties.models import Property
from users.serializers import UserBriefSerializer

from .models import Task

User = get_user_model()


class PropertyBriefSerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = ["id", "title"]


class TaskSerializer(serializers.ModelSerializer):
    assigned_to = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    lead = serializers.PrimaryKeyRelatedField(
        queryset=Lead.objects.all(), required=False, allow_null=True
    )
    property = serializers.PrimaryKeyRelatedField(
        queryset=Property.objects.all(), required=False, allow_null=True
    )

    class Meta:
        model = Task
        fields = [
            "id",
            "title",
            "task_type",
            "assigned_to",
            "lead",
            "property",
            "due_date",
            "completed",
            "completed_at",
            "notes",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "completed_at", "created_at", "updated_at"]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["assigned_to"] = UserBriefSerializer(instance.assigned_to).data
        representation["lead"] = (
            LeadBriefSerializer(instance.lead).data if instance.lead else None
        )
        representation["property"] = (
            PropertyBriefSerializer(instance.property).data
            if instance.property
            else None
        )
        return representation
