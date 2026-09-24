from decimal import Decimal

from django.db.models import Sum
from django.utils import timezone
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import mixins, permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from users.permissions import is_manager_or_admin

from .models import Commission
from .serializers import CommissionSerializer


class CommissionViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    """
    Commissions are only ever created by the deal-closing signal
    (commissions.signals) - no create/destroy via the API.
    """

    serializer_class = CommissionSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["status", "salesperson"]

    def get_queryset(self):
        if getattr(self, "swagger_fake_view", False):
            return Commission.objects.none()
        queryset = Commission.objects.select_related(
            "deal", "deal__lead", "deal__property", "salesperson"
        )
        user = self.request.user
        if is_manager_or_admin(user):
            return queryset
        return queryset.filter(salesperson=user)

    @action(detail=True, methods=["post"])
    def mark_paid(self, request, pk=None):
        commission = self.get_object()
        commission.status = Commission.Status.PAID
        commission.paid_at = timezone.now()
        commission.save()
        return Response(self.get_serializer(commission).data)

    @action(detail=False, methods=["get"])
    def summary(self, request):
        queryset = self.get_queryset()
        now = timezone.now()

        def total(qs):
            value = qs.aggregate(total=Sum("agent_commission"))["total"] or Decimal(
                "0.00"
            )
            # Format as a fixed 2-decimal string, matching how DecimalFields
            # are serialized elsewhere - avoids float precision loss on money.
            return f"{value:.2f}"

        this_month = queryset.filter(
            created_at__year=now.year, created_at__month=now.month
        )
        data = {
            "total_this_month": total(this_month),
            "pending_total": total(queryset.filter(status=Commission.Status.PENDING)),
            "paid_total": total(queryset.filter(status=Commission.Status.PAID)),
        }
        return Response(data)
