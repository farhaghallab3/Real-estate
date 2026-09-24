from django.contrib.auth import get_user_model
from rest_framework import serializers

from properties.models import Property
from users.serializers import UserBriefSerializer

from .models import Lead, LeadProperty

User = get_user_model()


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
            UserBriefSerializer(instance.assigned_to).data
            if instance.assigned_to
            else None
        )
        return representation


class LeadBriefSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = ["id", "name"]


class PropertyBriefSerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = ["id", "title", "price"]


class LeadPropertySerializer(serializers.ModelSerializer):
    lead = serializers.PrimaryKeyRelatedField(queryset=Lead.objects.all())
    property = serializers.PrimaryKeyRelatedField(queryset=Property.objects.all())

    class Meta:
        model = LeadProperty
        fields = [
            "id",
            "lead",
            "property",
            "status",
            "notes",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["lead"] = LeadBriefSerializer(instance.lead).data
        representation["property"] = PropertyBriefSerializer(instance.property).data
        return representation


class LeadDetailSerializer(LeadSerializer):
    property_interests = LeadPropertySerializer(many=True, read_only=True)

    class Meta(LeadSerializer.Meta):
        fields = LeadSerializer.Meta.fields + ["property_interests"]
