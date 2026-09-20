from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Lead

User = get_user_model()


class AssignedToSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["id", "name"]

    def get_name(self, obj):
        return obj.get_full_name() or obj.username


class LeadSerializer(serializers.ModelSerializer):
    assigned_to = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), required=False, allow_null=True
    )

    class Meta:
        model = Lead
        fields = [
            "id",
            "name",
            "email",
            "phone",
            "lead_type",
            "budget_min",
            "budget_max",
            "preferred_location",
            "status",
            "assigned_to",
            "notes",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["assigned_to"] = (
            AssignedToSerializer(instance.assigned_to).data
            if instance.assigned_to
            else None
        )
        return representation
