from rest_framework import serializers

from deals.models import Deal
from users.serializers import UserBriefSerializer

from .models import Commission


class DealBriefSerializer(serializers.ModelSerializer):
    lead_name = serializers.CharField(source="lead.name", read_only=True)
    property_title = serializers.CharField(source="property.title", read_only=True)

    class Meta:
        model = Deal
        fields = ["id", "lead_name", "property_title"]


class CommissionSerializer(serializers.ModelSerializer):
    deal = DealBriefSerializer(read_only=True)
    salesperson = UserBriefSerializer(read_only=True)

    class Meta:
        model = Commission
        fields = [
            "id",
            "deal",
            "salesperson",
            "sale_price",
            "commission_rate",
            "gross_commission",
            "agent_split",
            "agent_commission",
            "brokerage_split",
            "status",
            "paid_at",
            "created_at",
            "updated_at",
        ]
        # Only status/paid_at are editable via the API; everything else is
        # either derived at save-time or copied in at creation by the
        # deal-closing signal (commissions.signals).
        read_only_fields = [
            "id",
            "deal",
            "salesperson",
            "sale_price",
            "commission_rate",
            "gross_commission",
            "agent_split",
            "agent_commission",
            "brokerage_split",
            "created_at",
            "updated_at",
        ]
