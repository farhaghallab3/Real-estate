from django.contrib.auth import get_user_model
from django.utils import timezone
from rest_framework import serializers

from leads.models import Lead
from leads.serializers import LeadBriefSerializer
from properties.models import Property
from users.serializers import UserBriefSerializer

from .models import Deal, DealStatusHistory

User = get_user_model()


class PropertyBriefSerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = ["id", "title"]


class DealStatusHistorySerializer(serializers.ModelSerializer):
    changed_by = UserBriefSerializer(read_only=True)

    class Meta:
        model = DealStatusHistory
        fields = ["id", "from_status", "to_status", "changed_by", "changed_at"]


class DealSerializer(serializers.ModelSerializer):
    lead = serializers.PrimaryKeyRelatedField(queryset=Lead.objects.all())
    property = serializers.PrimaryKeyRelatedField(queryset=Property.objects.all())
    salesperson = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Deal
        fields = [
            "id",
            "lead",
            "property",
            "salesperson",
            "offer_amount",
            "commission_rate",
            "status",
            "expected_close_date",
            "closed_at",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "closed_at", "created_at", "updated_at"]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["lead"] = LeadBriefSerializer(instance.lead).data
        representation["property"] = PropertyBriefSerializer(instance.property).data
        representation["salesperson"] = UserBriefSerializer(instance.salesperson).data
        return representation

    def update(self, instance, validated_data):
        previous_status = instance.status
        new_status = validated_data.get("status", previous_status)

        if new_status == Deal.Status.CLOSED and previous_status != Deal.Status.CLOSED:
            validated_data["closed_at"] = timezone.now()

        deal = super().update(instance, validated_data)

        if new_status != previous_status:
            request = self.context.get("request")
            changed_by = getattr(request, "user", None) if request else None
            DealStatusHistory.objects.create(
                deal=deal,
                from_status=previous_status,
                to_status=new_status,
                changed_by=changed_by,
            )

        return deal


class DealDetailSerializer(DealSerializer):
    status_history = DealStatusHistorySerializer(many=True, read_only=True)

    class Meta(DealSerializer.Meta):
        fields = DealSerializer.Meta.fields + ["status_history"]
